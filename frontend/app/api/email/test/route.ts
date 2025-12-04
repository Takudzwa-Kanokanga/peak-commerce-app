// app/api/email/test/route.ts
/**
 * Test endpoint for Mailtrap connection
 * POST /api/email/test - Test connection and send test email
 */

import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { testMailtrapConnection, sendOrderConfirmationEmail, type OrderConfirmationEmailData } from "@/lib/mailtrap"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    // Allow admins or specific test users to test email
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { testEmail, testType = "connection" } = body

    if (testType === "connection") {
      // Test Mailtrap connection
      const connected = await testMailtrapConnection()

      return NextResponse.json({
        success: true,
        message: "Connection test completed",
        connected,
      })
    }

    if (testType === "email" && testEmail) {
      // Send a test email
      const testData: OrderConfirmationEmailData = {
        orderId: "TEST-" + Date.now(),
        customerEmail: testEmail,
        customerName: "Test Customer",
        items: [
          {
            id: 1,
            name: "Sample Product",
            price: 1000,
            quantity: 2,
          },
        ],
        shippingInfo: {
          firstName: "Test",
          lastName: "Customer",
          email: testEmail,
          phone: "+263771234567",
          address: "123 Test Street",
          city: "Harare",
          postalCode: "1000",
          country: "Zimbabwe",
        },
        total: 2000,
        paymentMethod: "stripe",
        createdAt: new Date().toISOString(),
      }

      const sent = await sendOrderConfirmationEmail(testData)

      return NextResponse.json({
        success: sent,
        message: sent ? "Test email sent successfully" : "Failed to send test email",
        testEmail,
      })
    }

    return NextResponse.json(
      { success: false, error: "Invalid test type or missing testEmail" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Error in email test endpoint:", error)
    return NextResponse.json(
      { success: false, error: "Failed to run email test" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Test connection on GET request
    const connected = await testMailtrapConnection()

    return NextResponse.json({
      success: true,
      message: "Mailtrap connection status",
      connected,
      credentials: {
        host: process.env.MAILTRAP_HOST || "Not set",
        port: process.env.MAILTRAP_PORT || "Not set",
        userConfigured: !!process.env.MAILTRAP_USER,
        passConfigured: !!process.env.MAILTRAP_PASS,
        fromEmail: process.env.MAILTRAP_FROM_EMAIL || "Not set",
        adminEmail: process.env.ADMIN_EMAIL || "Not set",
      },
    })
  } catch (error) {
    console.error("Error checking email configuration:", error)
    return NextResponse.json(
      { success: false, error: "Failed to check configuration" },
      { status: 500 }
    )
  }
}
