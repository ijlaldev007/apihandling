import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import layout and pages
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/products/ProductsPage";
import ProductDetailsPage from "@/pages/products/ProductDetailsPage";
import HierarchicalPage from "./pages/Hierarchical/HierachicalPage";
import EventsPage from "./pages/events/EventsPage";
import TimeSeriesPage from './pages/time-series/TimeSeriesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailsPage />} />
          {/* Add more routes for other API types as they are implemented */}
          <Route path="hierarchical" element={<HierarchicalPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="/time-series" element={<TimeSeriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
