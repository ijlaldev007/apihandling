import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { get } from "@/api/client";

import type { HierarchicalNode, PathNode } from "@/types/hierarchical";

//basic function to fetch all hierarchical data

export function useHierarchicalData() {
  return useQuery({
    queryKey: ["hierarchicalData"],
    queryFn: async ({ signal }): Promise<HierarchicalNode> => {
      try {
        const response = await get<HierarchicalNode>("/hierarchical", { signal });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
  });
}

// function to fetch with id

export function useHierarchicalDataById(id: string | null) {
  return useQuery({
    queryKey: ["hierarchicalData", id],
    queryFn: async ({ signal }): Promise<HierarchicalNode> => {
      if (id === null) throw new Error("Node ID is required");
      try {
        const response = await get<HierarchicalNode>(`/hierarchical/${id}`, { signal });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: id !== null,
  });
}


// function to fetch id children

export function useHierarchicalNodeChildren(id: string | null) {
    return useQuery({
        queryKey: ["hierarchicalNodeChildren", id],
        queryFn: async ({ signal }): Promise<HierarchicalNode[]> => {
            if (id === null) throw new Error("Node ID is required");
            try {
                const response = await get<HierarchicalNode[]>(`/hierarchical/${id}/children`, { signal });
                return response.data;
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request cancelled:', error.message);
                    throw new Error('Request cancelled');
                }
                throw error;
            }
        },
        enabled: id !== null,
    });
}

// function to fetch id path
export function useHierarchicalNodePath(id: string | null) {
    return useQuery({
        queryKey: ["hierarchicalNodePath", id],
        queryFn: async ({ signal }): Promise<PathNode[]> => {
            if (id === null) throw new Error("Node ID is required");
            try {
                const response = await get<PathNode[]>(`/hierarchical/${id}/path`, { signal });
                return response.data;
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request cancelled:', error.message);
                    throw new Error('Request cancelled');
                }
                throw error;
            }
        },
        enabled: id !== null
    });
};
