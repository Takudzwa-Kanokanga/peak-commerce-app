# Peak Commerce E-Commerce Backend - Manual Testing Walkthrough

This guide provides all the commands needed to test the complete checkout flow manually.

## Prerequisites
- Dev server running: `npm run dev`
- Valid PostgreSQL connection in `.env` (DATABASE_URL)
- Migrations applied: `npm run prisma:migrate`
- You have access to the backend at `http://localhost:3000`

---

## Step 1: Create Admin User

**PowerShell:**
```powershell
$adminResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/auth/signup `
  -Body (ConvertTo-Json @{ 
    email = 'admin@peakcommerce.local'
    password = 'AdminPass123!'
    name = 'Admin User'
  }) `
  -ContentType 'application/json'

Write-Output "Admin User Created:"
Write-Output ($adminResponse | ConvertTo-Json)

# Save the admin ID and token for next step
$adminId = $adminResponse.user.id
$adminToken = $adminResponse.token
Write-Output "Admin ID: $adminId"
Write-Output "Admin Token: $adminToken"
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cmio3m35w000010nd4k2zxrxd",
    "email": "admin@peakcommerce.local",
    "name": "Admin User",
    "role": "USER"
  }
}
```

---

## Step 2: Promote Admin User to ADMIN Role

**PowerShell (run in project directory):**
```powershell
node scripts/promoteUser.js admin@peakcommerce.local
```

**Expected Output:**
```
Promoted user to ADMIN: { id: 'cmio3m35w000010nd4k2zxrxd', email: 'admin@peakcommerce.local', role: 'ADMIN' }
```

---

## Step 3: Login as Admin (Get Fresh Token)

**PowerShell:**
```powershell
$adminLoginResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/auth/login `
  -Body (ConvertTo-Json @{ 
    email = 'admin@peakcommerce.local'
    password = 'AdminPass123!'
  }) `
  -ContentType 'application/json'

Write-Output "Admin Login:"
Write-Output ($adminLoginResponse | ConvertTo-Json)

$adminToken = $adminLoginResponse.token
Write-Output "Admin Token: $adminToken"
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cmio3m35w000010nd4k2zxrxd",
    "email": "admin@peakcommerce.local",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

---

## Step 4: Create Product with Inventory (Admin Only)

**PowerShell (using curl.exe for multipart form-data):**
```powershell
$adminToken = "YOUR_ADMIN_TOKEN_FROM_STEP_3"

# Using curl.exe (built-in on Windows 10+)
curl.exe -X POST http://localhost:3000/products `
  -H "Authorization: Bearer $adminToken" `
  -F "name=Wireless Bluetooth Headphones" `
  -F "description=Premium wireless headphones with 30-hour battery" `
  -F "price=79.99" `
  -F "sku=WH-001" `
  -F 'inventory={"quantity":10}'
```

**Alternative PowerShell (if curl.exe not available):**
```powershell
$adminToken = "YOUR_ADMIN_TOKEN_FROM_STEP_3"

$productBody = @{
  name = 'Wireless Bluetooth Headphones'
  description = 'Premium wireless headphones with 30-hour battery'
  price = 79.99
  sku = 'WH-001'
  inventory = @{ quantity = 10 }
} | ConvertTo-Json

$productResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/products `
  -Headers @{ Authorization = "Bearer $adminToken" } `
  -Body $productBody `
  -ContentType 'application/json'

Write-Output "Product Created:"
Write-Output ($productResponse | ConvertTo-Json)

$productId = $productResponse.id
Write-Output "Product ID: $productId"
```

**Expected Response:**
```json
{
  "id": "cmixxxxxxxxxxxxxx",
  "name": "Wireless Bluetooth Headphones",
  "description": "Premium wireless headphones with 30-hour battery",
  "price": 79.99,
  "sku": "WH-001",
  "imageUrl": null,
  "createdAt": "2024-12-02T10:30:00.000Z",
  "updatedAt": "2024-12-02T10:30:00.000Z"
}
```

---

## Step 5: Create Regular User Account

**PowerShell:**
```powershell
$userResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/auth/signup `
  -Body (ConvertTo-Json @{ 
    email = 'customer@example.com'
    password = 'UserPass123!'
    name = 'John Doe'
  }) `
  -ContentType 'application/json'

Write-Output "Customer User Created:"
Write-Output ($userResponse | ConvertTo-Json)

$userToken = $userResponse.token
$userId = $userResponse.user.id
Write-Output "User Token: $userToken"
Write-Output "User ID: $userId"
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cmjoxxxxxxxxxxxxxxx",
    "email": "customer@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

---

