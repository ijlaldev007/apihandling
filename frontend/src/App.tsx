import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import layout and pages
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/products/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          {/* Add more routes for other API types as they are implemented */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
