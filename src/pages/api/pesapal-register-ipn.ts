// pages/api/pesapal-register-ipn.ts
// Call this ONCE to get your notification_id, then store it in .env

import type { APIRoute } from "astro";
import { getAuthHeader } from "../../lib/pesapal";

export const GET: APIRoute = async () => {
  try {
    const headers = await getAuthHeader();

    const response = await fetch(
      `${import.meta.env.PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          url: `${import.meta.env.SITE_URL}/api/pesapal-ipn`,
          ipn_notification_type: "POST",
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`IPN registration failed: ${err}`);
    }

    const data = await response.json();

    // data.ipn_id is what you store as PESAPAL_IPN_ID in .env
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "IPN registration failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};