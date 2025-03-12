import axios from "axios";

// Point to your local FastAPI endpoint
const API_URL = "http://127.0.0.1:8000/stock-models/";

export async function getStockModel(ticker: string) {
  try {
    // POST to the local endpoint with a JSON body containing the ticker
    const response = await axios.post(API_URL, { stock_ticker: ticker });
    return response.data; // This is the JSON returned by train_and_predict
  } catch (error) {
    console.error("Error fetching stock model data:", error);
    throw error;
  }
}
