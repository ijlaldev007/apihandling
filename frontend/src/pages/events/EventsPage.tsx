import { useState } from "react";
import { format, parseISO } from "date-fns";

// Import custom hooks
import { useEvents, useEventCategories } from "@/hooks/useEvents";
import { useDebounce } from "@/hooks/useDebounce";

// Import Shadcn UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import types
import type { Event, EventsQueryParams } from "@/types/events";

// Loading skeletons
const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="w-full">
    <div className="flex items-center py-4">
      <Skeleton className="h-10 w-[250px]" />
    </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array(columns).fill(0).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-5 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rows).fill(0).map((_, i) => (
            <TableRow key={i}>
              {Array(columns).fill(0).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const CardsSkeleton = ({ cards = 6 }: { cards?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array(cards).fill(0).map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-[100px]" />
        </CardFooter>
      </Card>
    ))}
  </div>
);

// Search input component
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  isSearching = false
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default function EventsPage() {
  // State for search and filters
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Debounce search input to prevent too many API calls
  const debouncedSearch = useDebounce(searchInput, 500);

  // Create query params object
  const queryParams: EventsQueryParams = {};
  if (debouncedSearch) queryParams.search = debouncedSearch;
  if (selectedCategory && selectedCategory !== 'all') queryParams.category = selectedCategory;

  // Fetch events and categories
  const { data: eventsResponse, isLoading: isEventsLoading } = useEvents(queryParams);
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useEventCategories();

  // Derived state
  const events = eventsResponse?.events || [];
  const categories = categoriesResponse?.categories || [];
  const isSearching = debouncedSearch !== searchInput;

  // Format date for display
  const formatEventDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy h:mm a");
    } catch {
      return dateString;
    }
  };

  // Get category badge color based on category name
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      meeting: "bg-blue-100 text-blue-800",
      event: "bg-green-100 text-green-800",
      deadline: "bg-red-100 text-red-800",
      social: "bg-purple-100 text-purple-800",
      training: "bg-yellow-100 text-yellow-800",
    };

    return categoryColors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <SearchInput
            placeholder="Search events..."
            value={searchInput}
            onChange={setSearchInput}
            isSearching={isSearching}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {!isCategoriesLoading && categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          {isEventsLoading ? (
            <TableSkeleton rows={10} columns={5} />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No events found
                      </TableCell>
                    </TableRow>
                  ) : (
                    events.map((event: Event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{formatEventDate(event.start)}</TableCell>
                        <TableCell>{formatEventDate(event.end)}</TableCell>
                        <TableCell>{event.location || "N/A"}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cards">
          {isEventsLoading ? (
            <CardsSkeleton cards={9} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  No events found
                </div>
              ) : (
                events.map((event: Event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <CardDescription>
                        {event.isAllDay ? (
                          <span>All day event</span>
                        ) : (
                          <span>
                            {formatEventDate(event.start)} - {formatEventDate(event.end)}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">
                        <strong>Location:</strong> {event.location || "N/A"}
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Organizer:</strong> {event.organizer}
                      </p>
                      <p className="text-sm line-clamp-2">{event.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}