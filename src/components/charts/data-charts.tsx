"use client";

import { useQuery } from "convex/react"; // Use Convex query hook
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Chart, ChartLoading } from "./chart";
import { SpendingPie, SpendingPieLoading } from "./spending-pie";
import { useSearchParams } from "next/navigation";

export const DataCharts = () => {
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const accountId = (params.get("accountId") as Id<"accounts">) || undefined;
  const data = useQuery(api.summary.getSummary, { from, to, accountId }); // Provide an empty object for optional parameters

  // console.log("data.days", data?.days); // Log data.days to console
  // console.log("data.categories", data?.categories); // Log data.categories to console

  // if (!data) {
  //   return <div>Loading...</div>; // Handle loading state properly
  // }

  if (data === undefined) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data.days ?? []} />
        {/* Ensure data.days is not undefined */}
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data.categories ?? []} />
      </div>
    </div>
  );
};
