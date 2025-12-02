import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import authRoutes from "./auth/routes";

const app = express();

// Allow requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/checkout", checkoutRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API info
app.get("/api", (req, res) => {
  res.json({
    message: "Peak Commerce API",
    version: "1.0.0",
    endpoints: {
      auth: ["/auth/signup", "/auth/login"],
      products: [
        "GET /products",
        "GET /products/:id",
        "POST /products (admin)",
        "PUT /products/:id (admin)",
        "DELETE /products/:id (admin)"
      ],
      cart: [
        "GET /cart",
        "POST /cart/items",
        "PUT /cart/items/:itemId",
        "DELETE /cart/items/:itemId",
        "DELETE /cart"
      ],
      orders: [
        "GET /orders",
        "GET /orders/:id",
        "POST /orders/:id/cancel",
        "GET /orders/admin/all (admin)",
        "PATCH /orders/:id/status (admin)",
        "POST /orders/:id/fulfill (admin)"
      ],
      checkout: [
        "POST /checkout",
        "POST /checkout/webhook/payment-callback"
      ]
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API documentation: http://localhost:${PORT}/api`);
});
