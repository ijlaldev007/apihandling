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

### Phase 1: Foundation and Basic API Handling
- [x] Set up Express backend with sample product data
- [x] Configure Axios in React frontend
- [x] Implement basic product fetching
- [ ] Add comprehensive loading and error states
- [ ] Create a ProductService with Axios for all API calls
- [ ] Implement request/response interceptors
- [ ] Add request cancellation on component unmount
- [ ] Create a reusable API client with TypeScript generics
- [ ] Implement different response handlers (JSON, CSV)
- [ ] Add mock API service for offline development

### Phase 2: Custom Hooks and State Management
- [ ] Create useProducts hook for fetching products
- [ ] Implement useProductDetails hook for single product
- [ ] Add useSearch hook for filtering products
- [ ] Create usePagination hook with different strategies
- [ ] Develop useForm hook for product creation/editing
- [ ] Implement useLocalStorage for persistent client state
- [ ] Create useDebounce and useThrottle for input handling
- [ ] Add useMediaQuery for responsive design
- [ ] Implement useIntersectionObserver for lazy loading
- [ ] Create useEventListener for DOM event handling

### Phase 3: React Query Implementation
- [ ] Set up React Query provider and devtools
- [ ] Convert existing hooks to use React Query
- [ ] Implement query invalidation strategies
- [ ] Add infinite scrolling for products list
- [ ] Create mutations for product CRUD operations
- [ ] Implement optimistic updates with error handling
- [ ] Add prefetching for anticipated user actions
- [ ] Implement query cancellation and retry logic
- [ ] Create dependent queries for related data
- [ ] Add background refetching and polling for real-time data

### Phase 4: Basic Layout Patterns
- [ ] Create a grid layout for products
- [ ] Implement a table view with sorting and filtering
- [ ] Add a card layout with hover effects
- [ ] Create a master-detail view for product inspection
- [ ] Implement skeleton loading components
- [ ] Add responsive layouts for mobile/desktop
- [ ] Create error boundary components with fallbacks
- [ ] Implement modal and drawer components
- [ ] Add toast notifications for user feedback
- [ ] Create tabs and accordion components

### Phase 5: Advanced Data Visualization
- [ ] Implement time series charts for sales data
- [ ] Create a map view for store locations
- [ ] Add statistical visualizations for product metrics
- [ ] Implement a calendar view for product launches
- [ ] Create a hierarchical view for product categories
- [ ] Add a network graph for related products
- [ ] Implement a document viewer for product documentation
- [ ] Create a dashboard with multiple visualization types
- [ ] Add interactive filters and drill-down capabilities
- [ ] Implement print and export functionality

### Phase 6: Advanced Features and Optimization
- [ ] Add authentication and protected routes
- [ ] Implement real-time updates with WebSockets
- [ ] Create a shopping cart with React Query
- [ ] Add advanced search with filters and sorting
- [ ] Implement drag-and-drop for product organization
- [ ] Add dark/light theme switching
- [ ] Create virtualized lists for performance
- [ ] Implement code splitting and lazy loading
- [ ] Add accessibility features (ARIA, keyboard navigation)
- [ ] Create comprehensive test suite (unit, integration, e2e)

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

The backend currently provides the following endpoints:

### Products API

- `GET /api/products` - Get all products
  - Query parameters:
    - `search` - Filter products by name (case-insensitive)
  - Response: Array of product objects
  - Example response:
    ```json
    [
      {
        "id": 1,
        "name": "Wireless Mouse",
        "price": 15.99,
        "image": "https://via.placeholder.com/150"
      },
      ...
    ]
    ```

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
