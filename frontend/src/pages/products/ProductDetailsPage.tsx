import { useParams, useNavigate } from "react-router-dom";

// Import custom hooks
import { useProductBySlug } from "@/hooks/useProducts";

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

// Import skeleton components
import { Skeleton } from "@/components/ui/skeleton";

// Import product components
import { RelatedProducts } from "@/components/products/RelatedProducts";

// ProductDetailsPage component
export default function ProductDetailsPage() {
  // Get the product slug from URL parameters
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch product data using the useProductBySlug hook
  const { data: product, isLoading, isError, error } = useProductBySlug(slug || null);

  // Handle back button click
  const handleBackClick = () => {
    navigate("/products");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-20" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product image skeleton */}
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>

          {/* Product details skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>

            <Skeleton className="h-8 w-1/4" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>
              {error instanceof Error
                ? error.message
                : "There was a problem loading the product details"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleBackClick}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render product details
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Breadcrumb/Back navigation */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={handleBackClick}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product details */}
        <div className="space-y-6">
          {/* Product header */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <Badge>{product.category}</Badge>
              <span className="text-sm text-muted-foreground">ID: {product.id}</span>
            </div>
          </div>

          {/* Price and rating */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">Rating:</span>
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/5</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground">{product.description}</p>

          <Separator />

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Colors */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Colors</h2>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Stock */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Availability:</span>
            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </Badge>
          </div>

          {/* Add to cart button */}
          <Button className="w-full" disabled={product.stock <= 0}>
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  );
}
