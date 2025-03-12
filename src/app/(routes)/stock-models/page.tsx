"use client";

import React, { useState } from "react";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import AgGridTest from "@/components/stocks/agGridTest";

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
      <h1 className="text-2xl font-bold mb-4">Welcome, Valentyn!</h1>
      <p>This is your AI Assisted Financial Reporting Area</p>

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
        <div className="space-y-8">
          {/* Pass combined_data to StockCharts */}
          <StockCharts chartData={modelData.combined_data} />

          {/* Pass trade_data to AgGridTest */}
          <AgGridTest rowData={modelData.trade_data} />
        </div>
      )}
    </div>
  );
}
