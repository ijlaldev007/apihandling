import express from "express";
const router = express.Router();

// Sample relational data - social network
const nodes = [
  // Users
  { id: "user1", name: "Alice Johnson", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-03-15" },
  { id: "user2", name: "Bob Smith", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-04-20" },
  { id: "user3", name: "Charlie Brown", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-05-10" },
  { id: "user4", name: "Diana Miller", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-06-05" },
  { id: "user5", name: "Edward Davis", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-07-22" },
  { id: "user6", name: "Fiona Wilson", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-08-14" },
  { id: "user7", name: "George Harris", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-09-30" },
  { id: "user8", name: "Hannah Clark", type: "user", avatar: "https://via.placeholder.com/150", joinDate: "2020-10-18" },
  
  // Posts
  { 
    id: "post1", 
    title: "Getting Started with React", 
    type: "post", 
    content: "React is a JavaScript library for building user interfaces...",
    createdAt: "2021-01-10T14:30:00Z",
    likes: 42,
    comments: 15
  },
  { 
    id: "post2", 
    title: "Advanced TypeScript Tips", 
    type: "post", 
    content: "TypeScript adds static typing to JavaScript to help you catch errors...",
    createdAt: "2021-02-15T10:15:00Z",
    likes: 38,
    comments: 12
  },
  { 
    id: "post3", 
    title: "Node.js Best Practices", 
    type: "post", 
    content: "When building Node.js applications, it's important to follow these practices...",
    createdAt: "2021-03-20T16:45:00Z",
    likes: 56,
    comments: 23
  },
  { 
    id: "post4", 
    title: "CSS Grid Layout Tutorial", 
    type: "post", 
    content: "CSS Grid Layout is a two-dimensional layout system for the web...",
    createdAt: "2021-04-05T09:20:00Z",
    likes: 31,
    comments: 8
  },
  { 
    id: "post5", 
    title: "Introduction to GraphQL", 
    type: "post", 
    content: "GraphQL is a query language for your API and a runtime for executing those queries...",
    createdAt: "2021-05-12T11:10:00Z",
    likes: 64,
    comments: 27
  },
  
  // Groups
  { 
    id: "group1", 
    name: "JavaScript Developers", 
    type: "group", 
    description: "A community for JavaScript developers to share knowledge and resources.",
    createdAt: "2020-02-10T08:00:00Z",
    members: 1250
  },
  { 
    id: "group2", 
    name: "UI/UX Designers", 
    type: "group", 
    description: "For designers to discuss UI/UX principles, tools, and trends.",
    createdAt: "2020-03-15T14:30:00Z",
    members: 980
  },
  { 
    id: "group3", 
    name: "Data Science Enthusiasts", 
    type: "group", 
    description: "Exploring data science, machine learning, and AI concepts.",
    createdAt: "2020-04-20T10:15:00Z",
    members: 1540
  }
];

// Edges (relationships between nodes)
const edges = [
  // User follows user
  { source: "user1", target: "user2", type: "follows", since: "2020-05-15" },
  { source: "user1", target: "user3", type: "follows", since: "2020-06-20" },
  { source: "user2", target: "user1", type: "follows", since: "2020-05-18" },
  { source: "user2", target: "user4", type: "follows", since: "2020-07-10" },
  { source: "user3", target: "user5", type: "follows", since: "2020-08-05" },
  { source: "user4", target: "user1", type: "follows", since: "2020-09-12" },
  { source: "user5", target: "user2", type: "follows", since: "2020-10-30" },
  { source: "user6", target: "user1", type: "follows", since: "2020-11-15" },
  { source: "user6", target: "user7", type: "follows", since: "2020-12-20" },
  { source: "user7", target: "user8", type: "follows", since: "2021-01-05" },
  { source: "user8", target: "user1", type: "follows", since: "2021-02-10" },
  
  // User created post
  { source: "user1", target: "post1", type: "created", at: "2021-01-10T14:30:00Z" },
  { source: "user2", target: "post2", type: "created", at: "2021-02-15T10:15:00Z" },
  { source: "user3", target: "post3", type: "created", at: "2021-03-20T16:45:00Z" },
  { source: "user1", target: "post4", type: "created", at: "2021-04-05T09:20:00Z" },
  { source: "user5", target: "post5", type: "created", at: "2021-05-12T11:10:00Z" },
  
  // User liked post
  { source: "user2", target: "post1", type: "liked", at: "2021-01-10T15:45:00Z" },
  { source: "user3", target: "post1", type: "liked", at: "2021-01-11T10:30:00Z" },
  { source: "user4", target: "post1", type: "liked", at: "2021-01-12T14:20:00Z" },
  { source: "user1", target: "post2", type: "liked", at: "2021-02-15T11:30:00Z" },
  { source: "user3", target: "post2", type: "liked", at: "2021-02-16T09:15:00Z" },
  { source: "user1", target: "post3", type: "liked", at: "2021-03-21T08:45:00Z" },
  { source: "user2", target: "post3", type: "liked", at: "2021-03-22T16:30:00Z" },
  { source: "user5", target: "post4", type: "liked", at: "2021-04-06T10:20:00Z" },
  { source: "user6", target: "post5", type: "liked", at: "2021-05-13T14:10:00Z" },
  { source: "user7", target: "post5", type: "liked", at: "2021-05-14T11:05:00Z" },
  
  // User is member of group
  { source: "user1", target: "group1", type: "member", since: "2020-02-15" },
  { source: "user2", target: "group1", type: "member", since: "2020-02-20" },
  { source: "user3", target: "group1", type: "member", since: "2020-03-10" },
  { source: "user1", target: "group2", type: "member", since: "2020-03-20" },
  { source: "user4", target: "group2", type: "member", since: "2020-04-05" },
  { source: "user5", target: "group3", type: "member", since: "2020-05-10" },
  { source: "user6", target: "group3", type: "member", since: "2020-06-15" },
  { source: "user7", target: "group1", type: "member", since: "2020-07-20" },
  { source: "user8", target: "group2", type: "member", since: "2020-08-25" },
  
  // User is admin of group
  { source: "user1", target: "group1", type: "admin", since: "2020-02-10" },
  { source: "user4", target: "group2", type: "admin", since: "2020-03-15" },
  { source: "user5", target: "group3", type: "admin", since: "2020-04-20" }
];

// GET all nodes and edges
router.get("/", (_req, res) => {
  setTimeout(() => {
    res.json({
      nodes,
      edges
    });
  }, 1000);
});

// GET all nodes
router.get("/nodes", (req, res) => {
  let result = [...nodes];
  
  // Filter by type if provided
  if (req.query.type) {
    result = result.filter(node => node.type === req.query.type);
  }
  
  setTimeout(() => {
    res.json({ nodes: result });
  }, 800);
});

// GET a specific node
router.get("/nodes/:id", (req, res) => {
  const id = req.params.id;
  const node = nodes.find(n => n.id === id);
  
  if (!node) {
    return res.status(404).json({ error: "Node not found" });
  }
  
  setTimeout(() => {
    res.json(node);
  }, 500);
});

// GET all edges
router.get("/edges", (req, res) => {
  let result = [...edges];
  
  // Filter by type if provided
  if (req.query.type) {
    result = result.filter(edge => edge.type === req.query.type);
  }
  
  // Filter by source if provided
  if (req.query.source) {
    result = result.filter(edge => edge.source === req.query.source);
  }
  
  // Filter by target if provided
  if (req.query.target) {
    result = result.filter(edge => edge.target === req.query.target);
  }
  
  setTimeout(() => {
    res.json({ edges: result });
  }, 800);
});

// GET connections for a specific node
router.get("/connections/:id", (req, res) => {
  const id = req.params.id;
  const node = nodes.find(n => n.id === id);
  
  if (!node) {
    return res.status(404).json({ error: "Node not found" });
  }
  
  // Find all edges where this node is either source or target
  const nodeEdges = edges.filter(edge => edge.source === id || edge.target === id);
  
  // Get connected nodes
  const connectedNodeIds = new Set();
  nodeEdges.forEach(edge => {
    if (edge.source === id) {
      connectedNodeIds.add(edge.target);
    } else {
      connectedNodeIds.add(edge.source);
    }
  });
  
  const connectedNodes = nodes.filter(n => connectedNodeIds.has(n.id));
  
  setTimeout(() => {
    res.json({
      node,
      connections: {
        edges: nodeEdges,
        nodes: connectedNodes
      }
    });
  }, 800);
});

// GET recommendations for a user
router.get("/recommendations/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = nodes.find(n => n.id === userId && n.type === "user");
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  // Find users that the current user follows
  const followingEdges = edges.filter(edge => 
    edge.source === userId && edge.type === "follows"
  );
  const followingIds = followingEdges.map(edge => edge.target);
  
  // Find users that those users follow (but the current user doesn't)
  const recommendedUserIds = new Set();
  edges.forEach(edge => {
    if (followingIds.includes(edge.source) && edge.type === "follows") {
      // Don't recommend users the current user already follows
      if (!followingIds.includes(edge.target) && edge.target !== userId) {
        recommendedUserIds.add(edge.target);
      }
    }
  });
  
  // Get recommended users
  const recommendedUsers = nodes.filter(n => 
    recommendedUserIds.has(n.id) && n.type === "user"
  );
  
  // Find posts liked by users the current user follows
  const recommendedPostIds = new Set();
  edges.forEach(edge => {
    if (followingIds.includes(edge.source) && edge.type === "liked") {
      recommendedPostIds.add(edge.target);
    }
  });
  
  // Get recommended posts
  const recommendedPosts = nodes.filter(n => 
    recommendedPostIds.has(n.id) && n.type === "post"
  );
  
  // Find groups that users the current user follows are members of
  const recommendedGroupIds = new Set();
  edges.forEach(edge => {
    if (followingIds.includes(edge.source) && edge.type === "member") {
      recommendedGroupIds.add(edge.target);
    }
  });
  
  // Get recommended groups
  const recommendedGroups = nodes.filter(n => 
    recommendedGroupIds.has(n.id) && n.type === "group"
  );
  
  setTimeout(() => {
    res.json({
      recommendations: {
        users: recommendedUsers,
        posts: recommendedPosts,
        groups: recommendedGroups
      }
    });
  }, 1200);
});

export default router;
