# Peak Commerce Backend - Implementation Guide

## Project Overview
A complete e-commerce backend built with **Express.js**, **TypeScript**, **PostgreSQL (Prisma)**, **Redis**, and **Stripe** for Zimbabwe operations.

---

## ✅ Completed Features

### 1. **Product Management** ✓
- ✅ Full CRUD endpoints (Create, Read, Update, Delete)
- ✅ Product image upload (local file storage in `/uploads`)
- ✅ Image validation (max 5MB, JPEG/PNG/WebP/GIF only)
- ✅ Stock quantity tracking via `Inventory` model
- ✅ Redis caching for product listings (30s TTL)
- ✅ Admin-only product creation/modification/deletion
- ✅ Automatic cache invalidation on updates

**Endpoints:**
- `GET /products` - List all products (paginated)
- `GET /products/:id` - Get product details
- `POST /products` - Create product with image (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

---

### 2. **Shopping Cart** ✓
- ✅ Full CRUD for cart items
- ✅ Automatic inventory validation when adding items
- ✅ Update item quantities with stock checks
- ✅ Remove individual items or clear entire cart
- ✅ Calculate cart totals
- ✅ One cart per user (unique userId constraint)
- ✅ Include product details in cart response

**Endpoints:**
- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:itemId` - Update item quantity
- `DELETE /cart/items/:itemId` - Remove item
- `DELETE /cart` - Clear cart

---

### 3. **Order Management** ✓
- ✅ Create orders from cart items
- ✅ Order status lifecycle: PENDING → PROCESSING → SHIPPED → DELIVERED
- ✅ Alternative paths: FAILED, CANCELLED, FULFILLED
- ✅ Inventory locking during checkout (prevent double-purchases)
- ✅ Automatic inventory deduction on order placement
- ✅ User-specific order retrieval
- ✅ Admin can view/manage all orders
- ✅ Cancel pending orders (restores inventory)
- ✅ Fulfill orders (mark as FULFILLED)
- ✅ Full order history with items and transaction details

**Endpoints:**
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders/:id/cancel` - Cancel pending order
- `GET /orders/admin/all` - View all orders (admin)
- `PATCH /orders/:id/status` - Update status (admin)
- `POST /orders/:id/fulfill` - Mark as fulfilled (admin)

---

### 4. **Inventory Management** ✓
- ✅ Stock quantity per product
- ✅ Prevent checkout if stock insufficient
- ✅ Deduct inventory on order placement
- ✅ Restore inventory on order cancellation
- ✅ Database-level transaction support to prevent race conditions
- ✅ Pessimistic locking during checkout (`FOR UPDATE`)

**Features:**
- Inventory locked during checkout for consistency
- Automatic rollback if stock insufficient
- Restore quantity when orders are cancelled

---

### 5. **Checkout Process** ✓
- ✅ Complete checkout endpoint with full transaction support
- ✅ Cart validation (not empty)
- ✅ Inventory availability checks
- ✅ Atomic order creation with all items
- ✅ Payment processing integration
- ✅ Transaction record storage
- ✅ Cart clearing after successful checkout
- ✅ Order confirmation emails
- ✅ Support for both mock and Stripe payments
- ✅ Payment callback webhook handler

**Checkout Flow:**
1. Validate cart not empty
2. Lock and check inventory
3. Deduct inventory
4. Create order & items
5. Process payment
6. Store transaction
7. Send confirmation email
8. Clear cart

---

### 6. **Payment Integration** ✓
- ✅ **Mock Payment** - For testing (instant success/failure)
- ✅ **Stripe Integration** - Production-ready Stripe Sandbox
- ✅ Payment intent creation
- ✅ Payment status tracking (pending/completed/failed)
- ✅ Webhook callback handler
- ✅ Transaction storage with provider info
- ✅ Refund capability (built-in)
- ✅ Currency support (USD for Zimbabwe)

**Payment Service Functions:**
- `processMockPayment()` - Test payments
- `createStripePaymentIntent()` - Create Stripe payment
- `confirmStripePayment()` - Confirm payment status
- `refundPayment()` - Refund transactions

---

### 7. **Email Notifications** ✓
- ✅ Order confirmation emails on successful purchase
- ✅ Rich HTML email templates
- ✅ Include order details (ID, total, items, shipping)
- ✅ Confirmation code generation
- ✅ Shipping notification templates (extensible)
- ✅ Cancellation notification templates (extensible)
- ✅ Nodemailer integration with SMTP support
- ✅ Graceful error handling (doesn't block checkout)

**Email Functions:**
- `sendOrderConfirmation()` - Send order details
- `sendShippingNotification()` - Notify when shipped
- `sendCancellationEmail()` - Notify on cancellation

---

### 8. **Authentication & Authorization** ✓
- ✅ User registration with email validation
- ✅ Secure password hashing (bcrypt)
- ✅ JWT-based token authentication
- ✅ User login with credentials
- ✅ Token verification middleware
- ✅ Admin role-based access control
- ✅ User-scoped data access (can't see others' carts/orders)
- ✅ Admin-only endpoints protected

**Auth Endpoints:**
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login & get JWT token

---

### 9. **Data Models & Relationships** ✓

**Core Models:**
- **User** - Authentication & order tracking
- **Product** - Product catalog with images & pricing
- **Inventory** - Stock quantity per product
- **Cart** - User shopping cart (one per user)
- **CartItem** - Items in cart with quantity & price
- **Order** - Customer orders with status & shipping
- **OrderItem** - Items in order with pricing snapshot
- **Transaction** - Payment details & tracking

**Features:**
- Cascading deletes for data integrity
- Foreign key constraints
- Proper indexing on frequently queried fields
- Automatic timestamps (createdAt, updatedAt)
- One-to-many and one-to-one relationships

---

### 10. **API Standards & Validation** ✓
- ✅ RESTful endpoints with proper HTTP methods
- ✅ JSON request/response format
- ✅ Zod schema validation on all inputs
- ✅ Detailed error messages with validation details
- ✅ Proper HTTP status codes (200, 201, 204, 400, 401, 403, 404, 500)
- ✅ Consistent error response format
- ✅ Input sanitization and validation
- ✅ Rate limiting ready (can be added)

---

## 📁 Project Structure

```
src/
├── auth/
│   └── routes.ts                 # Authentication endpoints
├── controllers/
│   ├── product.ts               # Product CRUD operations
│   ├── cart.ts                  # Cart management
│   ├── orders.ts                # Order operations
│   └── checkout.ts              # Checkout & payment
├── middleware/
│   ├── auth.ts                  # JWT verification & roles
│   └── upload.ts                # Multer image upload
├── routes/
│   ├── productRoutes.ts          # Product endpoints
│   ├── cartRoutes.ts             # Cart endpoints
│   ├── orderRoutes.ts            # Order endpoints
│   └── checkoutRoutes.ts         # Checkout endpoints
├── services/
│   ├── payment.ts               # Stripe & mock payments
│   └── email.ts                 # Email notifications
├── utils/
│   └── jwt.ts                   # JWT signing & verification
├── validation/
│   └── schemas.ts               # Zod validation schemas
├── prisma.ts                    # Prisma client
├── redis.ts                     # Redis client
└── server.ts                    # Express app setup

prisma/
├── schema.prisma                # Database schema
├── seed.ts                      # Database seeding
└── migrations/                  # Migrations

.env.example                     # Environment template
API_DOCUMENTATION.md             # Complete API docs
IMPLEMENTATION_GUIDE.md          # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis (optional, gracefully disabled if unavailable)
- Stripe account (test keys)
- Email service (Mailtrap, SendGrid, or local SMTP)

### Installation

1. **Clone and navigate to project:**
   ```bash
   cd backend/mini-ecommerce-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:3000`

---

## 🔌 Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing

**Optional but Recommended:**
- `REDIS_URL` - Redis connection (caching disabled if not set)
- `STRIPE_SECRET_KEY` - Stripe test secret key
- `STRIPE_PUBLIC_KEY` - Stripe test public key
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` - Email service
- `MAIL_FROM` - From email address
- `FRONTEND_URL` - Frontend origin for CORS
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - development/production

---

## 🧪 Testing

### Test Checkout Flow

1. **Create user:**
   ```bash
   curl -X POST http://localhost:3000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"user@test.com","password":"pass123","name":"Test User"}'
   ```

2. **Create product (as admin):**
   ```bash
   curl -X POST http://localhost:3000/products \
     -H "Authorization: Bearer TOKEN" \
     -F "name=Test Product" \
     -F "price=99.99" \
     -F 'inventory={"quantity":10}'
   ```

3. **Add to cart:**
   ```bash
   curl -X POST http://localhost:3000/cart/items \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"productId":"prod_id","quantity":2}'
   ```

4. **Checkout:**
   ```bash
   curl -X POST http://localhost:3000/checkout \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "shippingName":"John Doe",
       "shippingEmail":"john@test.com",
       "shippingAddress":"123 Main St, Harare",
       "shippingMobile":"+263712345678",
       "paymentMethod":"mock"
     }'
   ```

---

## 📊 Database Schema

The Prisma schema includes:
- **8 Models** - User, Product, Inventory, Cart, CartItem, Order, OrderItem, Transaction
- **2 Enums** - Role (USER/ADMIN), OrderStatus (7 statuses)
- **Relationships** - One-to-many, one-to-one with cascading deletes
- **Indexes** - On frequently queried fields for performance
- **Constraints** - Unique email, unique SKU, unique cart per user

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication with expiry
- ✅ Role-based access control (ADMIN/USER)
- ✅ User-scoped data access enforcement
- ✅ Input validation with Zod schemas
- ✅ CORS configured for frontend
- ✅ SQL injection prevention (Prisma parameterized queries)
- ✅ Inventory locking prevents race conditions
- ✅ Transaction support for data consistency

---

## 🚀 Deployment Considerations

### Production Checklist
- [ ] Set strong `JWT_SECRET` in production
- [ ] Use Stripe live keys
- [ ] Configure production email service
- [ ] Set `NODE_ENV=production`
- [ ] Use SSL/HTTPS
- [ ] Set up database backups
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting
- [ ] Monitor error logs
- [ ] Set up CI/CD pipeline
- [ ] Use environment-specific .env files

### Scaling
- Redis is used for caching (can be distributed)
- Database transactions ensure consistency
- Stateless API design allows horizontal scaling
- Image uploads can be migrated to S3/cloud storage
- Payment webhooks should be idempotent

---

## 📝 Notes for Zimbabwe Deployment

1. **Currency**: Default USD. Can be easily changed to ZWL in schema and code
2. **Email Delivery**: Use services like Mailtrap (dev), Sendgrid, or AWS SES (production)
3. **Payment**: Stripe test mode for development; requires live keys + Zimbabwean bank account for production
4. **Compliance**: Ensure data privacy compliance (GDPR, local regulations)
5. **Localization**: Add multi-language support as needed

---

## 🐛 Troubleshooting

### Database Connection Failed
- Check `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Verify network access to database

### Stripe Integration Issues
- Verify `STRIPE_SECRET_KEY` is set
- Check Stripe test mode is enabled
- Review Stripe logs for payment errors

### Email Not Sending
- Verify SMTP credentials
- Check email service is accessible
- Review server logs for errors

### Image Upload Not Working
- Ensure `/uploads` directory is writable
- Check file size limits
- Verify image format is supported

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma ORM Guide](https://www.prisma.io/docs/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [JWT Guide](https://jwt.io/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Future Enhancements

- [ ] SMS notifications via Twilio
- [ ] Advanced product search/filtering
- [ ] Reviews and ratings
- [ ] Wishlist functionality
- [ ] Coupon/discount system
- [ ] Multi-currency support
- [ ] Admin dashboard analytics
- [ ] Inventory alerts/low stock notifications
- [ ] Order tracking/shipment integration
- [ ] Subscription products
- [ ] GraphQL API alternative
- [ ] Mobile app authentication

---

## 📞 Support

For issues or questions:
1. Check API documentation: `/api`
2. Review error messages carefully
3. Check server logs
4. Consult database schema in Prisma
5. Test endpoints with curl or Postman

---

**Last Updated:** December 2, 2024
**Version:** 1.0.0
**Status:** Complete ✅
