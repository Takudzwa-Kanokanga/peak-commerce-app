"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, ShoppingCart, Truck, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // --------------------------
  // 👉 FETCH PRODUCT FROM BACKEND
  // --------------------------
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data.data || data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  // --------------------------
  // 👉 LOADING STATE
  // --------------------------
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading product...</p>
      </main>
    );
  }

  // --------------------------
  // 👉 PRODUCT NOT FOUND
  // --------------------------
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  // --------------------------
  // 👉 UI (Your original UI stays EXACTLY the same)
  // --------------------------
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/shop" className="hover:text-primary">
              Shop
            </a>
            <span>/</span>
            <a href="/shop" className="hover:text-primary">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Image */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden sticky top-24">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating || 4.8} ({product.reviews || 120} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-primary">
                    ${Number(product.price ?? 0).toFixed(2)}
                    </span>
                    </div>

                {/* Description */}
                <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock */}
                <div className="mb-8">
                  {product.stock > 0 ? (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity & Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      disabled={product.stock === 0}
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      disabled={product.stock === 0 || quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        stock: product.stock,
                      });
                      setIsAdded(true);
                      setTimeout(() => setIsAdded(false), 2000);
                    }}
                    disabled={product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>

                {/* Info Section */}
                <div className="space-y-4 border-t border-gray-200 pt-8">
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On all orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure Checkout</h4>
                      <p className="text-sm text-gray-600">Your payment is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="font-serif text-2xl font-bold mb-8">You Might Also Like</h2>
            <p className="text-gray-500">More products coming soon</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
