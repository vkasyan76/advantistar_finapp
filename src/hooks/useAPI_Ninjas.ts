import axios from "axios";

const NINJAS_API_Key = process.env.NEXT_PUBLIC_API_NINJAS;

export const fetchLogo = async (ticker = "AAPL") => {
  const options = {
    method: "GET",
    url: `https://api.api-ninjas.com/v1/logo?ticker=${ticker}`,
    headers: {
      "X-Api-Key": NINJAS_API_Key,
    },
  };
  try {
    const response = await axios.request(options);
    if (response.status !== 200) {
      console.error(
        `Error fetching data for ${ticker}: HTTP ${response.status} - ${response.statusText}`
      );
      return null;
    }

    console.log("Logo API response:", response.data);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching Logo for ${ticker}:`, error.message);
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    return null;
  }
};
