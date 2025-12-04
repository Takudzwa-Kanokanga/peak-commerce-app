# Mailtrap Integration Guide

## Overview

This guide will help you set up **Mailtrap** for sending order confirmation emails and admin notifications when users place orders in the Peak Commerce app.

## What is Mailtrap?

Mailtrap is a free email delivery service for testing and staging environments. It allows you to:
- Send real emails without worrying about spamming
- Test email templates before sending to production
- View all sent emails in a clean interface
- Use a sandbox SMTP server for development

## Step 1: Create a Mailtrap Account

1. Visit [https://mailtrap.io](https://mailtrap.io)
2. Click **"Start for Free"** or **"Sign Up"**
3. Create an account using your email address
4. Verify your email address
5. Log in to your Mailtrap account

## Step 2: Create a New Project/Inbox

1. In the Mailtrap dashboard, click **"Create Inbox"** or **"Add Project"**
2. Name your project something like **"Peak Commerce Development"**
3. Select **"Testing"** as the project type
4. Click **"Create"**

## Step 3: Get Your Mailtrap Credentials

1. Open your newly created inbox/project
2. Go to the **"Settings"** tab or **"SMTP Settings"** section
3. You'll see the SMTP configuration with:
   - **Host**: `sandbox.smtp.mailtrap.io`
   - **Port**: `587` (or `2525`)
   - **Username**: Your email or user ID
   - **Password**: An API token

## Step 4: Update Environment Variables

1. Open `.env` file in your project root
2. Update the Mailtrap configuration variables:

```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=your_mailtrap_username_here
MAILTRAP_PASS=your_mailtrap_api_token_here
MAILTRAP_FROM_EMAIL=noreply@peakcommerce.com
ADMIN_EMAIL=admin@peakcommerce.com
```

**Example values:**

```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=1a2b3c4d5e6f7g
MAILTRAP_PASS=a1b2c3d4e5f6g7h8
MAILTRAP_FROM_EMAIL=noreply@peakcommerce.com
ADMIN_EMAIL=admin@peakcommerce.com
```

## Step 5: Install Dependencies

The `nodemailer` package is already included in `package.json`. Ensure it's installed:

```bash
npm install
```

If needed, install nodemailer specifically:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Step 6: Test the Integration

### Test Connection

Create a test file to verify the connection:

```bash
# Create a test script
cat > test-mailtrap.js << 'EOF'
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "YOUR_MAILTRAP_USER",
    pass: "YOUR_MAILTRAP_PASS",
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Error:", error)
  } else {
    console.log("✓ Mailtrap connection successful!")
  }
})
EOF

node test-mailtrap.js
```

### Test with the App

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the checkout page
3. Complete the order placement
4. Check your Mailtrap inbox at [https://mailtrap.io](https://mailtrap.io)
5. You should see the order confirmation email and admin notification

## How It Works

### Customer Order Confirmation Email

When a user places an order, a confirmation email is automatically sent with:
- Order ID and date
- List of purchased items
- Total amount
- Shipping address
- Payment method information
- Link to track the order

**Location**: `lib/mailtrap.ts` → `sendOrderConfirmationEmail()`

### Admin Order Notification

An admin notification email is sent to the admin email address with:
- New order alert
- Customer details
- Items ordered
- Total amount
- Payment method

**Location**: `lib/mailtrap.ts` → `sendAdminOrderNotification()`

### Email Flow

```
User Places Order
        ↓
POST /api/orders
        ↓
Create Order in Database
        ↓
Send Customer Confirmation Email
        ↓
Send Admin Notification Email
        ↓
Return Success Response
```

## Email Templates

### Customer Email Features

- **Professional Header** - Gradient background with company branding
- **Order Details** - Order ID, date, and payment method
- **Item Table** - Product name, quantity, and price
- **Shipping Address** - Delivery information
- **Next Steps** - Information about order processing
- **Bank Transfer Alert** - Special message for bank transfer payments
- **Responsive Design** - Works on mobile, tablet, and desktop

### Admin Email Features

- **Quick Overview** - All key order information
- **Customer Contact** - Email and phone number
- **Items List** - Table of ordered products
- **Total Amount** - Easy-to-see total

## Email Customization

To customize email templates, edit `lib/mailtrap.ts`:

### Customize From Email

Update in `.env`:

```env
MAILTRAP_FROM_EMAIL=your-custom-email@peakcommerce.com
```

### Customize Email Content

Edit these functions in `lib/mailtrap.ts`:

1. `generateOrderConfirmationHTML()` - Customer email HTML
2. `sendAdminOrderNotification()` - Admin email content

### Add Custom Subject Lines

Edit the `subject` field in the `mailOptions`:

```typescript
subject: `Order Confirmation - Order #${data.orderId}`,
```

## Migrating to Production

### Step 1: Create Production Email Service

1. Sign up for a production email service:
   - **Sendgrid** (https://sendgrid.com)
   - **AWS SES** (https://aws.amazon.com/ses/)
   - **Mailgun** (https://www.mailgun.com)
   - **Mailtrap Production** (Mailtrap also offers production SMTP)

2. Get production SMTP credentials

### Step 2: Update Environment Variables

```env
# Production emails
MAILTRAP_HOST=your-production-smtp-host
MAILTRAP_PORT=587
MAILTRAP_USER=your-production-username
MAILTRAP_PASS=your-production-api-key
MAILTRAP_FROM_EMAIL=orders@peakcommerce.com
ADMIN_EMAIL=admin@peakcommerce.com
```

### Step 3: Verify Sending Domain

Most production email services require domain verification:

1. Add SPF record to your domain DNS
2. Add DKIM record to your domain DNS
3. Verify the domain with your email service

### Step 4: Test Production Emails

1. Send test emails to real email addresses
2. Check email deliverability
3. Monitor bounce rates
4. Set up email templates in production service if available

## Troubleshooting

### "Connection Refused" Error

**Problem**: Cannot connect to Mailtrap

**Solution**:
- Verify MAILTRAP_HOST is correct: `sandbox.smtp.mailtrap.io`
- Check MAILTRAP_PORT is 587 or 2525
- Verify credentials are correct
- Check firewall/antivirus isn't blocking SMTP

### "Invalid Credentials" Error

**Problem**: Username/password not accepted

**Solution**:
- Double-check your Mailtrap credentials
- Copy credentials directly from Mailtrap dashboard
- Ensure there are no extra spaces
- Regenerate API token if necessary

### Emails Not Appearing in Inbox

**Problem**: Order placed but email not in Mailtrap

**Solution**:
- Check server console logs for errors
- Verify `.env` variables are loaded
- Check Mailtrap dashboard for bounce/rejected messages
- Verify email address is valid
- Check spam/trash folder

### ENOENT Error (File Not Found)

**Problem**: Error about missing modules

**Solution**:
```bash
npm install nodemailer @types/nodemailer
npm install
```

## Security Best Practices

1. **Never commit credentials** - Keep `.env` in `.gitignore`
2. **Use environment variables** - Don't hardcode SMTP credentials
3. **Rotate API tokens** - Periodically regenerate Mailtrap tokens
4. **Use HTTPS only** - In production, always use encrypted connections
5. **Validate email addresses** - Use email validation before sending
6. **Rate limiting** - Implement limits on email sending to prevent abuse
7. **Monitor logs** - Check server logs for failed email attempts

## API Reference

### `sendOrderConfirmationEmail(data)`

Sends a formatted order confirmation email to the customer.

**Parameters:**
```typescript
interface OrderConfirmationEmailData {
  orderId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  total: number
  paymentMethod: string
  createdAt: string
}
```

**Returns:** `Promise<boolean>` - True if successful

**Usage:**
```typescript
const sent = await sendOrderConfirmationEmail({
  orderId: "abc123",
  customerEmail: "user@example.com",
  customerName: "John Doe",
  items: [...],
  shippingInfo: {...},
  total: 1500,
  paymentMethod: "stripe",
  createdAt: new Date().toISOString(),
})
```

### `sendAdminOrderNotification(data)`

Sends an admin notification email about a new order.

**Parameters:** Same as `sendOrderConfirmationEmail()`

**Returns:** `Promise<boolean>` - True if successful

### `testMailtrapConnection()`

Tests the connection to Mailtrap.

**Returns:** `Promise<boolean>` - True if connection successful

**Usage:**
```typescript
const connected = await testMailtrapConnection()
if (connected) {
  console.log("✓ Mailtrap is ready")
}
```

## Features

✅ **Automatic Order Confirmation** - Customer receives email immediately after order

✅ **Admin Notifications** - Admin gets notified of new orders

✅ **Professional Templates** - Responsive, branded email design

✅ **Error Handling** - Graceful failures don't block order creation

✅ **Payment Method Support** - Special handling for bank transfers

✅ **Zimbabwe Formatting** - ZWL currency and local date format

✅ **Order Tracking Link** - Direct link to track orders

✅ **Bank Transfer Alerts** - Special message for bank transfer customers

## Next Steps

1. Set up your Mailtrap account and get credentials
2. Update `.env` file with credentials
3. Test with `npm run dev` by placing a test order
4. Customize email templates as needed
5. When ready for production, set up a production email service

## Support

For issues with Mailtrap:
- Visit [https://mailtrap.io/support](https://mailtrap.io/support)
- Check [Mailtrap Documentation](https://mailtrap.io/docs)

For code issues in this implementation:
- Check server logs for detailed error messages
- Verify all environment variables are set
- Test email connection with provided test script
