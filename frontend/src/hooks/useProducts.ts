import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product, ProductsResponse } from '@/types/product';

// Basic hook to fetch all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      try {
        const response = await axios.get<ProductsResponse>('/api/products');
        
        // The API returns { data: Product[], meta: {...} }
        if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        } else {
          console.error('Unexpected API response format:', response.data);
          return [];
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
  });
}

// Advanced hook with filtering, sorting, and pagination
export interface ProductsQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export function useFilteredProducts(params: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async (): Promise<ProductsResponse> => {
      try {
        // Convert params object to URL search params
        const queryParams = new URLSearchParams();
        
        // Add each parameter to the query string if it exists
        if (params.search) queryParams.append('search', params.search);
        if (params.category) queryParams.append('category', params.category);
        if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.order) queryParams.append('order', params.order);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        
        // Make the API request with query parameters
        const url = `/api/products?${queryParams.toString()}`;
        const response = await axios.get<ProductsResponse>(url);
        
        return response.data;
      } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw error;
      }
    },
    // Keep previous data while loading new data (useful for pagination)
    keepPreviousData: true,
  });
}

// Hook to fetch a single product by ID
export function useProduct(id: number | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      if (id === null) {
        throw new Error('Product ID is required');
      }
      
      const response = await axios.get<Product>(`/api/products/${id}`);
      return response.data;
    },
    // Don't run the query if id is null
    enabled: id !== null,
  });
}

// Hook to fetch product categories
export function useProductCategories() {
  return useQuery({
    queryKey: ['productCategories'],
    queryFn: async (): Promise<string[]> => {
      const response = await axios.get<string[]>('/api/products/categories/all');
      return response.data;
    },
  });
}
