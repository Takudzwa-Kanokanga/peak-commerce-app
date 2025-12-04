# Mailtrap Integration - Quick Reference

## Installation (First Time Setup)

```bash
# 1. Install dependencies
npm install

# 2. Create Mailtrap account at https://mailtrap.io

# 3. Update .env file with Mailtrap credentials
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=your_username
MAILTRAP_PASS=your_api_token

# 4. Start development server
npm run dev
```

## Testing Emails

### Method 1: Test Connection
```bash
curl http://localhost:3000/api/email/test
```

### Method 2: Send Test Email
```bash
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"testType": "email", "testEmail": "your.email@example.com"}'
```

### Method 3: Place a Real Order
1. Add items to cart
2. Go to checkout
3. Fill shipping info
4. Complete order
5. Check Mailtrap inbox

## Environment Variables

```env
# Required
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_api_token

# Optional but recommended
MAILTRAP_FROM_EMAIL=noreply@peakcommerce.com
ADMIN_EMAIL=admin@peakcommerce.com
```

## Files Created/Modified

| File | Status | Purpose |
|------|--------|---------|
| `lib/mailtrap.ts` | NEW | Email service |
| `app/api/email/test/route.ts` | NEW | Test endpoints |
| `app/api/orders/route.ts` | MODIFIED | Send emails on order |
| `.env` | MODIFIED | Mailtrap config |
| `package.json` | MODIFIED | Added nodemailer |

## How Emails Are Sent

```
User Places Order
    ↓
POST /api/orders triggered
    ↓
Order created in database
    ↓
sendOrderConfirmationEmail() called
    ↓
Customer receives formatted email
    ↓
sendAdminOrderNotification() called (if ADMIN_EMAIL set)
    ↓
Admin receives notification
    ↓
Order creation response returned
```

## Email Types

### 1. Customer Order Confirmation
- **When**: Immediately after order placement
- **To**: Customer email address
- **Contains**: Order details, items, shipping address, total
- **Special**: Bank transfer alert if applicable

### 2. Admin Order Notification
- **When**: Immediately after order placement (if ADMIN_EMAIL set)
- **To**: Admin email address
- **Contains**: Customer details, items, total amount
- **Purpose**: Notify admin of new orders

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Connection refused" | Check MAILTRAP_HOST and PORT in .env |
| "Invalid credentials" | Verify username and password from Mailtrap |
| "Email not sent" | Check server console logs for errors |
| "Module not found: nodemailer" | Run `npm install` |
| ".env variables not loading" | Restart `npm run dev` |

## Customization

### Change Email Template
Edit `lib/mailtrap.ts`:
```typescript
const generateOrderConfirmationHTML = (data) => {
  // Modify HTML here
}
```

### Change From Address
```env
MAILTRAP_FROM_EMAIL=custom@example.com
```

### Change Admin Email
```env
ADMIN_EMAIL=newemail@example.com
```

### Change Email Subject
Edit `lib/mailtrap.ts`:
```typescript
subject: `Custom subject here`,
```

## Production Setup

1. **Switch Email Provider**
   - SendGrid, AWS SES, Mailgun, or Mailtrap Production

2. **Update `.env` Variables**
   ```env
   MAILTRAP_HOST=your-production-host
   MAILTRAP_USER=production-user
   MAILTRAP_PASS=production-token
   ```

3. **Verify Domain**
   - Add SPF record to DNS
   - Add DKIM record to DNS
   - Verify with email provider

4. **Test Thoroughly**
   - Send test emails
   - Check deliverability
   - Monitor spam scores

## API Endpoints

### GET `/api/email/test`
Check Mailtrap connection status
- **Auth**: Required
- **Returns**: Connection status and configuration

### POST `/api/email/test`
Send test email
- **Auth**: Required
- **Body**: `{ testType: "email", testEmail: "user@example.com" }`
- **Returns**: Success status

### POST `/api/orders`
Place order (sends emails automatically)
- **Auth**: Required
- **Body**: Order data with items, shipping info, total
- **Returns**: Order + emailSent status

## Code Snippets

### Using Email Service

```typescript
import { sendOrderConfirmationEmail } from "@/lib/mailtrap"

const result = await sendOrderConfirmationEmail({
  orderId: "order-123",
  customerEmail: "user@example.com",
  customerName: "John Doe",
  items: [...],
  shippingInfo: {...},
  total: 1500,
  paymentMethod: "stripe",
  createdAt: new Date().toISOString(),
})

if (result) {
  console.log("Email sent successfully")
}
```

### Test Connection

```typescript
import { testMailtrapConnection } from "@/lib/mailtrap"

const connected = await testMailtrapConnection()
if (connected) {
  console.log("✓ Ready to send emails")
}
```

## Features

✅ Automatic order confirmations
✅ Admin notifications
✅ Professional HTML templates
✅ Responsive design
✅ Error handling
✅ Zimbabwe currency/date format
✅ Bank transfer support
✅ Test endpoints
✅ Production-ready

## Monitoring

### View Sent Emails
1. Log in to Mailtrap
2. Go to your inbox
3. View all emails with delivery status

### Check Logs
```bash
# Server console shows email activity
npm run dev
# Look for lines like:
# "Order confirmation email sent: <messageId>"
# "Error sending email: <error>"
```

## Support

- **Mailtrap Docs**: https://mailtrap.io/docs
- **Nodemailer Docs**: https://nodemailer.com
- **Setup Guide**: See `MAILTRAP_SETUP_GUIDE.md`
- **Implementation**: See `MAILTRAP_IMPLEMENTATION_SUMMARY.md`

## Package Information

```json
{
  "dependencies": {
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "@types/nodemailer": "^6.4.14"
  }
}
```

## Quick Troubleshooting

1. **Check env variables are set**
   ```bash
   echo $MAILTRAP_HOST  # Should output sandbox.smtp.mailtrap.io
   ```

2. **Test connection**
   ```bash
   npm run dev
   curl http://localhost:3000/api/email/test
   ```

3. **Check server logs**
   Look at terminal running `npm run dev` for error messages

4. **Verify Mailtrap account**
   Log in to https://mailtrap.io and confirm inbox exists

5. **Test with real order**
   Place an order on checkout page and check Mailtrap inbox

## Next Steps

1. Set up Mailtrap account (2 minutes)
2. Get credentials (1 minute)
3. Update .env (1 minute)
4. Run `npm install` (2 minutes)
5. Test integration (5 minutes)
6. Deploy to production when ready

---

**Summary**: Peak Commerce now sends professional order confirmation emails to customers and admin notifications on new orders using Mailtrap. The system is production-ready and easy to customize!
