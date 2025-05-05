# API Handling Learning Project

This project is designed as a comprehensive learning path for modern React development with a focus on data fetching, state management, and UI patterns. It covers React Query, custom hooks, Axios, API handling, and implementing various layout patterns for different data types.

## Project Overview

This is a full-stack application with:
- **Frontend**: React with TypeScript, built using Vite
- **Backend**: Express.js API serving various data types

The project will progressively implement more advanced patterns and techniques to demonstrate best practices in modern React development, with a focus on handling different API data structures and presenting them appropriately.

## Learning Objectives

1. **API Handling with Axios**
   - Basic requests (GET, POST, PUT, DELETE, PATCH)
   - Request/response interceptors for global error handling and authentication
   - Error handling strategies (global vs. local)
   - Request cancellation for race conditions and component unmounting
   - Authentication headers and token refresh patterns
   - File uploads with progress tracking
   - Handling different response formats (JSON, XML, CSV)
   - Batch requests and request throttling

2. **React Query**
   - Basic queries and mutations with proper typing
   - Caching strategies and invalidation patterns
   - Pagination (offset-based, cursor-based) and infinite scrolling
   - Optimistic updates with rollback on error
   - Dependent and parallel queries
   - Background fetching, refetching, and polling
   - Prefetching and lazy loading data
   - Query cancellation and retry logic
   - Devtools and debugging
   - Server state vs. client state management

3. **Custom Hooks**
   - Creating reusable data fetching hooks with proper TypeScript generics
   - Form handling hooks with validation (Formik/React Hook Form patterns)
   - UI state management hooks (modals, toasts, drawers)
   - Authentication and authorization hooks
   - Composition of hooks for complex behaviors
   - Memoization patterns for performance
   - Hooks for animations and transitions
   - Hooks for device features (geolocation, camera, sensors)
   - Hooks for browser APIs (localStorage, IndexedDB, WebSockets)

4. **Layout Patterns for Different Data Types**
   - List views (grid, table, cards, timelines, kanban boards)
   - Detail views with tabs, accordions, and expandable sections
   - Master-detail layouts with responsive considerations
   - Dashboards with different chart types
   - Responsive layouts with breakpoints
   - Skeleton loading states and content placeholders
   - Error boundaries and fallback UI patterns
   - Virtualized lists for large datasets
   - Drag-and-drop interfaces
   - Infinite canvas and zoom interfaces

## Data Types and Visualization Patterns

### 1. Tabular Data
- **Example**: Product inventory, financial transactions, user lists
- **API Response Structure**:
```json
{
  "data": [
    { "id": 1, "name": "Product A", "price": 19.99, "stock": 42, "category": "Electronics" },
    { "id": 2, "name": "Product B", "price": 29.99, "stock": 13, "category": "Home" }
  ],
  "meta": {
    "total": 243,
    "page": 1,
    "limit": 10
  }
}
```
- **Visualization**: Data tables with sorting, filtering, pagination
- **Components**: Table, TableHeader, TableRow, TableCell, Pagination
- **Challenges**: Handling large datasets, column resizing, fixed headers

### 2. Hierarchical Data
- **Example**: Organization charts, file systems, nested comments
- **API Response Structure**:
```json
{
  "id": "root",
  "name": "Company",
  "children": [
    {
      "id": "dept1",
      "name": "Engineering",
      "children": [
        { "id": "team1", "name": "Frontend", "children": [] },
        { "id": "team2", "name": "Backend", "children": [] }
      ]
    },
    {
      "id": "dept2",
      "name": "Marketing",
      "children": []
    }
  ]
}
```
- **Visualization**: Tree views, expandable lists, breadcrumbs
- **Components**: TreeView, TreeNode, Breadcrumb, ExpandableList
- **Challenges**: Recursive rendering, state management for expanded nodes

