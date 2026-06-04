// lib/pesapal.ts

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function getPesapalToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch(
    `${import.meta.env.PESAPAL_BASE_URL}/api/Auth/RequestToken`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consumer_key: import.meta.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: import.meta.env.PESAPAL_CONSUMER_SECRET,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Pesapal auth failed (${response.status}): ${JSON.stringify(data)}`
    );
  }

  if (!data.token) {
    throw new Error(
      `Pesapal returned no token. Full response: ${JSON.stringify(data)}`
    );
  }

  cachedToken = data.token;
  tokenExpiry = Date.now() + 4.5 * 60 * 1000;

  return cachedToken;
}

export async function getAuthHeader() {
  const token = await getPesapalToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}