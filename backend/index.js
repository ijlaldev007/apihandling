import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle Stripe webhook raw body
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// Middleware to parse JSON bodies for other routes
app.use(express.json());

// Mount API routes
app.use("/api", apiRoutes);

// Basic health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api`);
});
