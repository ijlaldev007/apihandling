export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  description: string;
  features: string[];
  colors: string[];
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}
