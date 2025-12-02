# Peak Commerce API Documentation

## Overview
RESTful e-commerce backend API supporting product management, shopping cart, orders, and Stripe/mock payment processing. Built with Express.js, PostgreSQL (Prisma), and Redis caching.

## Base URL
```
http://localhost:3000
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. User Registration
- **Method:** POST
- **Endpoint:** `/auth/signup`
- **Public:** Yes
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_id_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 500 (Server Error)

### 2. User Login
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Public:** Yes
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_id_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

---

## Product Endpoints

### 1. List Products
- **Method:** GET
- **Endpoint:** `/products`
- **Public:** Yes
- **Query Parameters:**
  - `page` (optional, default: 1) - Page number
  - `limit` (optional, default: 20) - Items per page (max: 100)
- **Response:**
  ```json
  [
    {
      "id": "product_id_123",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "sku": "SKU-123",
      "imageUrl": "/uploads/product-timestamp.jpg",
      "createdAt": "2024-12-02T10:30:00Z",
      "inventory": {
        "id": "inv_id",
        "quantity": 50
      }
    }
  ]
  ```
- **Status Codes:** 200 (OK), 500 (Server Error)

### 2. Get Product Details
- **Method:** GET
- **Endpoint:** `/products/:id`
- **Public:** Yes
- **Response:** Single product object (see List Products)
- **Status Codes:** 200 (OK), 404 (Not Found), 500 (Server Error)

### 3. Create Product (Admin Only)
- **Method:** POST
- **Endpoint:** `/products`
- **Protected:** Yes (Admin)
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `name` (string, required)
  - `description` (string, optional)
  - `price` (number, required, non-negative)
  - `sku` (string, optional)
  - `inventory` (JSON string, optional): `{"quantity": 100}`
  - `image` (file, optional) - Max 5MB, accepted formats: JPEG, PNG, WebP, GIF
- **Response:** Created product object
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

### 4. Update Product (Admin Only)
- **Method:** PUT
- **Endpoint:** `/products/:id`
- **Protected:** Yes (Admin)
- **Content-Type:** `multipart/form-data` or `application/json`
- **Request Body:** Any product fields to update
- **Response:** Updated product object
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

### 5. Delete Product (Admin Only)
- **Method:** DELETE
- **Endpoint:** `/products/:id`
- **Protected:** Yes (Admin)
- **Response:** No content
- **Status Codes:** 204 (No Content), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

---

## Cart Endpoints

### 1. Get User's Cart
- **Method:** GET
- **Endpoint:** `/cart`
- **Protected:** Yes
- **Response:**
  ```json
  {
    "id": "cart_id",
    "userId": "user_id",
    "items": [
      {
        "id": "cart_item_id",
        "productId": "product_id",
        "quantity": 2,
        "unitPrice": 99.99,
        "product": {
          "id": "product_id",
          "name": "Product Name",
          "price": 99.99,
          "inventory": { "quantity": 50 }
        }
      }
    ],
    "total": 199.98,
    "createdAt": "2024-12-02T10:30:00Z",
    "updatedAt": "2024-12-02T10:30:00Z"
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

### 2. Add Item to Cart
- **Method:** POST
- **Endpoint:** `/cart/items`
- **Protected:** Yes
- **Request Body:**
  ```json
  {
    "productId": "product_id_123",
    "quantity": 2
  }
  ```
- **Response:** Cart item object
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### 3. Update Cart Item Quantity
- **Method:** PUT
- **Endpoint:** `/cart/items/:itemId`
- **Protected:** Yes
- **Request Body:**
  ```json
  {
    "quantity": 5
  }
  ```
- **Response:** Updated cart item
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

### 4. Remove Item from Cart
- **Method:** DELETE
- **Endpoint:** `/cart/items/:itemId`
- **Protected:** Yes
- **Response:** No content
- **Status Codes:** 204 (No Content), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

### 5. Clear Cart
- **Method:** DELETE
- **Endpoint:** `/cart`
- **Protected:** Yes
- **Response:** No content
- **Status Codes:** 204 (No Content), 401 (Unauthorized), 500 (Server Error)

---

## Order Endpoints

### 1. Get User's Orders
- **Method:** GET
- **Endpoint:** `/orders`
- **Protected:** Yes
- **Response:** Array of order objects
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

### 2. Get Order Details
- **Method:** GET
- **Endpoint:** `/orders/:id`
- **Protected:** Yes
- **Response:**
  ```json
  {
    "id": "order_id",
    "userId": "user_id",
    "total": 199.98,
    "status": "PROCESSING",
    "currency": "USD",
    "shippingName": "John Doe",
    "shippingEmail": "john@example.com",
    "shippingAddress": "123 Main St, Harare, Zimbabwe",
    "shippingMobile": "+263-712-345678",
    "items": [
      {
        "id": "order_item_id",
        "productId": "product_id",
        "quantity": 2,
        "unitPrice": 99.99,
        "product": { "id": "product_id", "name": "Product Name" }
      }
    ],
    "transaction": {
      "id": "transaction_id",
      "status": "completed",
      "provider": "stripe"
    },
    "createdAt": "2024-12-02T10:30:00Z",
    "updatedAt": "2024-12-02T11:45:00Z"
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

### 3. Cancel Order
- **Method:** POST
- **Endpoint:** `/orders/:id/cancel`
- **Protected:** Yes
- **Notes:** Users can only cancel pending orders. Inventory is restored.
- **Response:** Updated order with status "CANCELLED"
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

### 4. Get All Orders (Admin Only)
- **Method:** GET
- **Endpoint:** `/orders/admin/all`
- **Protected:** Yes (Admin)
- **Response:** Array of all orders with user details
- **Status Codes:** 200 (OK), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

### 5. Update Order Status (Admin Only)
- **Method:** PATCH
- **Endpoint:** `/orders/:id/status`
- **Protected:** Yes (Admin)
- **Request Body:**
  ```json
  {
    "status": "PROCESSING"
  }
  ```
- **Valid Statuses:** PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, FAILED, FULFILLED
- **Response:** Updated order
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error)

### 6. Fulfill Order (Admin Only)
- **Method:** POST
- **Endpoint:** `/orders/:id/fulfill`
- **Protected:** Yes (Admin)
- **Notes:** Can only fulfill orders in PROCESSING status. Updates status to FULFILLED.
- **Response:** Updated order
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

---

## Checkout Endpoints

### 1. Create Order & Process Payment
- **Method:** POST
- **Endpoint:** `/checkout`
- **Protected:** Yes
- **Request Body:**
  ```json
  {
    "shippingName": "John Doe",
    "shippingEmail": "john@example.com",
    "shippingAddress": "123 Main St, Harare, Zimbabwe",
    "shippingMobile": "+263-712-345678",
    "paymentMethod": "mock"
  }
  ```
- **Payment Methods:** `mock` (test/demo), `stripe` (Stripe integration)
- **Response:**
  ```json
  {
    "order": {
      "id": "order_id",
      "total": 199.98,
      "status": "PROCESSING",
      "items": [...]
    },
    "paymentIntent": "pi_xxxxx"
  }
  ```
- **Process:**
  1. Validates cart is not empty
  2. Locks inventory (prevents double-purchase)
  3. Checks stock availability
  4. Deducts inventory
  5. Creates order with items
  6. Processes payment (mock or Stripe)
  7. Creates transaction record
  8. Sends confirmation email
  9. Clears cart
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

### 2. Payment Callback Handler
- **Method:** POST
- **Endpoint:** `/checkout/webhook/payment-callback`
- **Public:** Yes (Webhook)
- **Request Body:**
  ```json
  {
    "orderId": "order_id",
    "status": "completed",
    "transactionId": "stripe_pi_xxxxx"
  }
  ```
- **Response:** Success confirmation with updated order
- **Status Codes:** 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Server Error)

---

## Data Models

### User
```typescript
{
  id: string (CUID)
  email: string (unique)
  password: string (hashed with bcrypt)
  name: string | null
  role: "USER" | "ADMIN" (default: USER)
  createdAt: datetime
  updatedAt: datetime
  carts: Cart[]
  orders: Order[]
}
```

### Product
```typescript
{
  id: string (CUID)
  name: string
  description: string | null
  price: float
  sku: string | null (unique)
  imageUrl: string | null
  createdAt: datetime
  updatedAt: datetime
  inventory: Inventory | null
  cartItems: CartItem[]
  orderItems: OrderItem[]
}
```

### Inventory
```typescript
{
  id: string (CUID)
  productId: string (unique foreign key)
  quantity: int (default: 0)
  updatedAt: datetime
  product: Product
}
```

### Cart
```typescript
{
  id: string (CUID)
  userId: string (unique foreign key)
  createdAt: datetime
  updatedAt: datetime
  user: User
  items: CartItem[]
}
```

### CartItem
```typescript
{
  id: string (CUID)
  cartId: string (foreign key)
  productId: string (foreign key)
  quantity: int
  unitPrice: float
  createdAt: datetime
  updatedAt: datetime
  cart: Cart
  product: Product
}
```

### Order
```typescript
{
  id: string (CUID)
  userId: string (foreign key)
  total: float
  status: OrderStatus (default: PENDING)
  currency: string (default: USD)
  paymentId: string | null
  transactionId: string | null
  shippingName: string
  shippingEmail: string
  shippingAddress: string
  shippingMobile: string
  createdAt: datetime
  updatedAt: datetime
  user: User
  items: OrderItem[]
  transaction: Transaction | null
}
```

### OrderItem
```typescript
{
  id: string (CUID)
  orderId: string (foreign key)
  productId: string (foreign key)
  quantity: int
  unitPrice: float
  order: Order
  product: Product
}
```

### Transaction
```typescript
{
  id: string (CUID)
  orderId: string (unique foreign key)
  amount: float
  currency: string (default: USD)
  status: string (default: pending) - "pending" | "completed" | "failed" | "refunded"
  provider: string (default: stripe) - "stripe" | "mock"
  stripeId: string | null
  metadata: string | null (JSON string for additional data)
  createdAt: datetime
  updatedAt: datetime
  order: Order
}
```

### Order Status Lifecycle
```
PENDING → PROCESSING → SHIPPED → DELIVERED
         ↓          ↓
       FAILED    FULFILLED
         ↓
      CANCELLED
```

---

## Error Handling

All endpoints return errors in the following format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

### Common HTTP Status Codes
- **200 OK** - Successful GET, PUT, PATCH
- **201 Created** - Successful POST
- **204 No Content** - Successful DELETE
- **400 Bad Request** - Invalid input or insufficient stock
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Server Error** - Unexpected server error

---

## Features

### ✅ Product Management
- Full CRUD operations
- Product images (local file upload)
- Stock tracking via Inventory model
- Redis caching for product listings
- Admin-only create/update/delete

### ✅ Cart Management
- Add/update/remove items
- Automatic inventory validation
- Calculate cart totals
- Clear cart on checkout

### ✅ Order Management
- Create orders from cart
- Order status lifecycle tracking
- Inventory locking during checkout
- User can view own orders
- Admin can manage all orders
- Cancel pending orders (restores inventory)

### ✅ Inventory Management
- Automatic deduction on order placement
- Stock availability checks before checkout
- Prevents overselling with transaction locks
- Restore inventory on order cancellation

### ✅ Payment Integration
- Mock payment for testing
- Stripe sandbox integration
- Transaction storage and tracking
- Payment callback handling
- Payment status tracking (pending/completed/failed)

### ✅ Notifications
- Email confirmations on successful orders
- Order details in confirmation email
- Shipping notifications (extensible)
- Cancellation notifications (extensible)

### ✅ Security & Validation
- JWT authentication
- Admin role-based access control
- Input validation with Zod schemas
- Error handling and logging
- Cascading deletes for data integrity

### ✅ Performance
- Redis caching for products
- Database transaction support for checkout
- Pagination for product listings
- File upload size limits (5MB max)

---

## Currency
All prices and transactions use **USD** as the default currency (suitable for Zimbabwe operations).

---

## Testing the API

### 1. Register User
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 2. Create Product (As Admin)
```bash
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Laptop" \
  -F "price=999.99" \
  -F 'inventory={"quantity":10}' \
  -F "image=@/path/to/image.jpg"
```

### 3. Add to Cart
```bash
curl -X POST http://localhost:3000/cart/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product_id",
    "quantity": 2
  }'
```

### 4. Checkout
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingName": "John Doe",
    "shippingEmail": "john@example.com",
    "shippingAddress": "123 Main St, Harare",
    "shippingMobile": "+263712345678",
    "paymentMethod": "mock"
  }'
```

---

## Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables to set:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret key for signing JWTs
- `STRIPE_SECRET_KEY` - Stripe test secret key
- `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` - Email service credentials

---

## Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

---

## Notes for Zimbabwe Deployment
- Currency is set to USD (adjustable in models)
- Email service can use local SMTP or cloud providers (Mailtrap, SendGrid)
- Stripe test mode is suitable for development; use live keys in production
- Redis can be omitted for smaller deployments (graceful fallback implemented)
- All images stored locally in `/uploads` directory
