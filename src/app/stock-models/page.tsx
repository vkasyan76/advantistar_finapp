"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import TradeDataGrid from "@/components/stocks/trade-data-grid";
import ModelSummaryGrid from "@/components/stocks/model-summary-grid";

// import TickersUploader from "@/components/stocks/tickers_uploader";

export default function StockModelsPage() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || ""; // Get ticker from URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modelData, setModelData] = useState<any>(null);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      try {
        const result = await getStockModel(ticker);
        console.log("Fetched model data:", result);
        setModelData(result); //
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
                future_prediction: modelData?.future_prediction ?? "",
                latest_closing_price: modelData?.latest_closing_price ?? "",
                mape: modelData?.mape ?? "",
                correlation_coefficient:
                  modelData?.correlation_coefficient ?? "",
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