### 3. Time Series Data
- **Example**: Stock prices, sensor readings, analytics
- **API Response Structure**:
```json
{
  "data": [
    { "timestamp": "2023-01-01T00:00:00Z", "value": 42.5 },
    { "timestamp": "2023-01-02T00:00:00Z", "value": 43.2 },
    { "timestamp": "2023-01-03T00:00:00Z", "value": 41.7 }
  ],
  "meta": {
    "metric": "temperature",
    "unit": "celsius"
  }
}
```
- **Visualization**: Line charts, area charts, sparklines
- **Components**: TimeSeriesChart, DateRangePicker, Tooltip
- **Challenges**: Data aggregation, timezone handling, real-time updates

### 4. Geospatial Data
- **Example**: Store locations, delivery routes, heat maps
- **API Response Structure**:
```json
{
  "locations": [
    { "id": 1, "name": "Store A", "lat": 40.7128, "lng": -74.0060, "type": "retail" },
    { "id": 2, "name": "Store B", "lat": 34.0522, "lng": -118.2437, "type": "warehouse" }
  ]
}
```
- **Visualization**: Maps with markers, polygons, heatmaps
- **Components**: Map, Marker, Polygon, InfoWindow
- **Challenges**: Map libraries integration, clustering, performance with many points

### 5. Relational Data
- **Example**: Social networks, product recommendations
- **API Response Structure**:
```json
{
  "nodes": [
    { "id": "user1", "name": "Alice", "type": "user" },
    { "id": "user2", "name": "Bob", "type": "user" },
    { "id": "post1", "title": "Hello world", "type": "post" }
  ],
  "edges": [
    { "source": "user1", "target": "user2", "type": "follows" },
    { "source": "user1", "target": "post1", "type": "created" }
  ]
}
```
- **Visualization**: Network graphs, relationship diagrams
- **Components**: Graph, Node, Edge, ForceDirectedLayout
- **Challenges**: Layout algorithms, interactive exploration

### 6. Statistical Data
- **Example**: Survey results, performance metrics
- **API Response Structure**:
```json
{
  "distribution": [
    { "bucket": "18-24", "count": 120 },
    { "bucket": "25-34", "count": 350 },
    { "bucket": "35-44", "count": 270 }
  ],
  "summary": {
    "mean": 32.4,
    "median": 30,
    "mode": 28
  }
}
```
- **Visualization**: Bar charts, histograms, pie charts
- **Components**: BarChart, PieChart, Histogram, StatCard
- **Challenges**: Proper scale selection, outlier handling

### 7. Document/Rich Content
- **Example**: Articles, product descriptions, documentation
- **API Response Structure**:
```json
{
  "id": "article1",
  "title": "Getting Started",
  "content": "<h1>Welcome</h1><p>This is a <strong>formatted</strong> article.</p>",
  "attachments": [
    { "type": "image", "url": "https://example.com/image.jpg" },
    { "type": "pdf", "url": "https://example.com/document.pdf" }
  ]
}
```
- **Visualization**: Rich text editors, document viewers
- **Components**: RichTextViewer, MediaGallery, DocumentPreview
- **Challenges**: Sanitizing HTML, responsive media embedding

### 8. Event/Calendar Data
- **Example**: Appointments, schedules, project timelines
- **API Response Structure**:
```json
{
  "events": [
    {
      "id": "evt1",
      "title": "Team Meeting",
      "start": "2023-06-15T10:00:00Z",
      "end": "2023-06-15T11:00:00Z",
      "location": "Conference Room A"
    },
    {
      "id": "evt2",
      "title": "Product Launch",
      "start": "2023-06-20T09:00:00Z",
      "end": "2023-06-20T17:00:00Z",
      "location": "Main Hall"
    }
  ]
}
```
- **Visualization**: Calendars, timelines, Gantt charts
- **Components**: Calendar, EventCard, Timeline, DatePicker
- **Challenges**: Recurring events, timezone handling, drag-and-drop scheduling

## Implementation Plan

### Phase 1: Foundation and API Client Setup
- [x] Set up Express backend with multiple data type endpoints
- [x] Configure Axios in React frontend
- [ ] Create a base API client with TypeScript generics
- [ ] Implement request/response interceptors for error handling
- [ ] Add request cancellation on component unmount
- [ ] Create type definitions for all API responses
- [ ] Implement authentication headers and token refresh
- [ ] Add request/response logging for debugging
- [ ] Create a mock API service for offline development

### Phase 2: Data Type-Specific API Services

