import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: Number(process.env.MAIL_PORT) || 2525,
  auth: {
    user: process.env.MAIL_USER || "test",
    pass: process.env.MAIL_PASS || "test"
  }
});

interface OrderItem {
  product: { name: string; price: number };
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  total: number;
  currency: string;
  shippingName: string;
  shippingAddress: string;
  shippingMobile: string;
  items?: OrderItem[];
}

export const sendOrderConfirmation = async (to: string, orderId: string, order?: Order) => {
  try {
    const confirmationCode = `CONF-${orderId.substring(0, 8).toUpperCase()}`;
    
    let htmlContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Confirmation Code:</strong> ${confirmationCode}</p>
    <p><strong>Order Total:</strong> ${order?.currency || "USD"} ${order?.total || "N/A"}</p>
    <h3>Shipping Details</h3>
    <p><strong>Name:</strong> ${order?.shippingName || "N/A"}</p>
    <p><strong>Address:</strong> ${order?.shippingAddress || "N/A"}</p>
    <p><strong>Phone:</strong> ${order?.shippingMobile || "N/A"}</p>
    `;

    if (order?.items && order.items.length > 0) {
      htmlContent += "<h3>Order Items</h3><ul>";
      for (const item of order.items) {
        htmlContent += `<li>${item.product.name} x ${item.quantity} = ${order.currency} ${(item.quantity * item.unitPrice).toFixed(2)}</li>`;
      }
      htmlContent += "</ul>";
    }

    htmlContent += `<p>You will receive a shipping notification once your order is dispatched.</p>`;

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || "no-reply@ecom.local",
      to,
      subject: `Order ${orderId} Confirmation`,
      text: `Thank you for your order ${orderId}. Confirmation code: ${confirmationCode}`,
      html: htmlContent
    });

    return { messageId: info.messageId, confirmationCode };
  } catch (err) {
    console.error("Email send error:", err);
    throw err;
  }
};

export const sendShippingNotification = async (to: string, orderId: string, trackingNumber?: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || "no-reply@ecom.local",
      to,
      subject: `Your order ${orderId} has shipped!`,
      html: `
      <h2>Order Shipped</h2>
      <p>Your order ${orderId} has been shipped!</p>
      ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ""}
      <p>Thank you for shopping with us.</p>
      `
    });

    return { messageId: info.messageId };
  } catch (err) {
    console.error("Email send error:", err);
    throw err;
  }
};

export const sendCancellationEmail = async (to: string, orderId: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || "no-reply@ecom.local",
      to,
      subject: `Order ${orderId} Cancelled`,
      html: `
      <h2>Order Cancelled</h2>
      <p>Your order ${orderId} has been cancelled.</p>
      <p>If you have any questions, please contact our support team.</p>
      `
    });

    return { messageId: info.messageId };
  } catch (err) {
    console.error("Email send error:", err);
    throw err;
  }
};