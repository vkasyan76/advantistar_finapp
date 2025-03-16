"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import TradeDataGrid from "@/components/stocks/trade-data-grid";
import ModelSummaryGrid from "@/components/stocks/model-summary-grid";
import { Select } from "@/components/select";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

// import TickersUploader from "@/components/stocks/tickers_uploader";

export default function StockModelsPage() {
  const [ticker, setTicker] = useState("");
  const [modelData, setModelData] = useState<any>(null);

  // Fetch tickers from Convex using the new API pattern
  const tickers = useQuery(api.stocks.getTickers) || [];

  // Loading state for tickers
  const isLoadingTickers = tickers === undefined;

  const handleFetchData = async () => {
    if (!ticker) return;
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
        <Select
          options={tickers}
          value={ticker}
          onChange={setTicker}
          onCreate={(value) => setTicker(value)} // Allow user input if needed
          placeholder="Select or type a ticker..."
          disabled={isLoadingTickers} // Disable select while loading
        />
        <Button
          className="bg-blue-500 text-white p-2"
          onClick={handleFetchData}
        >
          Fetch Data
        </Button>
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
