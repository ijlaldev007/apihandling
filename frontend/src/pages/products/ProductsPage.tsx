// Import React hooks
import { useState } from "react";

// Import custom hooks
import { useDebounce } from "@/hooks/useDebounce";

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import search component
import { SearchInput } from "@/components/search/SearchInput";

// Import DataTable components
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";

// Import skeleton components
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { CardsSkeleton } from "@/components/skeletons/CardsSkeleton";

// Import custom hooks
import { useFilteredProducts } from "@/hooks/useProducts";

// Import types
import type { Product } from "@/types/product";

export default function ProductsPage() {
  // State for search term (what the user types)
  const [inputValue, setInputValue] = useState("");

  // Debounced search term (what we use for API calls)
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // Check if search is in progress (input value doesn't match debounced value)
  const isSearching = inputValue !== debouncedSearchTerm;

  // Use the filtered products hook with debounced search parameter
  const { data, isLoading, isError } = useFilteredProducts({
    search: debouncedSearchTerm,
    // You can add more parameters here like sorting, pagination, etc.
  });

  // Extract products from the response
  const products: Product[] = data?.data || [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>There was a problem fetching products</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // We'll handle loading states within each tab content instead of a full-screen loading

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Products API Mastery</h1>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          {isLoading ? (
            <TableSkeleton columns={6} rows={10} />
          ) : (
            <DataTable
              columns={columns}
              data={products}
              searchColumn="name"
              onSearch={setInputValue}
              searchValue={inputValue}
              isServerSide={true}
              isSearching={isSearching}
            />
          )}
        </TabsContent>

        <TabsContent value="cards">
          {isLoading ? (
            <CardsSkeleton cards={9} />
          ) : (
            <>
              <div className="mb-4">
                <SearchInput
                  placeholder="Search products..."
                  value={inputValue}
                  onChange={setInputValue}
                  isSearching={isSearching}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>Product ID: {product.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