#### Tabular Data (Products API)
- [ ] Create ProductService with methods for all endpoints
- [ ] Implement filtering, sorting, and pagination
- [ ] Add type-safe response handling
- [ ] Create comprehensive error handling
- [ ] Implement optimistic updates for product mutations

#### Hierarchical Data
- [ ] Create HierarchicalService for organization data
- [ ] Implement methods for traversing the hierarchy
- [ ] Add utilities for finding paths between nodes
- [ ] Create functions for manipulating tree structures
- [ ] Implement caching for frequently accessed nodes

#### Time Series Data
- [ ] Create TimeSeriesService with data aggregation
- [ ] Implement date range filtering and formatting
- [ ] Add methods for comparing multiple metrics
- [ ] Create utilities for calculating trends and anomalies
- [ ] Implement real-time updates with polling

#### Geospatial Data
- [ ] Create GeospatialService with location methods
- [ ] Implement distance calculations and sorting
- [ ] Add utilities for route optimization
- [ ] Create functions for clustering nearby points
- [ ] Implement geofencing and boundary checks

#### Relational Data
- [ ] Create RelationalService for social graph data
- [ ] Implement methods for traversing relationships
- [ ] Add utilities for finding connections and paths
- [ ] Create recommendation algorithms
- [ ] Implement graph manipulation functions

#### Statistical Data
- [ ] Create StatisticsService with analysis methods
- [ ] Implement aggregation and summary calculations
- [ ] Add utilities for normalizing distributions
- [ ] Create functions for trend identification
- [ ] Implement comparative analysis between datasets

#### Document Data
- [ ] Create DocumentService with content handling
- [ ] Implement search and filtering capabilities
- [ ] Add utilities for content sanitization
- [ ] Create functions for handling attachments
- [ ] Implement caching for large documents

#### Event/Calendar Data
- [ ] Create EventService with scheduling methods
- [ ] Implement date range filtering and formatting
- [ ] Add utilities for recurring event expansion
- [ ] Create functions for conflict detection
- [ ] Implement timezone handling and conversion

### Phase 3: Custom Hooks for Each Data Type

#### General Hooks
- [ ] Create useApi hook for base API interactions
- [ ] Implement useError for standardized error handling
- [ ] Add useLoading for loading state management
- [ ] Create usePagination with different strategies
- [ ] Implement useSearch for generic search functionality
- [ ] Add useSort for sortable collections
- [ ] Create useFilter for complex filtering
- [ ] Implement useDebounce and useThrottle for input handling
- [ ] Add useLocalStorage for persistent client state
- [ ] Create useMediaQuery for responsive design

#### Data Type-Specific Hooks
- [ ] Create useProducts hook for product data
- [ ] Implement useHierarchy for tree data
- [ ] Add useTimeSeries for time-based data
- [ ] Create useMap for geospatial data
- [ ] Implement useGraph for relational data
- [ ] Add useStatistics for statistical data
- [ ] Create useDocument for rich content
- [ ] Implement useCalendar for event data

### Phase 4: React Query Implementation

#### Basic Setup
- [ ] Set up React Query provider and devtools
- [ ] Create queryClient configuration
- [ ] Implement global error handling
- [ ] Add default query options
- [ ] Create custom query hooks

#### Data Type-Specific Queries
- [ ] Convert product hooks to use React Query
- [ ] Implement hierarchical data queries with caching
- [ ] Add time series queries with date-based keys
- [ ] Create geospatial queries with location-based invalidation
- [ ] Implement relational data queries with entity normalization
- [ ] Add statistical data queries with polling
- [ ] Create document queries with prefetching
- [ ] Implement calendar queries with date range prefetching

#### Advanced React Query Features
- [ ] Implement query invalidation strategies
- [ ] Add infinite scrolling for large datasets
- [ ] Create mutations with optimistic updates
- [ ] Implement dependent queries for related data
- [ ] Add background refetching and polling
- [ ] Create query cancellation and retry logic
- [ ] Implement query caching strategies
- [ ] Add offline support with persistence

### Phase 5: UI Components for Each Data Type

