import express from "express";
const router = express.Router();

// Sample products data
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 15.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 42,
    rating: 4.5,
    description: "A comfortable wireless mouse with precision tracking and long battery life.",
    features: ["Wireless", "Ergonomic Design", "Long Battery Life"],
    colors: ["Black", "Silver", "Blue"]
  },
  {
    id: 2,
    name: "Bluetooth Keyboard",
    price: 25.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 30,
    rating: 4.2,
    description: "A slim Bluetooth keyboard compatible with multiple devices.",
    features: ["Bluetooth", "Multi-device", "Compact"],
    colors: ["Black", "White"]
  },
  {
    id: 3,
    name: "HD Monitor",
    price: 120.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 15,
    rating: 4.8,
    description: "A high-definition monitor with vibrant colors and wide viewing angles.",
    features: ["1080p", "HDMI", "Adjustable Stand"],
    colors: ["Black"]
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 35.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 50,
    rating: 4.0,
    description: "A versatile USB-C hub with multiple ports for all your connectivity needs.",
    features: ["USB-C", "HDMI Output", "SD Card Reader"],
    colors: ["Silver", "Space Gray"]
  },
  {
    id: 5,
    name: "Noise-Cancelling Headphones",
    price: 89.99,
    image: "https://via.placeholder.com/150",
    category: "Audio",
    stock: 20,
    rating: 4.7,
    description: "Premium headphones with active noise cancellation for immersive audio experience.",
    features: ["Noise Cancellation", "Bluetooth", "30h Battery"],
    colors: ["Black", "Silver", "Rose Gold"]
  },
  {
    id: 6,
    name: "Wireless Charger",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 35,
    rating: 4.3,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    features: ["Qi Wireless", "Fast Charging", "LED Indicator"],
    colors: ["Black", "White"]
  },
  {
    id: 7,
    name: "Smart Speaker",
    price: 79.99,
    image: "https://via.placeholder.com/150",
    category: "Audio",
    stock: 25,
    rating: 4.4,
    description: "Voice-controlled smart speaker with premium sound quality.",
    features: ["Voice Control", "Wi-Fi", "Bluetooth"],
    colors: ["Black", "Gray"]
  },
  {
    id: 8,
    name: "Laptop Stand",
    price: 24.99,
    image: "https://via.placeholder.com/150",
    category: "Accessories",
    stock: 40,
    rating: 4.1,
    description: "Adjustable laptop stand for improved ergonomics and cooling.",
    features: ["Adjustable Height", "Foldable", "Non-slip"],
    colors: ["Silver", "Black"]
  },
  {
    id: 9,
    name: "External SSD",
    price: 99.99,
    image: "https://via.placeholder.com/150",
    category: "Storage",
    stock: 18,
    rating: 4.9,
    description: "High-speed external SSD for fast data transfer and storage.",
    features: ["500GB", "USB 3.1", "Compact"],
    colors: ["Black"]
  },
  {
    id: 10,
    name: "Mechanical Keyboard",
    price: 69.99,
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    stock: 22,
    rating: 4.6,
    description: "Tactile mechanical keyboard with customizable RGB lighting.",
    features: ["Mechanical Switches", "RGB Lighting", "Programmable"],
    colors: ["Black", "White"]
  }
];

// GET all products
router.get("/", (req, res) => {
  // Create a copy of products to avoid modifying the original
  let result = [...products];

  // Apply search filter if provided
  if (req.query.search) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Apply category filter if provided
  if (req.query.category) {
    result = result.filter((product) =>
      product.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Apply price range filter if provided
  if (req.query.minPrice) {
    result = result.filter((product) =>
      product.price >= parseFloat(req.query.minPrice)
    );
  }

  if (req.query.maxPrice) {
    result = result.filter((product) =>
      product.price <= parseFloat(req.query.maxPrice)
    );
  }

  // Apply sorting if provided
  if (req.query.sort) {
    const sortField = req.query.sort.toLowerCase();
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }

  // Apply pagination if provided
  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = {
      data: result.slice(startIndex, endIndex),
      meta: {
        total: result.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(result.length / limit)
      }
    };

    // Simulate network delay
    setTimeout(() => {
      res.json(paginatedResult);
    }, 1000);
    return;
  }

  // Return all results if no pagination
  setTimeout(() => {
    res.json({
      data: result,
      meta: {
        total: result.length
      }
    });
  }, 1000); // Reduced delay for better UX
});

// GET a single product by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  setTimeout(() => {
    res.json(product);
  }, 500);
});

// GET product categories
router.get("/categories/all", (_req, res) => {
  const categories = [...new Set(products.map(p => p.category))];

  setTimeout(() => {
    res.json(categories);
  }, 300);
});

// Export the router
export default router;