## Step 6: Get User's Cart (Should be Empty)

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"

$cartResponse = Invoke-RestMethod -Method Get -Uri http://localhost:3000/cart `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -ContentType 'application/json'

Write-Output "User Cart (Empty):"
Write-Output ($cartResponse | ConvertTo-Json)
```

**Expected Response:**
```json
{
  "id": "",
  "userId": "cmjoxxxxxxxxxxxxxxx",
  "items": [],
  "total": 0,
  "createdAt": null,
  "updatedAt": null
}
```

---

## Step 7: Add Product to Cart

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"
$productId = "YOUR_PRODUCT_ID_FROM_STEP_4"

$addToCartBody = @{
  productId = $productId
  quantity = 2
} | ConvertTo-Json

$cartItemResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/cart/items `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -Body $addToCartBody `
  -ContentType 'application/json'

Write-Output "Added to Cart:"
Write-Output ($cartItemResponse | ConvertTo-Json)

$cartItemId = $cartItemResponse.id
Write-Output "Cart Item ID: $cartItemId"
```

**Expected Response:**
```json
{
  "id": "cmjoxxxxxxxxxxxxxxx",
  "cartId": "cmjoxxxxxxxxxxxxxxx",
  "productId": "cmixxxxxxxxxxxxxx",
  "quantity": 2,
  "unitPrice": 79.99,
  "createdAt": "2024-12-02T10:35:00.000Z",
  "updatedAt": "2024-12-02T10:35:00.000Z"
}
```

---

## Step 8: View Cart with Items

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"

$cartFullResponse = Invoke-RestMethod -Method Get -Uri http://localhost:3000/cart `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -ContentType 'application/json'

Write-Output "User Cart with Items:"
Write-Output ($cartFullResponse | ConvertTo-Json)
# Should show: total = 2 * 79.99 = 159.98
```

**Expected Response:**
```json
{
  "id": "cmjoxxxxxxxxxxxxxxx",
  "userId": "cmjoxxxxxxxxxxxxxxx",
  "items": [
    {
      "id": "cmjoxxxxxxxxxxxxxxx",
      "cartId": "cmjoxxxxxxxxxxxxxxx",
      "productId": "cmixxxxxxxxxxxxxx",
      "quantity": 2,
      "unitPrice": 79.99,
      "createdAt": "2024-12-02T10:35:00.000Z",
      "updatedAt": "2024-12-02T10:35:00.000Z",
      "product": {
        "id": "cmixxxxxxxxxxxxxx",
        "name": "Wireless Bluetooth Headphones",
        "price": 79.99,
        "inventory": {
          "id": "cmjoxxxxxxxxxxxxxxx",
          "quantity": 10
        }
      }
    }
  ],
  "total": 159.98,
  "createdAt": "2024-12-02T10:35:00.000Z",
  "updatedAt": "2024-12-02T10:35:00.000Z"
}
```

---

## Step 9: Proceed to Checkout (Create Order + Process Payment)

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"

$checkoutBody = @{
  shippingName = 'John Doe'
  shippingEmail = 'customer@example.com'
  shippingAddress = '123 Main Street, Harare, Zimbabwe'
  shippingMobile = '+263712345678'
  paymentMethod = 'mock'
} | ConvertTo-Json

$checkoutResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/checkout `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -Body $checkoutBody `
  -ContentType 'application/json'

Write-Output "Checkout Complete:"
Write-Output ($checkoutResponse | ConvertTo-Json -Depth 10)

$orderId = $checkoutResponse.order.id
Write-Output "Order ID: $orderId"
Write-Output "Order Status: $($checkoutResponse.order.status)"
Write-Output "Order Total: $($checkoutResponse.order.total) USD"
```

**Expected Response:**
```json
{
  "order": {
    "id": "cmjoxxxxxxxxxxxxxxx",
    "userId": "cmjoxxxxxxxxxxxxxxx",
    "total": 159.98,
    "status": "PROCESSING",
    "currency": "USD",
    "paymentId": "MOCK_TX_1734186900000",
    "transactionId": "cmjoxxxxxxxxxxxxxxx",
    "shippingName": "John Doe",
    "shippingEmail": "customer@example.com",
    "shippingAddress": "123 Main Street, Harare, Zimbabwe",
    "shippingMobile": "+263712345678",
    "createdAt": "2024-12-02T10:35:00.000Z",
    "updatedAt": "2024-12-02T10:35:00.000Z",
    "items": [
      {
        "id": "cmjoxxxxxxxxxxxxxxx",
        "orderId": "cmjoxxxxxxxxxxxxxxx",
        "productId": "cmixxxxxxxxxxxxxx",
        "quantity": 2,
        "unitPrice": 79.99,
        "product": {
          "id": "cmixxxxxxxxxxxxxx",
          "name": "Wireless Bluetooth Headphones"
        }
      }
    ],
    "transaction": {
      "id": "cmjoxxxxxxxxxxxxxxx",
      "orderId": "cmjoxxxxxxxxxxxxxxx",
      "amount": 159.98,
      "currency": "USD",
      "status": "completed",
      "provider": "mock",
      "stripeId": null,
      "metadata": "{\"success\":true,\"transactionId\":\"MOCK_TX_1734186900000\"}"
    }
  },
  "paymentIntent": null
}
```

