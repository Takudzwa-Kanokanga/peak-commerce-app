# Peak Commerce - Implementation Guide

## Overview

Peak Commerce is a full-featured e-commerce platform built with Next.js 16, Tailwind CSS, Clerk authentication, and Stripe payments. This guide covers all implemented features tailored for the Zimbabwe market.

## ✅ Completed Features

### 1. Product Management (CRUD)
- **API Routes**: `/app/api/products/route.ts` and `/app/api/products/[id]/route.ts`
- **Features**:
  - Create products with image uploads
  - Read products with filtering
  - Update product details, pricing, and stock
  - Delete products
  - Support for product features, categories, and descriptions
  - Stock tracking

**Admin Interface**: `/app/admin/products/page.tsx`
- Grid view of all products
- Add/Edit/Delete modals
- Image upload with preview
- Stock and pricing management

### 2. Order Management
- **API Routes**: `/app/api/orders/route.ts` and `/app/api/orders/[id]/route.ts`
- **Features**:
  - Create orders with items, shipping info, and totals
  - Update order status (Pending → Processing → Fulfilled)
  - Retrieve user and admin orders
  - Order tracking with timestamps

**User Interface**: `/app/orders/page.tsx`
- View all user orders
- Expandable order details
- Order status display with icons
- Shipping and item information

**Admin Interface**: `/app/admin/orders/page.tsx`
- View all orders
- Change order status via dropdown
- Order details expandable view
- Customer and shipping information

### 3. Inventory Management
- **API Route**: `/app/api/inventory/route.ts`
- **Features**:
  - Live stock tracking
  - Reserve stock for pending orders
  - Release reserved stock
  - Deduct stock on fulfillment
  - Restock products
  - Available quantity calculations (stock - reserved)

### 4. Cart & Checkout
- **Cart Context**: `/context/CartContext.tsx`
  - Add/remove items
  - Update quantities with stock validation
  - Clear cart
  - localStorage persistence
  - Error handling and loading states

**Cart Page**: `/app/cart/page.tsx`
- Display all cart items with images
- CRUD operations on cart items
- Real-time inventory sync
- Order summary with ZWL pricing
- Free shipping threshold ($50+)
- Tax calculation (8%)

**Checkout Flow**: `/app/checkout/page.tsx`
- **Step 1: Shipping** - Collect delivery address (Zimbabwe-optimized)
- **Step 2: Payment** - Choose payment method (Stripe or Bank Transfer)
- **Step 3: Review** - Confirm order details
- **Features**:
  - Form validation
  - Edit previous steps
  - ZWL currency formatting
  - Phone number with country code
  - Clear payment feedback
  - Redirect to order tracking on success

### 5. Payment Integration
- **API Route**: `/app/api/checkout/route.ts`
- **Features**:
  - Stripe checkout session creation (test mode)
  - Support for multiple currencies
  - Success/cancel callbacks
  - Bank transfer fallback
  - Secure payment processing

**Configuration**:
- Add Stripe keys to `.env`:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
  STRIPE_SECRET_KEY=sk_test_...
  ```

### 6. Notification System
- **Library**: Sonner (toast notifications)
- **Features**:
  - Order confirmation messages
  - Success/error notifications
  - Loading indicators
  - User-friendly alerts

### 7. Zimbabwe Localization
- **Currency**: ZWL (Zimbabwe Dollar)
- **Formatting**: `PriceFormatter` component with ZWL format
- **Shipping**: Zimbabwe-specific address fields
- **Phone**: Country code support (+263)

## 📁 Project Structure

```
app/
├── api/
│   ├── products/
│   │   ├── route.ts          # Product CRUD (POST, GET)
│   │   └── [id]/route.ts     # Single product (GET, PATCH, DELETE)
│   ├── orders/
│   │   ├── route.ts          # Order CRUD (POST, GET)
│   │   └── [id]/route.ts     # Order details & status update (GET, PATCH)
│   ├── inventory/route.ts    # Inventory management (GET, PATCH)
│   └── checkout/route.ts     # Stripe session creation (POST, GET)
├── admin/
│   ├── products/page.tsx     # Product management UI
│   └── orders/page.tsx       # Order management UI
├── products/
│   └── [id]/page.tsx         # Product details page
├── cart/page.tsx             # Shopping cart
├── checkout/page.tsx         # Multi-step checkout
├── orders/page.tsx           # User order tracking
├── app/
│   └── layout.tsx            # Root layout with providers
└── ...
components/
├── ui/
│   ├── loading-spinner.tsx   # Reusable spinner
│   ├── error-message.tsx     # Error display
│   ├── form-input.tsx        # Form input with validation
│   ├── image-upload.tsx      # Image upload with preview
│   └── price-formatter.tsx   # ZWL/USD formatting
├── navigation.tsx
├── footer.tsx
└── ...
context/
└── CartContext.tsx           # Cart state management
lib/
├── api-client.ts             # API utilities
└── stripe.ts                 # Stripe configuration
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (`.env`)
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

