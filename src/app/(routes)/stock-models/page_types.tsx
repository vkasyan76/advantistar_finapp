"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import TradeDataGrid from "@/components/stocks/trade-data-grid";
import ModelSummaryGrid from "@/components/stocks/model-summary-grid";

// import TickersUploader from "@/components/stocks/tickers_uploader";

interface CombinedData {
  Date: string;
  Actual_Price: number;
  Predicted_Price: number;
}

interface TradeData {
  Date: string;
  BuyPrice: number;
  SellPrice: number;
  Profit: number;
}

interface ModelData {
  future_prediction: number;
  latest_closing_price: number;
  mape: number;
  correlation_coefficient: number;
  combined_data: CombinedData[]; // Adjust based on actual data structure
  trade_data: TradeData[]; // Adjust based on actual data structure
}

export default function StockModelsPage() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || ""; // Get ticker from URL
  const [modelData, setModelData] = useState<ModelData>({
    combined_data: [],
    future_prediction: 0, // Ensure numbers, not strings
    latest_closing_price: 0,
    mape: 0,
    correlation_coefficient: 0,
    trade_data: [],
  });

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      try {
        const result = await getStockModel(ticker);
        console.log("Fetched model data:", result);
        setModelData(result as ModelData); // ✅ Force TypeScript to accept the API response
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [ticker]); // Re-fetch when ticker changes

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      {ticker ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <StockCharts chartData={modelData?.combined_data} />
            <ModelSummaryGrid
              summaryData={{
                future_prediction: modelData?.future_prediction ?? 0,
                latest_closing_price: modelData?.latest_closing_price ?? 0,
                mape: modelData?.mape ?? 0,
                correlation_coefficient:
                  modelData?.correlation_coefficient ?? 0,
              }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <TradeDataGrid rowData={modelData?.trade_data} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Select a stock ticker to view data.
        </p>
      )}
    </div>
  );
}
