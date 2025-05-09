import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./related-products.css";

// Import custom hooks
import { useProductsByCategory } from "@/hooks/useProducts";

// Import types
import type { Product } from "@/types/product";

// Import UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch related products in the same category, excluding the current product
  const { data: relatedProducts, isLoading, isError } = useProductsByCategory(category, currentProductId);

  // Handle scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Handle scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // If there are no related products, don't render anything
  if (!isLoading && (!relatedProducts || relatedProducts.length === 0)) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="min-w-[250px] max-w-[250px]">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {relatedProducts?.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

interface RelatedProductCardProps {
  product: Product;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  return (
    <Card className="min-w-[250px] max-w-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base truncate">{product.name}</CardTitle>
        <Badge className="w-fit">{product.category}</Badge>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="aspect-square w-full h-[150px] relative mb-2">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
