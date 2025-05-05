import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const response = await axios.get<Product[]>("/api/products");
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  if (error) {
    return <div>Error fetching products</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Vite + React</h1>
      <h2>Number of products are : {products.length}</h2>
    </>
  );
}

export default App;
