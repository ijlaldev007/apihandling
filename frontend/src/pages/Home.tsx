import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  // API types from the backend
  const apiTypes = [
    {
      name: "Products API",
      description: "Product inventory with filtering, sorting, and pagination",
      path: "/products",
      implemented: true,
    },
    {
      name: "Hierarchical Data",
      description: "Organization chart with nested structure",
      path: "/hierarchical",
      implemented: true,
    },
    {
      name: "Time Series Data",
      description: "Temperature, stock prices, user counts, and traffic data over time",
      path: "/time-series",
      implemented: true, // Change from false to true
    },
    {
      name: "Geospatial Data",
      description: "Store locations and delivery routes with coordinates",
      path: "/geospatial",
      implemented: false,
    },
    {
      name: "Relational Data",
      description: "Social network with users, posts, and relationships",
      path: "/relational",
      implemented: false,
    },
    {
      name: "Statistical Data",
      description: "Demographic distributions and survey results",
      path: "/statistics",
      implemented: false,
    },
    {
      name: "Document/Rich Content",
      description: "Articles, documentation, and rich text content",
      path: "/documents",
      implemented: false,
    },
    {
      name: "Event/Calendar Data",
      description: "Meetings, deadlines, and calendar events",
      path: "/events",
      implemented: true,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">API Handling Learning Project</h1>
      <p className="text-lg mb-8">
        Explore different API types and learn how to handle various data structures in React.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiTypes.map((api) => (
          <Card key={api.name} className={!api.implemented ? "opacity-70" : ""}>
            <CardHeader>
              <CardTitle>{api.name}</CardTitle>
              <CardDescription>{api.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {api.implemented
                  ? "✅ Implemented"
                  : "⏳ Coming soon"}
              </p>
            </CardContent>
            <CardFooter>
              {api.implemented ? (
                <Button asChild>
                  <Link to={api.path}>Explore</Link>
                </Button>
              ) : (
                <Button disabled>Coming Soon</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
