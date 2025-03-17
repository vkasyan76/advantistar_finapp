"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStockModel } from "@/api/stock-models";
import StockCharts from "@/components/stocks/stock-charts";
import TradeDataGrid from "@/components/stocks/trade-data-grid";
// import ModelSummaryGrid from "@/components/stocks/model-summary-grid";

import { FaChartLine, FaPercentage, FaProjectDiagram } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { StockDataCard } from "@/components/stocks/stocks-data-card";

// import TickersUploader from "@/components/stocks/tickers_uploader";

export default function StockModelsPage() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || ""; // Get ticker from URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!ticker) {
      setLoading(false);
      setModelData(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getStockModel(ticker);
        console.log("Fetched model data:", result);
        setModelData(result); //
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]); // Re-fetch when ticker changes

  // Helper function: Renders "N/A" if no ticker or data is missing.
  // Otherwise, if loading, show a spinner, else show real data.
  const renderValue = (key: string, suffix = ""): JSX.Element | string => {
    if (!ticker) {
      // No ticker => placeholders
      return "N/A";
    }
    if (loading) {
      // Ticker but still loading => spinner
      return <Loader2 className="size-6 text-slate-300 animate-spin" />;
    }
    // Ticker + not loading => actual data from modelData
    const value = modelData?.[key] ?? "N/A";
    return `${value}${suffix}`;
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      {/* Top Summary Cards Always Visible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <StockDataCard
          title="Future Prediction & Latest Price"
          value={`${renderValue("future_prediction")} / ${renderValue("latest_closing_price")}`}
          icon={FaChartLine}
          variant="default"
          dateRange={`Stock: ${ticker || "No ticker selected"}`}
        />
        <StockDataCard
          title="MAPE (Error %)"
          value={renderValue("mape", "%")}
          icon={FaPercentage}
          variant="warning"
          dateRange={`Stock: ${ticker || "No ticker selected"}`}
        />
        <StockDataCard
          title="Correlation Coefficient"
          value={renderValue("correlation_coefficient")}
          icon={FaProjectDiagram}
          variant="success"
          dateRange={`Stock: ${ticker || "No ticker selected"}`}
        />
      </div>

      {/* Show Charts & Table Only if Ticker is present AND not loading */}
      {ticker && !loading && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <StockCharts chartData={modelData?.combined_data ?? []} />
          </div>
          <div className="w-full lg:w-1/2">
            <TradeDataGrid rowData={modelData?.trade_data ?? []} />
          </div>
        </div>
      )}

      {/* Optionally, show an empty message if there's a ticker but no data */}
      {/* if (ticker && !loading && !modelData) {
          return <p>No data available for this ticker.</p>;
      } */}
    </div>
  );
}
