import type { APIRoute } from "astro";
import { getPesapalToken } from "../../lib/pesapal";

export const GET: APIRoute = async () => {
  try {
    const token = await getPesapalToken();

    return new Response(
      JSON.stringify(token),
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
        message: error instanceof Error ? error.message : "Authentication failed"
      }),
      {
        status: 500
      }
    );
  }
};