#### Tabular Data (Products)
- [ ] Create a data table component with sorting and filtering
- [ ] Implement row selection and bulk actions
- [ ] Add column customization and resizing
- [ ] Create expandable rows for details
- [ ] Implement pagination controls
- [ ] Add export functionality (CSV, Excel)
- [ ] Create print-friendly views

#### Hierarchical Data
- [ ] Create a tree view component with expand/collapse
- [ ] Implement drag-and-drop for reorganizing
- [ ] Add context menus for node actions
- [ ] Create breadcrumb navigation
- [ ] Implement search within tree
- [ ] Add horizontal tree layout option
- [ ] Create visualization for large hierarchies

#### Time Series Data
- [ ] Create line and area charts for time series
- [ ] Implement zoom and pan controls
- [ ] Add date range selector
- [ ] Create annotations and markers
- [ ] Implement real-time updates
- [ ] Add comparison view for multiple series
- [ ] Create export and sharing options

#### Geospatial Data
- [ ] Create map component with markers
- [ ] Implement clustering for many points
- [ ] Add route visualization
- [ ] Create heatmaps for density
- [ ] Implement geofencing visualization
- [ ] Add location search and filtering
- [ ] Create responsive map controls

#### Relational Data
- [ ] Create force-directed graph visualization
- [ ] Implement node and edge styling
- [ ] Add interactive exploration
- [ ] Create filtering by relationship type
- [ ] Implement zooming and focusing
- [ ] Add node details panel
- [ ] Create path highlighting

#### Statistical Data
- [ ] Create bar charts and histograms
- [ ] Implement pie and donut charts
- [ ] Add statistical cards with KPIs
- [ ] Create distribution visualizations
- [ ] Implement comparative analysis views
- [ ] Add trend indicators
- [ ] Create drill-down capabilities

#### Document Data
- [ ] Create rich text viewer with syntax highlighting
- [ ] Implement media gallery for attachments
- [ ] Add table of contents navigation
- [ ] Create print and export options
- [ ] Implement search within documents
- [ ] Add annotation capabilities
- [ ] Create responsive layouts for different devices

#### Event/Calendar Data
- [ ] Create month, week, and day calendar views
- [ ] Implement agenda list view
- [ ] Add event creation and editing
- [ ] Create drag-and-drop scheduling
- [ ] Implement recurring event visualization
- [ ] Add timeline view for projects
- [ ] Create reminders and notifications

### Phase 6: Advanced Features and Optimization
- [ ] Implement authentication and protected routes
- [ ] Add role-based access control
- [ ] Create real-time updates with WebSockets
- [ ] Implement advanced search with filters
- [ ] Add dark/light theme switching
- [ ] Create virtualized lists for performance
- [ ] Implement code splitting and lazy loading
- [ ] Add keyboard navigation and shortcuts
- [ ] Create accessibility features (ARIA)
- [ ] Implement comprehensive test suite
- [ ] Add performance monitoring and optimization
- [ ] Create documentation and usage examples

## Project Structure

