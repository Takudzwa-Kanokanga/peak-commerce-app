# Quick Start Guide - Peak Commerce

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Clerk account (for auth)
- Stripe account (for payments)

---

## Step 1: Install Dependencies
```bash
cd frontend
npm install
```

---

## Step 2: Set Up Environment Variables

Create `.env` file in the `frontend` directory:

```env
# Clerk Authentication (get from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Stripe (get from stripe.com/test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 💡 **Tip**: You can use the existing test keys in `.env` for development

---

## Step 3: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## Step 4: Test the Application

### 4a. Create an Account
1. Go to `/sign-up`
2. Create a test account with any email

### 4b. Browse Products
1. Navigate to `/shop`
2. Click on any product to view details
3. Click "Add to Cart"

### 4c. Go Shopping
1. Go to `/cart`
2. Adjust quantities
3. Click "Proceed to Checkout"

### 4d. Complete Checkout
1. **Shipping**: Fill in test address
   ```
   First Name: Test
   Last Name: User
   Email: test@example.com
   Phone: +263701234567
   Address: 123 Test Street
   City: Harare
   Postal Code: 2000
   ```
2. **Payment**: Choose "Stripe" (test mode)
3. **Review**: Check order details
4. **Place Order**: Click "Place Order"
5. View your order at `/orders`

### 4e. Test Admin Features
1. Add admin role to your user:
   - Go to Clerk Dashboard (dashboard.clerk.com)
   - Find your user
   - Add public metadata:
     ```json
     {
       "role": "admin"
     }
     ```

2. Visit `/admin/products`
   - Create new product
   - Edit existing product
   - Delete product
   - Upload product image

3. Visit `/admin/orders`
   - View all orders
   - Change order status
   - View order details

---

## 🧪 Test Data

### Test Stripe Card
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

### Test Products (Pre-loaded)
1. Wireless Bluetooth Headphones - ZWL 79.99
2. Smartwatch with Heart Monitor - ZWL 199.99
3. Portable Bluetooth Speaker - ZWL 89.99
4. USB-C Charging Cable - ZWL 14.99
5. Wireless Mouse - ZWL 34.99
6. 4K Webcam - ZWL 129.99

### Test Shipping Address (Zimbabwe)
```
First Name: John
Last Name: Doe
Email: john@example.com
Phone: +263701234567
Address: 456 Enterprise Road
City: Harare
Postal Code: 2000
Country: Zimbabwe
```

---

## 📁 Key Pages

### Public Pages
- `/` - Home
- `/shop` - Product listing
- `/products/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Multi-step checkout
- `/orders` - Your orders
- `/sign-in` - Login
- `/sign-up` - Register

### Admin Pages (requires admin role)
- `/admin/products` - Manage products
- `/admin/orders` - Manage all orders

---

## 🎯 Quick Commands

### Build for Production
```bash
npm run build
npm start
```

### Run Type Check
```bash
npm run type-check
# or
tsc --noEmit
```

### Lint Code
```bash
npm run lint
```

---

## 🐛 Common Issues

### Issue: Cart not persisting
**Solution**: Check that localStorage is enabled in browser

### Issue: Can't access admin pages
**Solution**: 
1. Make sure you're logged in
2. Add admin role to your Clerk user
3. Refresh page after updating metadata

### Issue: Images not uploading
**Solution**:
- Check image is under 5MB
- Check image format (JPEG, PNG, WebP)
- Check browser console for errors

### Issue: Stripe test card failing
**Solution**:
- Use test card: 4242 4242 4242 4242
- Use any future expiry date
- Use any 3-digit CVC
- Don't use real card numbers

### Issue: Port 3000 already in use
**Solution**:
```bash
npm run dev -- -p 3001
```

---

## 📋 Feature Checklist

- ✅ Product CRUD (Create, Read, Update, Delete)
- ✅ Shopping cart with persistence
- ✅ Multi-step checkout
- ✅ Order management
- ✅ Inventory tracking
- ✅ Stripe payment integration
- ✅ Zimbabwe localization (ZWL currency)
- ✅ Admin dashboard
- ✅ Order tracking
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications

---

## 🔐 Security Notes

- Never commit `.env` files
- Keep Stripe secret key private
- Use test keys for development
- Enable HTTPS on production
- Implement rate limiting
- Validate all inputs

---

## 📊 Mock Database Info

The application uses in-memory mock databases:
- Products: Stored in `/app/api/products/route.ts`
- Orders: Stored in `/app/api/orders/route.ts`
- Inventory: Stored in `/app/api/inventory/route.ts`

**Note**: Data resets on server restart. For production, connect to a real database (MongoDB, PostgreSQL, etc.)

---

## 🚀 Production Deployment

### On Vercel (Recommended)
```bash
git push origin main
# Deploy automatically on Vercel
```

### Environment Variables (Update for Production)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 💡 Next Steps

1. **Review Code**: Check `/IMPLEMENTATION_GUIDE.md` for full documentation
2. **Customize**: Update branding, colors, and products
3. **Database**: Connect to MongoDB or PostgreSQL
4. **Email**: Add email notifications
5. **Payments**: Add more payment methods (EcoCash, Zipit for Zimbabwe)
6. **Analytics**: Implement analytics tracking
7. **Testing**: Write unit and integration tests

---

## 📚 Documentation

- **Implementation Guide**: `IMPLEMENTATION_GUIDE.md`
- **Feature Summary**: `FEATURE_SUMMARY.md`
- **Setup Guide**: `SETUP_GUIDE.md`

---

## 🆘 Need Help?

1. Check error messages in browser console
2. Review API response in Network tab
3. Check server logs in terminal
4. Review documentation files
5. Check `.env` file configuration

---

## 🎉 You're Ready!

Your Peak Commerce e-commerce platform is now running. Start exploring and building! 🚀

---

**Last Updated**: December 2, 2025  
**Version**: 1.0.0
