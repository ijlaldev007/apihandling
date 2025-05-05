import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const apiDocs = {
    name: "API Handling Learning Project API",
    version: "1.0.0",
    description: "API for learning React Query, custom hooks, and API handling with different data types",
    dataTypes: [
      {
        name: "Tabular Data",
        endpoint: "/api/products",
        description: "Product inventory with filtering, sorting, and pagination"
      },
      {
        name: "Hierarchical Data",
        endpoint: "/api/hierarchical",
        description: "Organization chart with nested structure"
      },
      {
        name: "Time Series Data",
        endpoint: "/api/time-series",
        description: "Temperature, stock prices, user counts, and traffic data over time"
      },
      {
        name: "Geospatial Data",
        endpoint: "/api/geospatial",
        description: "Store locations and delivery routes with coordinates"
      },
      {
        name: "Relational Data",
        endpoint: "/api/relational",
        description: "Social network with users, posts, and relationships"
      },
      {
        name: "Statistical Data",
        endpoint: "/api/statistics",
        description: "Demographic distributions and survey results"
      },
      {
        name: "Document/Rich Content",
        endpoint: "/api/documents",
        description: "Articles, documentation, and rich text content"
      },
      {
        name: "Event/Calendar Data",
        endpoint: "/api/events",
        description: "Meetings, deadlines, and calendar events"
      }
    ],
    endpoints: [
      // Products (Tabular Data)
      {
        path: "/api/products",
        method: "GET",
        description: "Get all products with optional filtering, sorting, and pagination",
        parameters: [
          { name: "search", type: "string", description: "Filter products by name (case-insensitive)" },
          { name: "category", type: "string", description: "Filter products by category" },
          { name: "minPrice", type: "number", description: "Filter products with price >= minPrice" },
          { name: "maxPrice", type: "number", description: "Filter products with price <= maxPrice" },
          { name: "sort", type: "string", description: "Field to sort by (e.g., price, name, rating)" },
          { name: "order", type: "string", description: "Sort order: 'asc' (default) or 'desc'" },
          { name: "page", type: "number", description: "Page number for pagination (requires limit)" },
          { name: "limit", type: "number", description: "Number of items per page (requires page)" }
        ],
        examples: [
          { url: "/api/products", description: "Get all products" },
          { url: "/api/products?search=mouse", description: "Search for products containing 'mouse'" },
          { url: "/api/products?category=electronics", description: "Get all electronics products" },
          { url: "/api/products?minPrice=50&maxPrice=100", description: "Get products between $50 and $100" },
          { url: "/api/products?sort=price&order=desc", description: "Get products sorted by price (highest first)" },
          { url: "/api/products?page=1&limit=5", description: "Get first page with 5 products per page" }
        ]
      },
      {
        path: "/api/products/:id",
        method: "GET",
        description: "Get a single product by ID",
        parameters: [
          { name: "id", type: "number", description: "Product ID", required: true }
        ],
        examples: [
          { url: "/api/products/1", description: "Get product with ID 1" }
        ]
      },
      {
        path: "/api/products/categories/all",
        method: "GET",
        description: "Get all product categories",
        examples: [
          { url: "/api/products/categories/all", description: "Get all product categories" }
        ]
      },

      // Hierarchical Data
      {
        path: "/api/hierarchical",
        method: "GET",
        description: "Get complete hierarchical organization structure",
        examples: [
          { url: "/api/hierarchical", description: "Get the full organization chart" }
        ]
      },
      {
        path: "/api/hierarchical/:id",
        method: "GET",
        description: "Get a specific node in the hierarchy by ID",
        parameters: [
          { name: "id", type: "string", description: "Node ID", required: true }
        ],
        examples: [
          { url: "/api/hierarchical/dept1", description: "Get the Engineering department node" }
        ]
      },
      {
        path: "/api/hierarchical/:id/children",
        method: "GET",
        description: "Get children of a specific node",
        parameters: [
          { name: "id", type: "string", description: "Node ID", required: true }
        ],
        examples: [
          { url: "/api/hierarchical/dept1/children", description: "Get all teams in the Engineering department" }
        ]
      },
      {
        path: "/api/hierarchical/:id/path",
        method: "GET",
        description: "Get the path from root to a specific node",
        parameters: [
          { name: "id", type: "string", description: "Node ID", required: true }
        ],
        examples: [
          { url: "/api/hierarchical/team1/path", description: "Get the path from Company to Frontend team" }
        ]
      },

      // Time Series Data
      {
        path: "/api/time-series",
        method: "GET",
        description: "Get time series data with optional filtering",
        parameters: [
          { name: "metric", type: "string", description: "Type of metric (temperature, stock, users, traffic)" },
          { name: "days", type: "number", description: "Number of days of data to return (1-365)" },
          { name: "resolution", type: "string", description: "Data resolution (daily, hourly)" }
        ],
        examples: [
          { url: "/api/time-series", description: "Get default time series data (temperature, 30 days)" },
          { url: "/api/time-series?metric=stock&days=60", description: "Get 60 days of stock price data" },
          { url: "/api/time-series?metric=users&days=7&resolution=hourly", description: "Get hourly user data for 7 days" }
        ]
      },
      {
        path: "/api/time-series/metrics",
        method: "GET",
        description: "Get available metrics for time series data",
        examples: [
          { url: "/api/time-series/metrics", description: "Get all available metrics" }
        ]
      },
      {
        path: "/api/time-series/compare",
        method: "GET",
        description: "Compare multiple metrics over time",
        parameters: [
          { name: "metrics", type: "string", description: "Comma-separated list of metrics to compare" },
          { name: "days", type: "number", description: "Number of days of data to return (1-365)" }
        ],
        examples: [
          { url: "/api/time-series/compare?metrics=temperature,users&days=30", description: "Compare temperature and users for 30 days" }
        ]
      },

      // Geospatial Data
      {
        path: "/api/geospatial/locations",
        method: "GET",
        description: "Get all location data",
        parameters: [
          { name: "type", type: "string", description: "Filter locations by type (retail, warehouse, distribution)" }
        ],
        examples: [
          { url: "/api/geospatial/locations", description: "Get all locations" },
          { url: "/api/geospatial/locations?type=retail", description: "Get all retail locations" }
        ]
      },
      {
        path: "/api/geospatial/locations/:id",
        method: "GET",
        description: "Get a specific location by ID",
        parameters: [
          { name: "id", type: "number", description: "Location ID", required: true }
        ],
        examples: [
          { url: "/api/geospatial/locations/1", description: "Get location with ID 1" }
        ]
      },
      {
        path: "/api/geospatial/routes",
        method: "GET",
        description: "Get all delivery routes",
        parameters: [
          { name: "start", type: "number", description: "Filter routes by starting location ID" },
          { name: "end", type: "number", description: "Filter routes by ending location ID" }
        ],
        examples: [
          { url: "/api/geospatial/routes", description: "Get all routes" },
          { url: "/api/geospatial/routes?start=4", description: "Get all routes starting from location 4" }
        ]
      },
      {
        path: "/api/geospatial/routes/:id",
        method: "GET",
        description: "Get a specific route by ID with location details",
        parameters: [
          { name: "id", type: "number", description: "Route ID", required: true }
        ],
        examples: [
          { url: "/api/geospatial/routes/1", description: "Get route with ID 1" }
        ]
      },
      {
        path: "/api/geospatial/nearby",
        method: "GET",
        description: "Find locations within a radius of coordinates",
        parameters: [
          { name: "lat", type: "number", description: "Latitude", required: true },
          { name: "lng", type: "number", description: "Longitude", required: true },
          { name: "radius", type: "number", description: "Radius in miles (default: 10)" }
        ],
        examples: [
          { url: "/api/geospatial/nearby?lat=40.7128&lng=-74.0060&radius=5", description: "Find locations within 5 miles of NYC" }
        ]
      },
      {
        path: "/api/geospatial/types",
        method: "GET",
        description: "Get all location types",
        examples: [
          { url: "/api/geospatial/types", description: "Get all location types" }
        ]
      },

      // Relational Data
      {
        path: "/api/relational",
        method: "GET",
        description: "Get all nodes and edges in the social network",
        examples: [
          { url: "/api/relational", description: "Get complete social network data" }
        ]
      },
      {
        path: "/api/relational/nodes",
        method: "GET",
        description: "Get all nodes in the network",
        parameters: [
          { name: "type", type: "string", description: "Filter nodes by type (user, post, group)" }
        ],
        examples: [
          { url: "/api/relational/nodes", description: "Get all nodes" },
          { url: "/api/relational/nodes?type=user", description: "Get all user nodes" }
        ]
      },
      {
        path: "/api/relational/nodes/:id",
        method: "GET",
        description: "Get a specific node by ID",
        parameters: [
          { name: "id", type: "string", description: "Node ID", required: true }
        ],
        examples: [
          { url: "/api/relational/nodes/user1", description: "Get user with ID user1" }
        ]
      },
      {
        path: "/api/relational/edges",
        method: "GET",
        description: "Get all edges (relationships) in the network",
        parameters: [
          { name: "type", type: "string", description: "Filter edges by type (follows, created, liked, member, admin)" },
          { name: "source", type: "string", description: "Filter edges by source node ID" },
          { name: "target", type: "string", description: "Filter edges by target node ID" }
        ],
        examples: [
          { url: "/api/relational/edges", description: "Get all relationships" },
          { url: "/api/relational/edges?type=follows", description: "Get all follow relationships" },
          { url: "/api/relational/edges?source=user1", description: "Get all relationships where user1 is the source" }
        ]
      },
      {
        path: "/api/relational/connections/:id",
        method: "GET",
        description: "Get all connections for a specific node",
        parameters: [
          { name: "id", type: "string", description: "Node ID", required: true }
        ],
        examples: [
          { url: "/api/relational/connections/user1", description: "Get all connections for user1" }
        ]
      },
      {
        path: "/api/relational/recommendations/:userId",
        method: "GET",
        description: "Get recommendations for a user based on their network",
        parameters: [
          { name: "userId", type: "string", description: "User ID", required: true }
        ],
        examples: [
          { url: "/api/relational/recommendations/user1", description: "Get recommendations for user1" }
        ]
      },

      // Statistical Data
      {
        path: "/api/statistics/age",
        method: "GET",
        description: "Get age distribution statistics",
        examples: [
          { url: "/api/statistics/age", description: "Get age distribution data" }
        ]
      },
      {
        path: "/api/statistics/income",
        method: "GET",
        description: "Get income distribution statistics",
        examples: [
          { url: "/api/statistics/income", description: "Get income distribution data" }
        ]
      },
      {
        path: "/api/statistics/geographic",
        method: "GET",
        description: "Get geographic distribution statistics",
        examples: [
          { url: "/api/statistics/geographic", description: "Get geographic distribution data" }
        ]
      },
      {
        path: "/api/statistics/devices",
        method: "GET",
        description: "Get device usage statistics",
        examples: [
          { url: "/api/statistics/devices", description: "Get device usage data" }
        ]
      },
      {
        path: "/api/statistics/satisfaction",
        method: "GET",
        description: "Get customer satisfaction survey results",
        examples: [
          { url: "/api/statistics/satisfaction", description: "Get satisfaction survey data" }
        ]
      },
      {
        path: "/api/statistics/dashboard",
        method: "GET",
        description: "Get all statistics for a dashboard",
        examples: [
          { url: "/api/statistics/dashboard", description: "Get all statistical data" }
        ]
      },

      // Document/Rich Content
      {
        path: "/api/documents",
        method: "GET",
        description: "Get all documents with optional filtering",
        parameters: [
          { name: "category", type: "string", description: "Filter documents by category" },
          { name: "tag", type: "string", description: "Filter documents by tag" },
          { name: "search", type: "string", description: "Search in document title and content" }
        ],
        examples: [
          { url: "/api/documents", description: "Get all documents (metadata only)" },
          { url: "/api/documents?category=technical", description: "Get all technical documents" },
          { url: "/api/documents?tag=api", description: "Get all documents tagged with 'api'" },
          { url: "/api/documents?search=privacy", description: "Search for documents containing 'privacy'" }
        ]
      },
      {
        path: "/api/documents/:id",
        method: "GET",
        description: "Get a specific document with full content",
        parameters: [
          { name: "id", type: "string", description: "Document ID", required: true }
        ],
        examples: [
          { url: "/api/documents/doc1", description: "Get document with ID doc1" }
        ]
      },
      {
        path: "/api/documents/categories/all",
        method: "GET",
        description: "Get all document categories",
        examples: [
          { url: "/api/documents/categories/all", description: "Get all document categories" }
        ]
      },
      {
        path: "/api/documents/tags/all",
        method: "GET",
        description: "Get all document tags with counts",
        examples: [
          { url: "/api/documents/tags/all", description: "Get all document tags" }
        ]
      },

      // Event/Calendar Data
      {
        path: "/api/events",
        method: "GET",
        description: "Get all events with optional filtering",
        parameters: [
          { name: "start", type: "string", description: "Filter events starting on or after this date (ISO format)" },
          { name: "end", type: "string", description: "Filter events starting on or before this date (ISO format)" },
          { name: "category", type: "string", description: "Filter events by category" },
          { name: "attendee", type: "string", description: "Filter events by attendee ID or name" },
          { name: "search", type: "string", description: "Search in event title and description" }
        ],
        examples: [
          { url: "/api/events", description: "Get all events" },
          { url: "/api/events?start=2023-07-01&end=2023-07-31", description: "Get events in July 2023" },
          { url: "/api/events?category=meeting", description: "Get all meeting events" },
          { url: "/api/events?attendee=user1", description: "Get events attended by user1" },
          { url: "/api/events?search=quarterly", description: "Search for events containing 'quarterly'" }
        ]
      },
      {
        path: "/api/events/:id",
        method: "GET",
        description: "Get a specific event by ID",
        parameters: [
          { name: "id", type: "string", description: "Event ID", required: true }
        ],
        examples: [
          { url: "/api/events/evt1", description: "Get event with ID evt1" }
        ]
      },
      {
        path: "/api/events/day/:date",
        method: "GET",
        description: "Get all events for a specific day",
        parameters: [
          { name: "date", type: "string", description: "Date in YYYY-MM-DD format", required: true }
        ],
        examples: [
          { url: "/api/events/day/2023-07-15", description: "Get events on July 15, 2023" }
        ]
      },
      {
        path: "/api/events/week/:startDate",
        method: "GET",
        description: "Get all events for a specific week",
        parameters: [
          { name: "startDate", type: "string", description: "Start date of the week in YYYY-MM-DD format (Monday)", required: true }
        ],
        examples: [
          { url: "/api/events/week/2023-07-10", description: "Get events for the week starting July 10, 2023" }
        ]
      },
      {
        path: "/api/events/month/:yearMonth",
        method: "GET",
        description: "Get all events for a specific month",
        parameters: [
          { name: "yearMonth", type: "string", description: "Year and month in YYYY-MM format", required: true }
        ],
        examples: [
          { url: "/api/events/month/2023-07", description: "Get events for July 2023" }
        ]
      },
      {
        path: "/api/events/categories/all",
        method: "GET",
        description: "Get all event categories",
        examples: [
          { url: "/api/events/categories/all", description: "Get all event categories" }
        ]
      }
    ]
  };

  res.json(apiDocs);
});

export default router;
