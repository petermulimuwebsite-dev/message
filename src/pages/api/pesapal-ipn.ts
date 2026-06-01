import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  console.log("PESAPAL IPN RECEIVED");
  console.log(body);

  return new Response(
    JSON.stringify({
      status: "received"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      status: "ok"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};