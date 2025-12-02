(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/context/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// context/CartContext.tsx
__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
// Create the context
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CART_STORAGE_KEY = 'peak-commerce-cart';
const CartProvider = ({ children })=>{
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                const storedCart = localStorage.getItem(CART_STORAGE_KEY);
                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }
            } catch (err) {
                console.error('Failed to load cart from localStorage:', err);
                setError('Failed to load cart');
            } finally{
                setIsLoading(false);
            }
        }
    }["CartProvider.useEffect"], []);
    // Save cart to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (!isLoading) {
                try {
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
                } catch (err) {
                    console.error('Failed to save cart to localStorage:', err);
                    setError('Failed to save cart');
                }
            }
        }
    }["CartProvider.useEffect"], [
        cart,
        isLoading
    ]);
    // Function to add a product to the cart (or increment quantity if it exists)
    const addToCart = (product)=>{
        setCart((currentCart)=>{
            const existingItem = currentCart.find((item)=>item.id === product.id);
            if (existingItem) {
                // Check stock availability
                const maxQuantity = product.stock || Infinity;
                const newQuantity = Math.min(existingItem.quantity + 1, maxQuantity);
                if (newQuantity > existingItem.quantity) {
                    return currentCart.map((item)=>item.id === product.id ? {
                            ...item,
                            quantity: newQuantity
                        } : item);
                }
                setError('Not enough stock available');
                return currentCart;
            } else {
                // Add new product with quantity 1
                return [
                    ...currentCart,
                    {
                        ...product,
                        quantity: 1
                    }
                ];
            }
        });
    };
    // Function to remove a product completely
    const removeFromCart = (productId)=>{
        setCart((currentCart)=>currentCart.filter((item)=>item.id !== productId));
    };
    // Function to clear entire cart
    const clearCart = ()=>{
        setCart([]);
    };
    // Function to update the quantity of a product
    const updateQuantity = (productId, newQuantity)=>{
        setCart((currentCart)=>{
            if (newQuantity <= 0) {
                // If quantity is zero or less, remove the item
                return currentCart.filter((item)=>item.id !== productId);
            }
            // Check stock availability
            const item = currentCart.find((item)=>item.id === productId);
            if (item && item.stock && newQuantity > item.stock) {
                setError(`Cannot add more than ${item.stock} items. Only ${item.stock} in stock.`);
                return currentCart;
            }
            return currentCart.map((item)=>item.id === productId ? {
                    ...item,
                    quantity: newQuantity
                } : item);
        });
    };
    // Calculate total number of items and total price
    const { totalItems, totalPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CartProvider.useMemo": ()=>{
            const items = cart.reduce({
                "CartProvider.useMemo.items": (sum, item)=>sum + item.quantity
            }["CartProvider.useMemo.items"], 0);
            const price = cart.reduce({
                "CartProvider.useMemo.price": (sum, item)=>sum + item.price * item.quantity
            }["CartProvider.useMemo.price"], 0);
            return {
                totalItems: items,
                totalPrice: price
            };
        }
    }["CartProvider.useMemo"], [
        cart
    ]);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CartProvider.useMemo[contextValue]": ()=>({
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                totalItems,
                totalPrice,
                isLoading,
                error
            })
    }["CartProvider.useMemo[contextValue]"], [
        cart,
        totalItems,
        totalPrice,
        isLoading,
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/CartContext.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "gToCkRDnMYBFMWeXsWhMjK/OGNk=");
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=context_CartContext_tsx_3f26bdc1._.js.map