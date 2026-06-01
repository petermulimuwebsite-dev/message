import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = body;

    console.log("[Pesapal IPN]", { OrderTrackingId, OrderMerchantReference, OrderNotificationType });

    if (OrderTrackingId) {
      // Verify the transaction with Pesapal
      const headers = await getAuthHeader();

      const statusResponse = await fetch(
        `${import.meta.env.PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
        { method: "GET", headers }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log("[Pesapal IPN] Transaction status:", statusData);

        // TODO: Update your database here based on statusData.payment_status_description
        // e.g. if (statusData.payment_status_description === "Completed") { markDonationPaid(OrderMerchantReference) }
      }
    }

    return new Response(JSON.stringify({ orderNotificationType: OrderNotificationType, orderTrackingId: OrderTrackingId, orderMerchantReference: OrderMerchantReference, status: "200" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Pesapal IPN Error]", error);
    return new Response(JSON.stringify({ status: "200" }), {
      status: 200, // Always 200 to Pesapal even on internal errors
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};