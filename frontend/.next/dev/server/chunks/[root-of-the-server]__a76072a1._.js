module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Software Dev Specialization/peak-commerce-app/frontend/app/api/products/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software Dev Specialization/peak-commerce-app/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Software Dev Specialization/peak-commerce-app/frontend/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-route] (ecmascript)");
;
;
// Mock database
let products = {
    "1": {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "Audio",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        stock: 150,
        features: [
            "Active Noise Cancellation (ANC)",
            "30-hour battery life",
            "Bluetooth 5.0",
            "Foldable design"
        ]
    },
    "2": {
        id: 2,
        name: "Smartwatch with Heart Monitor",
        price: 199.99,
        category: "Wearables",
        description: "Advanced smartwatch with health monitoring features and fitness tracking. Track your daily activity and health metrics.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        stock: 80,
        features: [
            "Heart rate monitor",
            "GPS tracking",
            "Water resistant (50m)",
            "AMOLED display"
        ]
    },
    "3": {
        id: 3,
        name: "Portable Bluetooth Speaker",
        price: 89.99,
        category: "Audio",
        description: "Compact yet powerful Bluetooth speaker with amazing sound quality and portability.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
        stock: 230,
        features: [
            "Waterproof design",
            "20-hour battery",
            "360° sound",
            "Portable with strap"
        ]
    },
    "4": {
        id: 4,
        name: "USB-C Charging Cable",
        price: 14.99,
        category: "Accessories",
        description: "Fast-charging USB-C cable with durable braided design. Perfect replacement for your device.",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop",
        stock: 500,
        features: [
            "Fast charging support",
            "Braided design",
            "2-meter length",
            "Durable and reliable"
        ]
    },
    "5": {
        id: 5,
        name: "Wireless Mouse",
        price: 34.99,
        category: "Accessories",
        description: "Ergonomic wireless mouse with precision tracking for comfortable all-day use.",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
        stock: 120,
        features: [
            "Ergonomic design",
            "Precision tracking",
            "6-month battery",
            "2.4GHz wireless"
        ]
    },
    "6": {
        id: 6,
        name: "4K Webcam",
        price: 129.99,
        category: "Electronics",
        description: "Professional 4K webcam with auto-focus and noise reduction for crystal clear video calls.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
        stock: 45,
        features: [
            "4K resolution",
            "Auto-focus",
            "Noise reduction",
            "Wide angle lens"
        ]
    }
};
async function GET(request, { params }) {
    try {
        const product = products[params.id];
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: product
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to fetch product"
        }, {
            status: 500
        });
    }
}
async function PATCH(request, { params }) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const product = products[params.id];
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product not found"
            }, {
                status: 404
            });
        }
        const formData = await request.formData();
        const name = formData.get("name");
        const price = formData.get("price") ? parseFloat(formData.get("price")) : undefined;
        const category = formData.get("category");
        const description = formData.get("description");
        const stock = formData.get("stock") ? parseInt(formData.get("stock")) : undefined;
        const features = formData.get("features") ? JSON.parse(formData.get("features")) : undefined;
        const imageFile = formData.get("image");
        // Update product fields
        const updatedProduct = {
            ...products[params.id]
        };
        if (name) updatedProduct.name = name;
        if (price !== undefined) updatedProduct.price = price;
        if (category) updatedProduct.category = category;
        if (description) updatedProduct.description = description;
        if (stock !== undefined) updatedProduct.stock = stock;
        if (features) updatedProduct.features = features;
        if (imageFile) {
            const buffer = await imageFile.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            updatedProduct.image = `data:${imageFile.type};base64,${base64}`;
        }
        products[params.id] = updatedProduct;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to update product"
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const product = products[params.id];
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Product not found"
            }, {
                status: 404
            });
        }
        delete products[params.id];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Software__Dev__Specialization$2f$peak$2d$commerce$2d$app$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to delete product"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a76072a1._.js.map