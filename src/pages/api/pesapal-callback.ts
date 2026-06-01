import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const GET: APIRoute = async ({ url, redirect }) => {
  const orderTrackingId = url.searchParams.get("OrderTrackingId");
  const orderMerchantReference = url.searchParams.get("OrderMerchantReference");

  if (!orderTrackingId) {
    return redirect("/payment-failed?reason=missing_tracking_id");
  }

  try {
    // Query Pesapal for the real transaction status
    const headers = await getAuthHeader();

    const statusResponse = await fetch(
      `${import.meta.env.PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      { method: "GET", headers }
    );

    if (!statusResponse.ok) {
      throw new Error("Could not verify transaction status");
    }

    const statusData = await statusResponse.json();

    // payment_status_description: "Completed" | "Failed" | "Reversed" | "Pending"
    const status = statusData.payment_status_description?.toLowerCase();

    if (status === "completed") {
      return redirect(
        `/payment-success?ref=${orderMerchantReference}&tracking=${orderTrackingId}`
      );
    } else if (status === "failed" || status === "reversed") {
      return redirect(`/payment-failed?ref=${orderMerchantReference}&status=${status}`);
    } else {
      // Pending — payment may still process via IPN
      return redirect(
        `/payment-pending?ref=${orderMerchantReference}&tracking=${orderTrackingId}`
      );
    }
  } catch (error) {
    return redirect("/payment-failed?reason=verification_error");
  }
};