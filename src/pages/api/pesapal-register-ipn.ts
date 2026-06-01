// pages/api/pesapal-get-ipns.ts  (temporary debug route — delete after use)
import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const GET: APIRoute = async () => {
  const headers = await getAuthHeader();

  const response = await fetch(
    `${import.meta.env.PESAPAL_BASE_URL}/api/URLSetup/GetIpnList`,
    { method: "GET", headers }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};