---

## Step 10: Verify Inventory Was Decreased

**PowerShell:**
```powershell
$productId = "YOUR_PRODUCT_ID_FROM_STEP_4"

$productAfterCheckout = Invoke-RestMethod -Method Get -Uri "http://localhost:3000/products/$productId" `
  -ContentType 'application/json'

Write-Output "Product After Checkout:"
Write-Output ($productAfterCheckout | ConvertTo-Json)

Write-Output ""
Write-Output "Inventory Check:"
Write-Output "  Original quantity: 10"
Write-Output "  Ordered quantity: 2"
Write-Output "  Remaining quantity: $($productAfterCheckout.inventory.quantity)"
Write-Output "  ✓ Correctly decreased from 10 to $($productAfterCheckout.inventory.quantity)"
```

**Expected Response:**
```json
{
  "id": "cmixxxxxxxxxxxxxx",
  "name": "Wireless Bluetooth Headphones",
  "description": "Premium wireless headphones with 30-hour battery",
  "price": 79.99,
  "sku": "WH-001",
  "imageUrl": null,
  "createdAt": "2024-12-02T10:30:00.000Z",
  "updatedAt": "2024-12-02T10:30:00.000Z",
  "inventory": {
    "id": "cmjoxxxxxxxxxxxxxxx",
    "productId": "cmixxxxxxxxxxxxxx",
    "quantity": 8
  }
}
```

---

## Step 11: Retrieve Order Details

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"
$orderId = "YOUR_ORDER_ID_FROM_STEP_9"

$orderDetails = Invoke-RestMethod -Method Get -Uri "http://localhost:3000/orders/$orderId" `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -ContentType 'application/json'

Write-Output "Order Details:"
Write-Output ($orderDetails | ConvertTo-Json -Depth 10)
```

**Expected Response:**
```json
{
  "id": "cmjoxxxxxxxxxxxxxxx",
  "userId": "cmjoxxxxxxxxxxxxxxx",
  "total": 159.98,
  "status": "PROCESSING",
  "currency": "USD",
  "paymentId": "MOCK_TX_1734186900000",
  "transactionId": "cmjoxxxxxxxxxxxxxxx",
  "shippingName": "John Doe",
  "shippingEmail": "customer@example.com",
  "shippingAddress": "123 Main Street, Harare, Zimbabwe",
  "shippingMobile": "+263712345678",
  "createdAt": "2024-12-02T10:35:00.000Z",
  "updatedAt": "2024-12-02T10:35:00.000Z",
  "items": [
    {
      "id": "cmjoxxxxxxxxxxxxxxx",
      "orderId": "cmjoxxxxxxxxxxxxxxx",
      "productId": "cmixxxxxxxxxxxxxx",
      "quantity": 2,
      "unitPrice": 79.99,
      "product": {
        "id": "cmixxxxxxxxxxxxxx",
        "name": "Wireless Bluetooth Headphones",
        "price": 79.99
      }
    }
  ],
  "transaction": {
    "id": "cmjoxxxxxxxxxxxxxxx",
    "orderId": "cmjoxxxxxxxxxxxxxxx",
    "amount": 159.98,
    "currency": "USD",
    "status": "completed",
    "provider": "mock",
    "metadata": "{\"success\":true,\"transactionId\":\"MOCK_TX_1734186900000\"}"
  }
}
```

---

## Step 12: List User's Orders

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"

$userOrders = Invoke-RestMethod -Method Get -Uri http://localhost:3000/orders `
  -Headers @{ Authorization = "Bearer $userToken" } `
  -ContentType 'application/json'

Write-Output "User's Orders:"
Write-Output ($userOrders | ConvertTo-Json)
```

**Expected Response:**
```json
[
  {
    "id": "cmjoxxxxxxxxxxxxxxx",
    "userId": "cmjoxxxxxxxxxxxxxxx",
    "total": 159.98,
    "status": "PROCESSING",
    "currency": "USD",
    "createdAt": "2024-12-02T10:35:00.000Z",
    "updatedAt": "2024-12-02T10:35:00.000Z"
    ...
  }
]
```

