import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product, ProductsResponse } from '@/types/product';
import { createSlug } from '@/utils/slug';
import { get } from '@/api/client';

// Basic hook to fetch all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async ({ signal }): Promise<Product[]> => {
      try {
        // Pass the AbortSignal to the request
        const response = await get<ProductsResponse>('/products', { signal });

        // The API returns { data: Product[], meta: {...} }
        if (response.data && Array.isArray(response.data.data)) {
          // Add slug to each product
          const productsWithSlugs = response.data.data.map(product => ({
            ...product,
            slug: createSlug(product.name)
          }));
          return productsWithSlugs;
        } else {
          console.error('Unexpected API response format:', response.data);
          return [];
        }
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
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
    queryFn: async ({ signal }): Promise<ProductsResponse> => {
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

        // Make the API request with query parameters and pass the AbortSignal
        const url = `/products?${queryParams.toString()}`;
        const response = await get<ProductsResponse>(url, { signal });

        // Add slug to each product
        const responseWithSlugs = {
          ...response.data,
          data: response.data.data.map(product => ({
            ...product,
            slug: createSlug(product.name)
          }))
        };

        return responseWithSlugs;
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        console.error('Error fetching filtered products:', error);
        throw error;
      }
    },
    // Keep previous data while loading new data (useful for pagination)
    staleTime: 5000, // Keeps data fresh for 5 seconds
  });
}

// Hook to fetch a single product by ID
export function useProduct(id: number | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async ({ signal }): Promise<Product> => {
      if (id === null) {
        throw new Error('Product ID is required');
      }

      try {
        const response = await get<Product>(`/products/${id}`, { signal });

        // Add slug to the product
        const productWithSlug = {
          ...response.data,
          slug: createSlug(response.data.name)
        };

        return productWithSlug;
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    // Don't run the query if id is null
    enabled: id !== null,
  });
}

// Hook to fetch a product by slug
export function useProductBySlug(slug: string | null) {
  return useQuery({
    queryKey: ['productBySlug', slug],
    queryFn: async ({ signal }): Promise<Product> => {
      if (!slug) {
        throw new Error('Product slug is required');
      }

      try {
        // Since the API doesn't support fetching by slug, we need to fetch all products
        // and find the one with the matching slug
        const response = await get<ProductsResponse>('/products', { signal });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Unexpected API response format');
        }

        // Find the product with the matching slug
        const products = response.data.data;
        const product = products.find(p => createSlug(p.name) === slug);

        if (!product) {
          throw new Error('Product not found');
        }

        // Add slug to the product
        return {
          ...product,
          slug
        };
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    // Don't run the query if slug is null
    enabled: slug !== null,
  });
}

// Hook to fetch products by category
export function useProductsByCategory(category: string | null, excludeProductId?: number) {
  return useQuery({
    queryKey: ['productsByCategory', category, excludeProductId],
    queryFn: async ({ signal }): Promise<Product[]> => {
      if (!category) {
        return [];
      }

      try {
        // Create query params
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);

        // Fetch products in the category with AbortSignal
        const response = await get<ProductsResponse>(`/products?${queryParams.toString()}`, { signal });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Unexpected API response format');
        }

        // Add slug to each product
        const productsWithSlugs = response.data.data.map(product => ({
          ...product,
          slug: createSlug(product.name)
        }));

        // Exclude the current product if an ID is provided
        if (excludeProductId) {
          return productsWithSlugs.filter(product => product.id !== excludeProductId);
        }

        return productsWithSlugs;
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: !!category,
  });
}

// Hook to fetch product categories
export function useProductCategories() {
  return useQuery({
    queryKey: ['productCategories'],
    queryFn: async ({ signal }): Promise<string[]> => {
      try {
        const response = await get<string[]>('/products/categories/all', { signal });
        return response.data;
      } catch (error) {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
  });
}
