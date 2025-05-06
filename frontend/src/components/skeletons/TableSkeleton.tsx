import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns: number;
  rows: number;
}

export function TableSkeleton({ columns = 6, rows = 10 }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative">
            <Skeleton className="h-9 w-[250px]" />
          </div>
          <Skeleton className="h-9 w-[80px]" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array(columns)
                .fill(null)
                .map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(rows)
              .fill(null)
              .map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(columns)
                    .fill(null)
                    .map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
