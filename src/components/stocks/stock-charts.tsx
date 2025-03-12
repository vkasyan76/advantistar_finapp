"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface StockChartsProps {
  chartData: {
    Date: string;
    Actual_Price: number;
    Predicted_Price: number;
  }[];
}

export default function StockCharts({ chartData }: StockChartsProps) {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data to display.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Stock Data Chart</h2>
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Actual_Price"
          stroke="#8884d8"
          name="Actual Price"
        />
        <Line
          type="monotone"
          dataKey="Predicted_Price"
          stroke="#82ca9d"
          name="Predicted Price"
        />
      </LineChart>
    </div>
  );
}
