"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { Select } from "@/components/select";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";

export const TickerFilter = () => {
  const router = useRouter();
  //   const pathname = usePathname();
  const params = useSearchParams();

  // Get ticker from the URL for persistence, but manage selection separately
  const urlTicker = params.get("ticker") || "";
  const [selectedTicker, setSelectedTicker] = useState(urlTicker);

  // Fetch tickers from Convex
  const tickers = useQuery(api.stocks.getTickers) || [];
  const isLoadingTickers = tickers === undefined;

  const onChangeTicker = (newValue: string) => {
    setSelectedTicker(newValue); // Update state but NOT the URL yet
  };

  const onFetchData = () => {
    if (!selectedTicker) return;
    const url = new URL(window.location.href);
    url.searchParams.set("ticker", selectedTicker);
    router.push(url.toString()); // Update URL -> Triggers fetch in page.tsx
  };

  return (
    <div className="flex gap-4 items-center">
      <Select
        options={tickers}
        value={selectedTicker}
        onChange={onChangeTicker}
        onCreate={onChangeTicker}
        placeholder="Select or type a ticker..."
        disabled={isLoadingTickers}
      />
      <Button
        className="bg-white text-blue-700 px-4 py-2"
        // onClick={() => onChangeTicker(ticker)}
        // disabled={!ticker}
        onClick={onFetchData} // Now only updates the URL when clicked
        disabled={!selectedTicker}
      >
        Fetch Data
      </Button>
    </div>
  );
};
