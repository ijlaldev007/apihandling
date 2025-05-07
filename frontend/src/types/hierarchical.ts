export interface HierarchicalNode {
    id: string;
    name: string;
    role?: string; // Optional, for leaf nodes like members
    children?: HierarchicalNode[]; // Optional, for nodes with children
  }
  
  export interface PathNode {
    id: string;
    name: string;
  }