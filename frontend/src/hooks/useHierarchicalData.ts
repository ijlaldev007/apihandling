import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { HierarchicalNode, PathNode } from "@/types/hierarchical";

//basic function to fetch all hierarchical data

export function useHierarchicalData() {
  return useQuery({
    queryKey: ["hierarchicalData"],
    queryFn: async (): Promise<HierarchicalNode> => {
      const response = await axios.get<HierarchicalNode>("/api/hierarchical");
      return response.data;
    },
  });
}

// function to fetch with id

export function useHierarchicalDataById(id: string | null) {
  return useQuery({
    queryKey: ["hierarchicalData", id],
    queryFn: async (): Promise<HierarchicalNode> => {
      if (id === null) throw new Error("Node ID is required");
      const response = await axios.get<HierarchicalNode>(`/api/hierarchical/${id}`);
      return response.data;
    },
    enabled: id !== null,
  });
}


// function to fetch id children

export function useHierarchicalNodeChildren(id: string | null) {
    return useQuery({
        queryKey: ["hierarchicalNodeChildren", id],
        queryFn: async (): Promise<HierarchicalNode[]> => {
            if (id === null) throw new Error("Node ID is required");
            const response = await axios.get<HierarchicalNode[]>(`/api/hierarchical/${id}/children`);
            return response.data;
        },
        enabled: id !== null,
    });
}

// function to fetch id path 
export function useHierarchicalNodePath(id: string | null) {
    return useQuery({
        queryKey: ["hierarchicalNodePath", id],
        queryFn: async (): Promise<PathNode[]> => {
            if (id === null) throw new Error("Node ID is required");
            const response = await axios.get<PathNode[]>(`/api/hierarchical/${id}/path`);
            return response.data;
        }


    })
};
