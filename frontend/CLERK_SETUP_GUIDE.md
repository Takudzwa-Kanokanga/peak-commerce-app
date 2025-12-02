# 🔐 Clerk Authentication Setup Guide

## ✅ What Was Done

### 1. Created Middleware File
**File**: `middleware.ts` (in root of project)

This file enables Clerk's authentication middleware to work properly. It:
- ✅ Protects routes that require authentication (`/cart`, `/checkout`, `/orders`, `/admin`)
- ✅ Allows public routes (`/`, `/sign-in`, `/sign-up`, `/products`, `/shop`)
- ✅ Configures the matcher to intercept all requests appropriately

### 2. Updated Navigation Component
**File**: `components/navigation.tsx`

Added:
- ✅ Sign-out button in desktop view (LogOut icon)
- ✅ Admin link visible when signed in
- ✅ Mobile menu support for sign-out
- ✅ Proper user authentication state handling

---

## 🔧 Next Steps to Complete Setup

### Step 1: Verify Environment Variables
Your `.env` file should have:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

**Check**: Are these keys present in your `.env` file?

### Step 2: Clerk Dashboard Configuration

Go to [Clerk Dashboard](https://dashboard.clerk.com)

1. **Create Application** (if not done)
   - Go to Applications → Create application
   - Choose your authentication methods (Email, Social, etc.)

2. **Get Your Keys**
   - Dashboard → API Keys
   - Copy `Publishable Key` → Add to `.env` as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy `Secret Key` → Add to `.env` as `CLERK_SECRET_KEY`

3. **Configure URLs**
   - Go to Applications → Settings
   - **Allowed Origins**: `http://localhost:3000` (for development)
   - **Allowed Redirect URLs**: `http://localhost:3000` (for development)
   - **Create Organization (Optional)**: For admin features

4. **Set Redirect URLs**
   - After Sign In: `/shop`
   - After Sign Up: `/shop`
   - After Sign Out: `/`

### Step 3: Test the Setup

Run the development server:
```bash
npm run dev
```

Visit: `http://localhost:3000`

Test:
1. ✅ Click "Sign Up" - Should show Clerk sign-up form
2. ✅ Create an account - Should work without errors
3. ✅ Click "Sign In" - Should show Clerk sign-in form
4. ✅ Sign in with your account - Should redirect to `/shop`
5. ✅ Click logout button (LogOut icon) - Should sign out properly

---

## 🐛 If You Still Get the Error

### Error Message
```
Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()
```

### Solutions

**Solution 1: Clear Node Modules and Reinstall**
```bash
rm -r node_modules package-lock.json
npm install
npm run dev
```

**Solution 2: Restart Dev Server**
1. Stop the dev server (Ctrl+C)
2. Wait 2 seconds
3. Run `npm run dev` again

**Solution 3: Check Middleware File**
Verify `middleware.ts` exists at root:
```bash
# Should output path to middleware.ts
ls middleware.ts
```

**Solution 4: Clear Next.js Cache**
```bash
rm -r .next
npm run dev
```

**Solution 5: Verify API Routes**
Make sure all API routes use `auth()` correctly:
```typescript
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  // ... rest of code
}
```

---

## 📝 Configuration Files

### middleware.ts (Created)
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/products(.*)",
  "/shop(.*)",
  "/about(.*)",
  "/api/products(.*)",
  "/api/inventory(.*)",
  "/api/checkout(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/checkout(.*)",
  "/orders(.*)",
  "/api/orders(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### layout.tsx (Already Updated)
```typescript
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### navigation.tsx (Updated)
- Added LogOut icon for desktop sign-out
- Added Admin link when signed in
- Added mobile menu support

---

## 🎯 Testing Checklist

After completing setup:

- [ ] Dev server runs without errors
- [ ] Visit `http://localhost:3000`
- [ ] Click "Sign Up" button
- [ ] Clerk sign-up form appears
- [ ] Create account successfully
- [ ] Redirects to `/shop`
- [ ] See LogOut button in top-right
- [ ] Click LogOut button
- [ ] Sign out works properly
- [ ] Redirects to home page
- [ ] Can click "Sign In" to log back in

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No "Clerk can't detect usage" errors
- ✅ Sign-up form appears without errors
- ✅ Account creation works
- ✅ Sign-in works
- ✅ Sign-out works
- ✅ Can access cart, checkout, orders (after signing in)
- ✅ Can't access admin (unless you set admin role)

---

## 🔗 Quick Links

- **Clerk Dashboard**: https://dashboard.clerk.com
- **Clerk Documentation**: https://clerk.com/docs
- **Clerk Next.js Guide**: https://clerk.com/docs/quickstarts/nextjs
- **API Keys**: https://dashboard.clerk.com/apps

---

## 📞 Troubleshooting Commands

If you encounter issues, try these commands in order:

```bash
# 1. Stop dev server and clear cache
npm run dev  # Stop with Ctrl+C

# 2. Clear Next.js cache
rm -r .next

# 3. Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# 4. Try again
npm run dev

# 5. If still issues, rebuild
npm run build
npm run dev
```

---

## 🎓 What Each File Does

| File | Purpose |
|------|---------|
| `middleware.ts` | Handles auth validation for all routes |
| `app/layout.tsx` | Wraps app with ClerkProvider |
| `app/sign-in/page.tsx` | Clerk sign-in form |
| `app/sign-up/page.tsx` | Clerk sign-up form |
| `components/navigation.tsx` | Auth-aware navigation with sign-out |
| `.env` | Clerk API keys (not in git) |

---

## 🚀 After Setup Works

Once authentication is fully working:

1. Create an admin account
2. Go to Clerk Dashboard
3. Find your user
4. Add metadata: `{ "role": "admin" }`
5. Now you can access `/admin` pages

---

**The middleware is now in place! Complete the Clerk Dashboard setup to make it fully functional.**

*Last Updated: December 2, 2025*
