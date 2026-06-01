export async function getPesapalToken() {
  const response = await fetch(
    `${import.meta.env.PESAPAL_BASE_URL}/api/Auth/RequestToken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        consumer_key: import.meta.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: import.meta.env.PESAPAL_CONSUMER_SECRET
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Pesapal token");
  }

  return response.json();
}

export async function getAuthHeader() {
  const tokenData = await getPesapalToken();

  return {
    Authorization: `Bearer ${tokenData.token}`,
    "Content-Type": "application/json"
  };
}