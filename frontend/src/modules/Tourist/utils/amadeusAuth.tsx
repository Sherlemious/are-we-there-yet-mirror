import axios from "axios";

export const getAmadeusToken = async () => {
  const API_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const CLIENT_ID = import.meta.env.VITE_AMADEUS_API_KEY;
  const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch Amadeus token:", error);
    throw new Error("Authorization failed");
  }
};