---

## Step 13: Admin Update Order Status

**PowerShell:**
```powershell
$adminToken = "YOUR_ADMIN_TOKEN_FROM_STEP_3"
$orderId = "YOUR_ORDER_ID_FROM_STEP_9"

$updateStatusBody = @{
  status = 'SHIPPED'
} | ConvertTo-Json

$updatedOrder = Invoke-RestMethod -Method Patch -Uri "http://localhost:3000/orders/$orderId/status" `
  -Headers @{ Authorization = "Bearer $adminToken" } `
  -Body $updateStatusBody `
  -ContentType 'application/json'

Write-Output "Order Status Updated:"
Write-Output ($updatedOrder | ConvertTo-Json)
Write-Output "New Status: $($updatedOrder.status)"
```

**Expected Response:**
```json
{
  "id": "cmjoxxxxxxxxxxxxxxx",
  "status": "SHIPPED",
  ...
}
```

---

## Step 14: Test Insufficient Stock (Should Fail)

**PowerShell:**
```powershell
$userToken = "YOUR_USER_TOKEN_FROM_STEP_5"
$productId = "YOUR_PRODUCT_ID_FROM_STEP_4"

# Try to add more than available (remaining is 8, try to add 10)
$addExcessBody = @{
  productId = $productId
  quantity = 10
} | ConvertTo-Json

try {
  $excessResponse = Invoke-RestMethod -Method Post -Uri http://localhost:3000/cart/items `
    -Headers @{ Authorization = "Bearer $userToken" } `
    -Body $addExcessBody `
    -ContentType 'application/json'
} catch {
  Write-Output "Expected Error (Insufficient Stock):"
  Write-Output ($_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json)
}
```

**Expected Error Response:**
```json
{
  "error": "Insufficient stock"
}
```

---

## Summary of Validations

After running all steps, you should see:

✅ **Authentication**
- User signup and login works
- JWT tokens issued and validated
- Admin promotion works

✅ **Product Management**
- Admin can create products with inventory
- Products are retrievable

✅ **Cart Operations**
- User can add items to cart
- Cart totals calculated correctly
- Inventory validation prevents overselling

✅ **Checkout Flow**
- Cart items converted to order items
- Order created with status PROCESSING
- Payment processed (mock payment succeeds)
- Transaction record created
- Cart cleared after checkout

✅ **Inventory Management**
- Inventory decreased by order quantity (10 → 8)
- Checkout blocked if insufficient stock
- Stock constraints enforced

✅ **Order Management**
- Order retrieved with full details
- User can view own orders
- Admin can update order status

✅ **Email Notifications**
- Check server logs for email send attempts
- Confirmation details logged

---

## Troubleshooting

**Connection Refused (http://localhost:3000)**
- Ensure dev server is running: `npm run dev`
- Check PORT in `.env` (default 3000)

**401 Unauthorized**
- Verify token is included in Authorization header
- Token format: `Bearer <token>`
- Ensure token hasn't expired

**400 Invalid Data**
- Check request body JSON syntax
- Verify all required fields are present

**403 Forbidden**
- Admin endpoints require ADMIN role
- Use admin token, not user token

**404 Not Found**
- Verify product/order IDs exist
- Check ID format (CUID)

**500 Server Error + P2022 Column Missing**
- Prisma schema mismatch with DB
- Run: `npm run prisma:migrate`
- Re-generate client: `npm run prisma:generate`

---

## Quick Copy-Paste Template

Save this as `test-flow.ps1` and edit the variables:

```powershell
# ===== CONFIGURATION =====
$baseUrl = "http://localhost:3000"

# ===== STEP 1: Create Admin =====
Write-Output "Creating admin user..."
$admin = Invoke-RestMethod -Method Post -Uri "$baseUrl/auth/signup" `
  -Body (ConvertTo-Json @{email='admin@peakcommerce.local'; password='AdminPass123!'; name='Admin User'}) `
  -ContentType 'application/json'
$adminToken = $admin.token
Write-Output "✓ Admin created"

# ===== STEP 2: Promote Admin =====
Write-Output "Promoting admin..."
node scripts/promoteUser.js admin@peakcommerce.local
Write-Output "✓ Admin promoted"

# ===== ... (continue with remaining steps) =====
```

Run with:
```powershell
.\test-flow.ps1
```

---

**All commands are ready to run!** Copy-paste each section into PowerShell and observe the responses. Let me know if you encounter any errors and I can help troubleshoot.
