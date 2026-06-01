import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const orderTrackingId =
    url.searchParams.get("OrderTrackingId");

  const orderMerchantReference =
    url.searchParams.get("OrderMerchantReference");

  return new Response(
    JSON.stringify({
      success: true,
      orderTrackingId,
      orderMerchantReference
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};