# Stripe (Sandbox/Test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Set Up Admin User
1. Sign up via `/sign-up`
2. Go to Clerk Dashboard → Users
3. Add public metadata:
   ```json
   {
     "role": "admin"
   }
   ```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📍 Key Routes

### Public Routes
- `/` - Home page
- `/shop` - Product listing
- `/products/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Multi-step checkout
- `/orders` - User order tracking
- `/sign-in` - Login
- `/sign-up` - Registration

### Admin Routes
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin` - Dashboard

## 💾 Database Mock Structure

The application uses in-memory mock databases. For production:

### Products Database
```typescript
{
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
  stock: number
  features: string[]
}
```

### Orders Database
```typescript
{
  id: string
  userId: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  total: number
  status: "Pending" | "Processing" | "Fulfilled"
  paymentMethod: string
  createdAt: string
  updatedAt: string
}
```

### Inventory Database
```typescript
{
  productId: number
  stock: number      // Total stock
  reserved: number   // Reserved for pending orders
  available: number  // stock - reserved
}
```

## 🔐 Security & Authentication

- **Clerk** handles user authentication
- All API routes check `userId` from Clerk
- Protected routes redirect to `/sign-in`
- Admin operations protected by user check
- Sensitive operations (delete, patch) require authentication

## 💳 Stripe Integration

### Test Cards
- **Visa**: `4242 4242 4242 4242`
- **Failed**: `4000 0000 0000 0002`

### Webhook Setup (Production)
1. Set up Stripe webhooks in dashboard
2. Listen for events: `checkout.session.completed`
3. Update order status and inventory

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons and inputs

### Loading States
- `LoadingSpinner` component
- Skeleton loading (future improvement)
- Optimistic UI updates

### Error Handling
- `ErrorMessage` component with retry
- Toast notifications via Sonner
- User-friendly error messages
- Form validation feedback

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance

## 📊 Performance Optimizations

- Image optimization with Next.js Image
- Code splitting with dynamic imports
- localStorage for cart persistence
- Efficient state management with Context API
- CSS-in-JS with Tailwind for minimal bundle

## 🧪 Testing Checklist

- [ ] Product CRUD operations
- [ ] Cart add/remove/update items
- [ ] Checkout flow (all steps)
- [ ] Inventory sync on order
- [ ] Stripe payment (test card)
- [ ] Order status updates
- [ ] Admin features
- [ ] Mobile responsiveness
- [ ] Error states
- [ ] Loading states

## 🚀 Deployment

### Vercel (Recommended)
```bash
git push origin main
```

### Environment Variables (Production)
- Update Stripe keys (live mode)
- Set `NEXT_PUBLIC_BASE_URL` to production domain
- Enable Clerk production keys
- Update payment success/cancel URLs

### Database Migration
- Replace mock databases with MongoDB/PostgreSQL
- Update API routes to use real database
- Implement proper transactions for orders

## 📝 Future Enhancements

1. **Email Notifications**
   - Order confirmation emails
   - Shipping updates
   - Account notifications

2. **Payment Methods**
   - EcoCash (Zimbabwe)
   - Zipit (Zimbabwe)
   - Multiple currency support

3. **Advanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Order search and filtering
   - Inventory alerts
   - Bulk operations

4. **Analytics**
   - Sales dashboard
   - Product performance
   - Customer insights
   - Revenue tracking

5. **Inventory**
   - Low stock warnings
   - Automatic reorder
   - Stock level predictions
   - Supplier management

## 🐛 Troubleshooting

### Cart Not Persisting
- Check localStorage is enabled
- Check browser's privacy settings
- Clear browser cache

### Checkout Errors
- Verify Clerk user is logged in
- Check Stripe keys in `.env`
- Verify cart has items

### Product Images Not Loading
- Verify image URLs are accessible
- Check image format (JPEG, PNG, WebP)
- Check file size (max 5MB)

### Admin Pages Not Accessible
- Ensure user has admin role in Clerk metadata
- Check user ID is set correctly
- Verify authentication token

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review console errors
3. Check API response status
4. Verify environment variables

## 📄 License

This project is part of the Software Dev Specialization program.

---

**Last Updated**: December 2, 2025
**Version**: 1.0.0
