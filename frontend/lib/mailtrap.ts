// lib/mailtrap.ts
/**
 * Mailtrap email service for sending order notifications
 */

import nodemailer from "nodemailer"

// Initialize Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
})

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface OrderConfirmationEmailData {
  orderId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  total: number
  paymentMethod: string
  createdAt: string
}

/**
 * Generate order confirmation email HTML
 */
const generateOrderConfirmationHTML = (data: OrderConfirmationEmailData): string => {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">×${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">ZWL ${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #667eea; }
        .order-details p { margin: 8px 0; }
        .label { font-weight: bold; color: #667eea; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #667eea; }
        .total-row { font-weight: bold; font-size: 18px; background: #f9f9f9; }
        .total-row td { padding: 15px 12px; border-top: 2px solid #667eea; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
        </div>

        <div class="content">
          <div class="order-details">
            <p><span class="label">Order ID:</span> ${data.orderId}</p>
            <p><span class="label">Date:</span> ${new Date(data.createdAt).toLocaleDateString("en-ZA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <p><span class="label">Payment Method:</span> ${data.paymentMethod === "stripe" ? "Credit/Debit Card" : "Bank Transfer"}</p>
          </div>

          <h3 style="color: #333; margin-top: 20px;">Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="2" style="text-align: right;">Total:</td>
                <td style="text-align: right;">ZWL ${data.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <h3 style="color: #333; margin-top: 20px;">Shipping Address</h3>
          <div class="order-details">
            <p>${data.shippingInfo.firstName} ${data.shippingInfo.lastName}</p>
            <p>${data.shippingInfo.address}</p>
            <p>${data.shippingInfo.city}, ${data.shippingInfo.postalCode}</p>
            <p>${data.shippingInfo.country}</p>
            <p><span class="label">Phone:</span> ${data.shippingInfo.phone}</p>
          </div>

          <h3 style="color: #333; margin-top: 20px;">Next Steps</h3>
          <p>Your order has been received and is being processed. You will receive a shipping confirmation email shortly.</p>

          ${
            data.paymentMethod === "bank_transfer"
              ? `
            <div class="order-details" style="background: #fff3cd; border-left-color: #ffc107;">
              <p style="color: #856404;"><strong>Bank Transfer Required</strong></p>
              <p style="color: #856404; margin: 10px 0;">You selected bank transfer as your payment method. Please complete the payment within 24 hours to confirm your order. Bank details will be provided via a separate email.</p>
            </div>
          `
              : ""
          }

          <p style="text-align: center; margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/orders" class="button">Track Your Order</a>
          </p>
        </div>

        <div class="footer">
          <p>Peak Commerce | E-Commerce Platform</p>
          <p>Questions? Contact us at support@peakcommerce.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Send order confirmation email
 */
export const sendOrderConfirmationEmail = async (data: OrderConfirmationEmailData): Promise<boolean> => {
  try {
    // Verify transporter connection
    await transporter.verify()

    const mailOptions = {
      from: process.env.MAILTRAP_FROM_EMAIL || "noreply@peakcommerce.com",
      to: data.customerEmail,
      subject: `Order Confirmation - Order #${data.orderId}`,
      html: generateOrderConfirmationHTML(data),
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("Order confirmation email sent:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return false
  }
}

/**
 * Send order notification to admin
 */
export const sendAdminOrderNotification = async (data: OrderConfirmationEmailData): Promise<boolean> => {
  try {
    await transporter.verify()

    const adminHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #333; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; border: 1px solid #e0e0e0; }
          .order-info { background: white; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .label { font-weight: bold; color: #667eea; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; }
          td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received</h1>
          </div>
          <div class="content">
            <div class="order-info">
              <p><span class="label">Order ID:</span> ${data.orderId}</p>
              <p><span class="label">Customer:</span> ${data.customerName}</p>
              <p><span class="label">Email:</span> ${data.customerEmail}</p>
              <p><span class="label">Total:</span> ZWL ${data.total.toFixed(2)}</p>
              <p><span class="label">Payment Method:</span> ${data.paymentMethod === "stripe" ? "Credit/Debit Card" : "Bank Transfer"}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${data.items.map((item) => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>ZWL ${(item.price * item.quantity).toFixed(2)}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `

    const mailOptions = {
      from: process.env.MAILTRAP_FROM_EMAIL || "noreply@peakcommerce.com",
      to: process.env.ADMIN_EMAIL || "admin@peakcommerce.com",
      subject: `New Order: #${data.orderId} - ZWL ${data.total.toFixed(2)}`,
      html: adminHTML,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("Admin notification email sent:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    return false
  }
}

/**
 * Test Mailtrap connection
 */
export const testMailtrapConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify()
    console.log("✓ Mailtrap connection successful")
    return true
  } catch (error) {
    console.error("✗ Mailtrap connection failed:", error)
    return false
  }
}
