# React TanStack Query Learning Guide

## Introduction

TanStack Query (formerly React Query) is a powerful data fetching and state management library for React applications. It provides tools for fetching, caching, synchronizing, and updating server state in your React applications.

## Key Features

- **Automatic Caching**: Caches query results and provides them for subsequent requests
- **Background Fetching**: Automatically refetches data in the background
- **Stale-While-Revalidate**: Shows stale data while fetching fresh data
- **Pagination & Infinite Scroll**: Built-in support for paginated and infinite queries
- **Prefetching**: Prefetch data before it's needed
- **Mutations**: Easily update server data
- **Devtools**: Powerful devtools for debugging queries and cache
- **TypeScript Support**: First-class TypeScript support

## Installation

```bash
# npm
npm install @tanstack/react-query

# yarn
yarn add @tanstack/react-query

# pnpm
pnpm add @tanstack/react-query
```

For devtools:

```bash
npm install @tanstack/react-query-devtools
```

## Basic Setup

First, set up the QueryClient and QueryClientProvider:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## Basic Queries

The most basic way to use React Query is with the `useQuery` hook:

```tsx
import { useQuery } from '@tanstack/react-query'

function Products() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## Query Keys

Query keys are used to identify and track queries. They can be:

- Strings: `['products']`
- Arrays with variables: `['product', productId]`
- Objects: `['products', { category: 'electronics' }]`

```tsx
// A list of products
useQuery({ queryKey: ['products'], queryFn: fetchProducts })

// A product with a specific ID
useQuery({ queryKey: ['product', productId], queryFn: () => fetchProduct(productId) })

// A filtered list of products
useQuery({ 
  queryKey: ['products', { category, sort }], 
  queryFn: () => fetchProducts({ category, sort }) 
})
```

## Custom Hooks

It's a best practice to create custom hooks for your queries:

```tsx
function useProducts(filters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  })
}

// Usage
const { data, isLoading } = useProducts({ category: 'electronics' })
```

## Mutations

Mutations are used to create/update/delete data:

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddProduct() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      }).then(res => res.json())
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      mutation.mutate({ name: 'New Product', price: 10.99 })
    }}>
      <button type="submit">Add Product</button>
    </form>
  )
}
```

## Pagination

TanStack Query makes pagination simple:

```tsx
function Products() {
  const [page, setPage] = useState(1)
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', { page }],
    queryFn: () => fetchProducts(page),
    keepPreviousData: true, // Keep previous data while fetching new data
  })

  return (
    <div>
      {data?.products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPage(old => old + 1)}
        disabled={!data?.hasMore}
      >
        Next
      </button>
    </div>
  )
}
```

## Infinite Queries

For infinite scrolling:

```tsx
function Products() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  return (
    <div>
      {data?.pages.map(page => (
        page.products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  )
}
```

## Implementing in Your Project

To implement TanStack Query in your current project:

1. Install the package
2. Set up the QueryClientProvider in your main App component
3. Convert your existing Axios calls to use useQuery and useMutation
4. Create custom hooks for each API endpoint
5. Implement proper error handling and loading states

## Example Implementation for Products API

```tsx
// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Product, ProductsResponse } from '@/types/product'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await axios.get<ProductsResponse>('/api/products')
      return response.data.data
    }
  })
}

// ProductsPage.tsx
import { useProducts } from '@/hooks/useProducts'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '@/components/data-table/columns'

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()
  
  if (error) {
    return <ErrorComponent />
  }
  
  if (isLoading) {
    return <LoadingComponent />
  }
  
  return (
    <div>
      <DataTable columns={columns} data={products} searchColumn="name" />
    </div>
  )
}
```

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [TanStack Query GitHub](https://github.com/TanStack/query)
- [TanStack Query Examples](https://tanstack.com/query/latest/docs/react/examples/simple)
