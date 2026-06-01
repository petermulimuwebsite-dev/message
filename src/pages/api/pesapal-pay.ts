import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.amount || isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid amount" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers = await getAuthHeader();
    const orderId = "DONATION-" + Date.now();

    // Use the registered IPN ID from .env
    const notificationId = import.meta.env.PESAPAL_IPN_ID;
    if (!notificationId) {
      throw new Error(
        "PESAPAL_IPN_ID not set. Visit /api/pesapal-register-ipn to register your IPN URL first."
      );
    }

    const response = await fetch(
      `${import.meta.env.PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          id: orderId,
          currency: "KES",
          amount: Number(body.amount),
          description: body.description || "Church Donation",
          callback_url: `${import.meta.env.SITE_URL}/api/pesapal-callback`,
          notification_id: notificationId,
          billing_address: {
            email_address: body.email || "",
            phone_number: body.phone || "",
            first_name: body.name?.split(" ")[0] || "Donor",
            last_name: body.name?.split(" ").slice(1).join(" ") || "",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Pesapal order failed: ${errText}`);
    }

    const data = await response.json();

    // data.redirect_url is the Pesapal hosted payment page
    return new Response(JSON.stringify({ success: true, ...data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Payment creation failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};