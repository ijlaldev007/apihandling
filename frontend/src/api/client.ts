import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

// Create a base axios instance
const apiClient = axios.create({
  baseURL: '/api', // This will be proxied to http://localhost:3000/api by Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication headers or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Generic GET request with AbortController support
export const get = async <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.get<T>(url, config);
};

// Generic POST request with AbortController support
export const post = async <T>(
  url: string, 
  data?: unknown, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.post<T>(url, data, config);
};

// Generic PUT request with AbortController support
export const put = async <T>(
  url: string, 
  data?: unknown, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.put<T>(url, data, config);
};

// Generic DELETE request with AbortController support
export const del = async <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.delete<T>(url, config);
};

// Helper function to create an AbortController with cleanup
export const createAbortController = () => {
  return new AbortController();
};

// Export the base client for direct use if needed
export default apiClient;
