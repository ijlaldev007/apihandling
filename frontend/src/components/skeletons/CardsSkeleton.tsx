import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardsSkeletonProps {
  cards: number;
}

export function CardsSkeleton({ cards = 6 }: CardsSkeletonProps) {
  return (
    <div>
      {/* Search bar skeleton */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative">
            <Skeleton className="h-9 w-[250px]" />
          </div>
          <Skeleton className="h-9 w-[80px]" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(cards)
          .fill(null)
          .map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