```
apihandling/
├── backend/                       # Express server
│   ├── index.js                   # Server entry point with API endpoints
│   └── package.json               # Backend dependencies
│
├── frontend/                      # React application
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── api/                   # API services and Axios configuration
│   │   │   ├── client.ts          # Base Axios client with interceptors
│   │   │   ├── products.ts        # Product-specific API methods
│   │   │   └── types.ts           # API response and request types
│   │   │
│   │   ├── components/            # Reusable UI components
│   │   │   ├── common/            # Generic UI components
│   │   │   ├── products/          # Product-specific components
│   │   │   └── layout/            # Layout components
│   │   │
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── api/               # API-related hooks
│   │   │   ├── ui/                # UI-related hooks
│   │   │   └── form/              # Form-related hooks
│   │   │
│   │   ├── layouts/               # Layout components for different data types
│   │   │   ├── grid/              # Grid layout components
│   │   │   ├── table/             # Table layout components
│   │   │   ├── card/              # Card layout components
│   │   │   ├── chart/             # Chart layout components
│   │   │   └── map/               # Map layout components
│   │   │
│   │   ├── pages/                 # Page components
│   │   │   ├── products/          # Product-related pages
│   │   │   ├── dashboard/         # Dashboard pages
│   │   │   └── auth/              # Authentication pages
│   │   │
│   │   ├── types/                 # TypeScript type definitions
│   │   │   ├── api.ts             # API-related types
│   │   │   ├── models.ts          # Domain model types
│   │   │   └── ui.ts              # UI-related types
│   │   │
│   │   ├── utils/                 # Utility functions
│   │   │   ├── formatting.ts      # Data formatting utilities
│   │   │   ├── validation.ts      # Validation utilities
│   │   │   └── testing.ts         # Testing utilities
│   │   │
│   │   ├── context/               # React context providers
│   │   │   ├── ThemeContext.tsx   # Theme context
│   │   │   └── AuthContext.tsx    # Authentication context
│   │   │
│   │   ├── App.tsx                # Main application component
│   │   └── main.tsx               # Application entry point
│   │
│   ├── package.json               # Frontend dependencies
│   └── vite.config.ts             # Vite configuration
│
└── README.md                      # Project documentation
```

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the development servers:
   ```
   # Start backend server (http://localhost:3000)
   cd backend
   npm start

   # In a new terminal, start frontend dev server
   cd frontend
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Backend API Endpoints

The backend provides the following endpoints for different data types:

### 1. Products API (Tabular Data)

- `GET /api/products` - Get all products with filtering, sorting, and pagination
  - Query parameters:
    - `search` - Filter products by name (case-insensitive)
    - `category` - Filter products by category
    - `minPrice` - Filter products with price >= minPrice
    - `maxPrice` - Filter products with price <= maxPrice
    - `sort` - Field to sort by (e.g., price, name, rating)
    - `order` - Sort order: 'asc' (default) or 'desc'
    - `page` - Page number for pagination
    - `limit` - Number of items per page
  - Response: Paginated product objects with metadata

- `GET /api/products/:id` - Get a single product by ID
  - Response: Detailed product object

- `GET /api/products/categories/all` - Get all product categories
  - Response: Array of category strings

### 2. Hierarchical Data API

- `GET /api/hierarchical` - Get complete hierarchical organization structure
  - Response: Nested tree structure with departments, teams, and members

- `GET /api/hierarchical/:id` - Get a specific node in the hierarchy by ID
  - Response: Node object with its children

- `GET /api/hierarchical/:id/children` - Get children of a specific node
  - Response: Array of child nodes

- `GET /api/hierarchical/:id/path` - Get the path from root to a specific node
  - Response: Array of nodes representing the path

### 3. Time Series Data API

- `GET /api/time-series` - Get time series data with optional filtering
  - Query parameters:
    - `metric` - Type of metric (temperature, stock, users, traffic)
    - `days` - Number of days of data to return (1-365)
    - `resolution` - Data resolution (daily, hourly)
  - Response: Time series data points with metadata

- `GET /api/time-series/metrics` - Get available metrics for time series data
  - Response: Array of available metrics

- `GET /api/time-series/compare` - Compare multiple metrics over time
  - Query parameters:
    - `metrics` - Comma-separated list of metrics to compare
    - `days` - Number of days of data to return
  - Response: Multiple time series datasets for comparison

### 4. Geospatial Data API

- `GET /api/geospatial/locations` - Get all location data
  - Query parameters:
    - `type` - Filter locations by type (retail, warehouse, distribution)
  - Response: Array of location objects with coordinates

- `GET /api/geospatial/locations/:id` - Get a specific location by ID
  - Response: Detailed location object

- `GET /api/geospatial/routes` - Get all delivery routes
  - Query parameters:
    - `start` - Filter routes by starting location ID
    - `end` - Filter routes by ending location ID
  - Response: Array of route objects with stops

- `GET /api/geospatial/routes/:id` - Get a specific route by ID with location details
  - Response: Detailed route object with enhanced stop information

- `GET /api/geospatial/nearby` - Find locations within a radius of coordinates
  - Query parameters:
    - `lat` - Latitude
    - `lng` - Longitude
    - `radius` - Radius in miles (default: 10)
  - Response: Locations within the specified radius, sorted by distance

- `GET /api/geospatial/types` - Get all location types
  - Response: Array of location type strings

### 5. Relational Data API

- `GET /api/relational` - Get all nodes and edges in the social network
  - Response: Complete social network data with nodes and edges

- `GET /api/relational/nodes` - Get all nodes in the network
  - Query parameters:
    - `type` - Filter nodes by type (user, post, group)
  - Response: Array of node objects

- `GET /api/relational/nodes/:id` - Get a specific node by ID
  - Response: Detailed node object

- `GET /api/relational/edges` - Get all edges (relationships) in the network
  - Query parameters:
    - `type` - Filter edges by type (follows, created, liked, member, admin)
    - `source` - Filter edges by source node ID
    - `target` - Filter edges by target node ID
  - Response: Array of edge objects

- `GET /api/relational/connections/:id` - Get all connections for a specific node
  - Response: Node with its connections (edges and connected nodes)

- `GET /api/relational/recommendations/:userId` - Get recommendations for a user
  - Response: Recommended users, posts, and groups based on network

### 6. Statistical Data API

- `GET /api/statistics/age` - Get age distribution statistics
  - Response: Age distribution data with summary statistics

- `GET /api/statistics/income` - Get income distribution statistics
  - Response: Income distribution data with summary statistics

- `GET /api/statistics/geographic` - Get geographic distribution statistics
  - Response: Geographic distribution data with percentages

- `GET /api/statistics/devices` - Get device usage statistics
  - Response: Device usage data with percentages

- `GET /api/statistics/satisfaction` - Get customer satisfaction survey results
  - Response: Satisfaction rating distribution with summary statistics

- `GET /api/statistics/dashboard` - Get all statistics for a dashboard
  - Response: Combined statistical data for all metrics

### 7. Document Data API

- `GET /api/documents` - Get all documents with optional filtering
  - Query parameters:
    - `category` - Filter documents by category
    - `tag` - Filter documents by tag
    - `search` - Search in document title and content
  - Response: Document metadata (without full content)

- `GET /api/documents/:id` - Get a specific document with full content
  - Response: Complete document with HTML content and attachments

- `GET /api/documents/categories/all` - Get all document categories
  - Response: Array of category strings

- `GET /api/documents/tags/all` - Get all document tags with counts
  - Response: Array of tags with usage counts

### 8. Event/Calendar Data API

- `GET /api/events` - Get all events with optional filtering
  - Query parameters:
    - `start` - Filter events starting on or after this date
    - `end` - Filter events starting on or before this date
    - `category` - Filter events by category
    - `attendee` - Filter events by attendee ID or name
    - `search` - Search in event title and description
  - Response: Array of event objects

- `GET /api/events/:id` - Get a specific event by ID
  - Response: Detailed event object with attendees and attachments

- `GET /api/events/day/:date` - Get all events for a specific day
  - Response: Events occurring on the specified day

- `GET /api/events/week/:startDate` - Get all events for a specific week
  - Response: Events occurring during the specified week

- `GET /api/events/month/:yearMonth` - Get all events for a specific month
  - Response: Events occurring during the specified month

- `GET /api/events/categories/all` - Get all event categories
  - Response: Array of event category strings

## Learning Resources

### React Query
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [React Query Course by TkDodo](https://ui.dev/react-query)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)

### Custom Hooks
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
- [useHooks - Custom React Hooks Collection](https://usehooks.com/)
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/)

### Axios
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Axios GitHub Repository](https://github.com/axios/axios)
- [Axios Interceptors Guide](https://blog.logrocket.com/axios-interceptors-react/)
- [Handling API Calls in React with Axios](https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/)

### TypeScript
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Layout Patterns
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Design Patterns](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns)
- [UI Patterns](https://ui-patterns.com/)

### Data Visualization
- [D3.js](https://d3js.org/)
- [Chart.js](https://www.chartjs.org/)
- [Recharts](https://recharts.org/)
- [Leaflet](https://leafletjs.com/) (for maps)
- [Visx](https://airbnb.io/visx/) (by Airbnb)

## Contributing

This project is for learning purposes. Feel free to fork it and extend it with your own features and experiments.

## License

MIT
