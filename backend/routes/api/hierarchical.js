import express from "express";
const router = express.Router();

// Sample hierarchical data
const hierarchicalData = {
  id: "root",
  name: "Company",
  children: [
    {
      id: "dept1",
      name: "Engineering",
      children: [
        { 
          id: "team1", 
          name: "Frontend", 
          children: [
            { id: "member1", name: "Alice", role: "Lead Developer", children: [] },
            { id: "member2", name: "Bob", role: "Senior Developer", children: [] },
            { id: "member3", name: "Charlie", role: "Junior Developer", children: [] }
          ] 
        },
        { 
          id: "team2", 
          name: "Backend", 
          children: [
            { id: "member4", name: "Dave", role: "Lead Developer", children: [] },
            { id: "member5", name: "Eve", role: "Database Administrator", children: [] }
          ] 
        },
        { 
          id: "team3", 
          name: "DevOps", 
          children: [
            { id: "member6", name: "Frank", role: "DevOps Engineer", children: [] }
          ] 
        }
      ]
    },
    {
      id: "dept2",
      name: "Marketing",
      children: [
        { 
          id: "team4", 
          name: "Digital Marketing", 
          children: [
            { id: "member7", name: "Grace", role: "Marketing Manager", children: [] },
            { id: "member8", name: "Heidi", role: "Content Creator", children: [] }
          ] 
        },
        { 
          id: "team5", 
          name: "Brand Management", 
          children: [
            { id: "member9", name: "Ivan", role: "Brand Manager", children: [] }
          ] 
        }
      ]
    },
    {
      id: "dept3",
      name: "Sales",
      children: [
        { 
          id: "team6", 
          name: "Direct Sales", 
          children: [
            { id: "member10", name: "Jack", role: "Sales Director", children: [] },
            { id: "member11", name: "Kelly", role: "Sales Representative", children: [] }
          ] 
        }
      ]
    }
  ]
};

// Helper function to find a node by ID
const findNodeById = (node, id) => {
  if (node.id === id) {
    return node;
  }
  
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
};

// GET all hierarchical data
router.get("/", (_req, res) => {
  setTimeout(() => {
    res.json(hierarchicalData);
  }, 1000);
});

// GET a specific node by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const node = findNodeById(hierarchicalData, id);
  
  if (!node) {
    return res.status(404).json({ error: "Node not found" });
  }
  
  setTimeout(() => {
    res.json(node);
  }, 500);
});

// GET children of a specific node
router.get("/:id/children", (req, res) => {
  const id = req.params.id;
  const node = findNodeById(hierarchicalData, id);
  
  if (!node) {
    return res.status(404).json({ error: "Node not found" });
  }
  
  setTimeout(() => {
    res.json(node.children || []);
  }, 500);
});

// GET the path from root to a specific node
router.get("/:id/path", (req, res) => {
  const id = req.params.id;
  
  // Helper function to find path
  const findPath = (node, targetId, currentPath = []) => {
    const newPath = [...currentPath, { id: node.id, name: node.name }];
    
    if (node.id === targetId) {
      return newPath;
    }
    
    if (node.children) {
      for (const child of node.children) {
        const path = findPath(child, targetId, newPath);
        if (path) {
          return path;
        }
      }
    }
    
    return null;
  };
  
  const path = findPath(hierarchicalData, id);
  
  if (!path) {
    return res.status(404).json({ error: "Node not found" });
  }
  
  setTimeout(() => {
    res.json(path);
  }, 500);
});

export default router;
