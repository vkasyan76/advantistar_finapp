"use client";

import { useState } from "react";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import TradeDataGrid from "@/components/stocks/trade-data-grid";
import ModelSummaryGrid from "@/components/stocks/model-summary-grid";
// import TickersUploader from "@/components/stocks/tickers_uploader";

export default function StockModelsPage() {
  const [ticker, setTicker] = useState("");
  const [modelData, setModelData] = useState<any>(null);

  const handleFetchData = async () => {
    try {
      const result = await getStockModel(ticker);
      console.log("Fetched model data:", result);
      setModelData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      {/* Input for Stock Ticker */}
      <div className="my-4">
        <input
          className="border p-2 mr-2"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker..."
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleFetchData}
        >
          Fetch Data
        </button>
      </div>

      {/* If we have data, render the chart and the table */}
      {modelData && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <StockCharts chartData={modelData.combined_data} />
            <ModelSummaryGrid
              summaryData={{
                future_prediction: modelData.future_prediction,
                latest_closing_price: modelData.latest_closing_price,
                mape: modelData.mape,
                correlation_coefficient: modelData.correlation_coefficient,
              }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <TradeDataGrid rowData={modelData.trade_data} />
          </div>
        </div>
      )}
      {/* <TickersUploader /> */}
    </div>
  );
}
