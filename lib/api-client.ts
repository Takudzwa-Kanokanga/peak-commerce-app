export async function fetchProducts(category?: string) {
  const url = new URL("/api/products", window.location.origin)
  if (category) {
    url.searchParams.append("category", category)
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch products")
  return response.json()
}

export async function fetchProduct(id: string) {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
}

export async function createOrder(data: any) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create order")
  return response.json()
}

export async function fetchInventory(productId?: number) {
  const url = new URL("/api/inventory", window.location.origin)
  if (productId) {
    url.searchParams.append("productId", productId.toString())
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch inventory")
  return response.json()
}

export async function createCheckoutSession(items: any[], total: number) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, total }),
  })
  if (!response.ok) throw new Error("Failed to create checkout session")
  return response.json()
}
