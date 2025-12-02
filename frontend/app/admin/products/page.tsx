"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Plus, Edit2, Trash2, X } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ErrorMessage from "@/components/ui/error-message"
import FormInput from "@/components/ui/form-input"
import ImageUpload from "@/components/ui/image-upload"
import PriceFormatter from "@/components/ui/price-formatter"
import { toast } from "sonner"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  description: string
  image: string
  features: string[]
}

export default function AdminProductsPage() {
  const { userId } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    features: "",
  })
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null)

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in")
      return
    }
    fetchProducts()
  }, [userId, router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      if (!response.ok) throw new Error("Failed to fetch products")
      const result = await response.json()
      setProducts(result.data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load products"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingId(null)
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      features: "",
    })
    setSelectedImage(null)
    setShowModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      description: product.description,
      features: product.features.join(", "),
    })
    setSelectedImage(null)
    setShowModal(true)
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete product")

      setProducts(products.filter(p => p.id !== id))
      toast.success("Product deleted successfully")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete product"
      toast.error(message)
    }
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const featureArray = formData.features
        .split(",")
        .map(f => f.trim())
        .filter(f => f)

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("stock", formData.stock)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("features", JSON.stringify(featureArray))

      if (selectedImage) {
        formDataToSend.append("image", selectedImage.file)
      }

      let url = "/api/products"
      let method = "POST"

      if (editingId) {
        url = `/api/products/${editingId}`
        method = "PATCH"
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (!response.ok) throw new Error("Failed to save product")

      const result = await response.json()

      if (editingId) {
        setProducts(products.map(p => p.id === editingId ? result.data : p))
        toast.success("Product updated successfully")
      } else {
        setProducts([...products, result.data])
        toast.success("Product created successfully")
      }

      setShowModal(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save product"
      setError(message)
      toast.error(message)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 flex items-center justify-center">
          <LoadingSpinner text="Loading products..." />
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Product Management</h1>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {error && <ErrorMessage message={error} onRetry={fetchProducts} />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-primary">
                      <PriceFormatter amount={product.price} currency="ZWL" />
                    </span>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <FormInput
                label="Product Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Price (ZWL)"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <FormInput
                  label="Stock Quantity"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              <FormInput
                label="Category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                list="categories"
              />
              <datalist id="categories">
                <option value="Audio" />
                <option value="Wearables" />
                <option value="Accessories" />
                <option value="Electronics" />
              </datalist>

              <FormInput
                label="Description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <FormInput
                label="Features (comma-separated)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                helpText="e.g., Waterproof, Long battery life, Lightweight"
              />

              <ImageUpload
                onImageSelect={(file, preview) => setSelectedImage({ file, preview })}
                label="Product Image"
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  {editingId ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
