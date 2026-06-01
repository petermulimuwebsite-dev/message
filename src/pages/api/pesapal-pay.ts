import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const headers = await getAuthHeader();

    const orderId =
      "DONATION-" + Date.now();

    const response = await fetch(
      `${import.meta.env.PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          id: orderId,

          currency: "KES",

          amount: body.amount,

          description:
            body.description || "Church Donation",

          callback_url:
            `${import.meta.env.SITE_URL}/api/pesapal-callback`,

          notification_id:
            body.notification_id,

          billing_address: {
            email_address:
              body.email || "",

            phone_number:
              body.phone || "",

            first_name:
              body.name || "Donor"
          }
        })
      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment creation failed"
      }),
      {
        status: 500
      }
    );
  }
};