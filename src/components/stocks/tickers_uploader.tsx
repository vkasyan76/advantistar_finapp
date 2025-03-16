"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

interface TickerInfo {
  Name: string;
  indexTicker: string;
  industryTicker: string;
}

export default function TickersUploader() {
  const [error, setError] = useState<string | null>(null);

  // Use the bulk insert mutation from `stocks.ts`
  const bulkMutation = useMutation(api.stocks.insertTickers);

  const handleBulkInsert = async () => {
    try {
      // 1) Fetch the JSON from public/tickers_index.json at runtime
      const res = await fetch("/tickers_index.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // 2) Convert the object to an array of { ticker, Name, indexTicker, industryTicker }
      const tickersObject = (await res.json()) as Record<string, TickerInfo>;
      const tickersArray = Object.entries(tickersObject).map(
        ([ticker, info]) => ({
          ticker,
          Name: info.Name,
          indexTicker: info.indexTicker,
          industryTicker: info.industryTicker,
        })
      );

      // 3) Call the Convex bulk mutation
      const result = await bulkMutation({ tickers: tickersArray });
      console.log("Bulk insert result:", result);
    } catch (err) {
      console.error(err);
      setError(String(err));
    }
  };

  return (
    <div>
      <button onClick={handleBulkInsert}>Insert All Tickers</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
