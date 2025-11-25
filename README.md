# Peak Commerce - Full-Stack E-Commerce Platform

A modern, fully-responsive e-commerce platform built with Next.js 16, Clerk Authentication, Stripe Payments, and a complete admin dashboard.

## Features

### Customer Experience
- **Responsive Design**: Fully mobile-first responsive across all devices
- **Product Catalog**: Browse products by category with search functionality
- **Product Details**: Detailed product information with ratings and reviews
- **Shopping Cart**: Add/remove items with real-time quantity management
- **Multi-Step Checkout**: Shipping, payment, and order review steps
- **Stripe Integration**: Secure payment processing

### Admin Features
- **Dashboard**: Real-time analytics with sales charts and trends
- **Order Management**: Track and manage all customer orders
- **Product Management**: Add, edit, and delete products with inventory tracking
- **Customer Management**: View customer information and purchase history
- **Inventory Management**: Real-time stock updates

### Authentication
- **Clerk Authentication**: Secure user authentication and management
- **Role-Based Access**: Admin-only dashboard protection
- **User Profiles**: Personalized user accounts and order history

## Tech Stack

**Frontend:**
- Next.js 16 with App Router
- React 19 with Server Components
- Tailwind CSS v4 with custom design tokens
- Recharts for analytics
- Lucide React for icons

**Backend:**
- Next.js API Routes
- Stripe API for payments
- Mock MongoDB structure (ready for real integration)

**Authentication & Services:**
- Clerk for user authentication
- Stripe for payments
- Vercel deployment ready

## Project Structure

\`\`\`
peak-commerce/
├── app/
│   ├── layout.tsx                 # Root layout with Clerk provider
│   ├── page.tsx                   # Home page
│   ├── api/
│   │   ├── products/             # Product endpoints
│   │   ├── orders/               # Order endpoints
│   │   ├── checkout/             # Stripe checkout
│   │   └── inventory/            # Inventory endpoints
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Dashboard
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   └── customers/            # Customer management
│   ├── shop/                      # Product shop page
│   ├── products/[id]/             # Product detail page
│   ├── cart/                      # Shopping cart
│   ├── checkout/                  # Checkout flow
│   ├── sign-in/                   # Clerk sign-in
│   └── sign-up/                   # Clerk sign-up
├── components/
│   ├── navigation.tsx             # Main navigation
│   ├── hero-section.tsx           # Home hero
│   ├── featured-products.tsx      # Featured products grid
│   ├── testimonials.tsx           # Customer testimonials
│   ├── cta-section.tsx            # Call-to-action
│   ├── footer.tsx                 # Footer
│   └── admin-sidebar.tsx          # Admin navigation
├── lib/
│   ├── stripe.ts                  # Stripe configuration
│   └── api-client.ts              # API client utilities
├── globals.css                    # Global styles & design tokens
└── README.md
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Clerk account (free tier available)
- Stripe account (test mode)

### Installation

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <repository-url>
   cd peak-commerce
   npm install
   \`\`\`

2. **Setup environment variables:**
   Create a `.env.local` file in the root directory:
   \`\`\`
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # App
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

3. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Responsive Design Features

- **Mobile First**: All components designed for mobile screens first
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Touch-Friendly**: Large tap targets and mobile-optimized navigation
- **Flexible Layouts**: Flexbox and Grid for responsive layouts
- **Responsive Images**: Optimized with Next.js Image component

## Authentication Flow

1. Users sign up/login via Clerk
2. Clerk handles email verification and security
3. User information stored in Clerk
4. Orders linked to user via userId
5. Admin dashboard restricted to admin-role users

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products?category=Audio` - Filter by category
- `GET /api/products/[id]` - Get product details

### Orders
- `POST /api/orders` - Create new order (authenticated)
- `GET /api/orders` - Get user's orders (authenticated)

### Checkout
- `POST /api/checkout` - Create Stripe session (authenticated)

### Inventory
- `GET /api/inventory` - Get inventory
- `GET /api/inventory?productId=1` - Get specific product stock
- `PUT /api/inventory` - Update stock (admin only)

## Customization

### Design System
Edit `app/globals.css` to modify:
- Color palette (primary, neutrals, semantic colors)
- Typography (fonts via layout.tsx)
- Border radius and spacing

### Products
Update mock data in API routes and component files:
- `app/api/products/route.ts`
- `components/featured-products.tsx`
- `app/shop/page.tsx`

### Admin Dashboard
Customize dashboard stats and charts in:
- `app/admin/page.tsx`
- `app/admin/products/page.tsx`

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel Settings
4. Deploy with `vercel deploy`

\`\`\`bash
vercel deploy
\`\`\`

## Next Steps for Production

1. **Database Integration**: Replace mock data with MongoDB/Supabase
2. **Order Management**: Implement order tracking and notifications
3. **Email Notifications**: Add email confirmations for orders
4. **Payment Webhooks**: Set up Stripe webhooks for order updates
5. **Analytics**: Integrate Google Analytics or Mixpanel
6. **Error Handling**: Add comprehensive error handling and logging
7. **Testing**: Add unit and integration tests
8. **SEO**: Optimize metadata and add sitemap
9. **Security**: Enable CORS, rate limiting, and input validation
10. **CI/CD**: Set up automated tests and deployments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact support at support@peakcommerce.com.
