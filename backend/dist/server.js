"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const checkoutRoutes_1 = __importDefault(require("./routes/checkoutRoutes"));
const routes_1 = __importDefault(require("./auth/routes"));
const app = (0, express_1.default)();
// Allow requests from frontend
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
// Serve uploaded files statically
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Routes
app.use("/auth", routes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/cart", cartRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
app.use("/checkout", checkoutRoutes_1.default);
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
