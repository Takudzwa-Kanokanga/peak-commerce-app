# Peak Commerce Setup Guide

## Step-by-Step Setup Instructions

### 1. Clerk Authentication Setup

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Select "Next.js" as your framework
4. Copy your publishable and secret keys
5. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   \`\`\`

### 2. Stripe Setup

1. Go to [stripe.com](https://stripe.com) and sign up
2. Get your test API keys from Dashboard > Developers > API Keys
3. Copy Publishable Key and Secret Key
4. Add to `.env.local`:
   \`\`\`
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   \`\`\`

### 3. Customize Your Store

#### Change Brand Name
1. Edit `components/navigation.tsx` - Update "Peak Commerce" text
2. Edit `components/footer.tsx` - Update footer branding
3. Edit `app/admin/components/admin-sidebar.tsx` - Update admin title

#### Update Product Catalog
1. Replace products in `app/api/products/route.ts`
2. Update featured products in `components/featured-products.tsx`
3. Add your own product images to `public/` folder

#### Modify Colors
Edit `app/globals.css` under `@theme inline`:
\`\`\`css
--color-primary: #2563eb;        /* Change to your brand color */
--color-primary-dark: #1d4ed8;
--color-primary-light: #3b82f6;
\`\`\`

### 4. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Add environment variables:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_BASE_URL (set to your Vercel domain)
5. Click Deploy

### 5. Setup Admin User

1. In Clerk Dashboard, go to Users
2. Open your user profile
3. Add public metadata:
   \`\`\`json
   {
     "role": "admin"
   }
   \`\`\`
4. Access admin dashboard at `/admin`

### 6. Test the Complete Flow

1. **Sign Up**: Create a new account via `/sign-up`
2. **Browse Products**: Check out `/shop`
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Go to cart and complete checkout
5. **Admin Dashboard**: Visit `/admin` to view analytics

### 7. Mobile Testing

Test on different screen sizes:
\`\`\`bash
# Use Chrome DevTools
- iPhone 12/13/14
- iPad
- Pixel phones
- Desktop (1920x1080)
\`\`\`

All components are responsive and tested across devices.

## Troubleshooting

### Clerk Not Loading
- Check NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in `.env.local`
- Restart dev server after adding env vars
- Verify Clerk app is created and active

### Stripe Errors
- Ensure STRIPE_SECRET_KEY (not public key) is in backend
- Check Stripe keys are in test mode
- Verify NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is correct

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind CSS v4 syntax in globals.css

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths match exactly
- Use correct image format (.jpg, .png, .webp)

## Performance Tips

1. **Image Optimization**: Use Next.js Image component (already done)
2. **Code Splitting**: Use dynamic imports for heavy components
3. **Caching**: Leverage Next.js caching strategies
4. **Database**: Implement proper indexing on MongoDB

## Security Checklist

- [ ] Enable HTTPS on production
- [ ] Set strong Stripe API keys
- [ ] Enable Clerk email verification
- [ ] Add rate limiting to API routes
- [ ] Validate all user inputs
- [ ] Use CORS appropriately
- [ ] Keep dependencies updated
- [ ] Enable CSP headers

## Going Live Checklist

- [ ] Update product information
- [ ] Configure real payment processor
- [ ] Set up email notifications
- [ ] Enable customer support system
- [ ] Configure analytics
- [ ] Test on all browsers/devices
- [ ] Set up monitoring/logging
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Test entire checkout flow with real card
