"use client"; // We must use a client component for AG Grid in Next.js 13

import React from "react";

// AG Grid imports
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required row model for AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function AgGridTest() {
  // Simple row data to verify table rendering
  const rowData = [
    {
      Date: "2025-01-01",
      BuyPrice: "100.00",
      SellPrice: "105.00",
      Profit: "5.00",
    },
    {
      Date: "2025-01-02",
      BuyPrice: "106.00",
      SellPrice: "108.00",
      Profit: "2.00",
    },
    {
      Date: "2025-01-03",
      BuyPrice: "109.50",
      SellPrice: "0.00",
      Profit: "-109.50",
    },
  ];

  // Column definitions for these four fields
  const columnDefs: ColDef[] = [
    { headerName: "Date", field: "Date" },
    { headerName: "Buy Price", field: "BuyPrice" },
    { headerName: "Sell Price", field: "SellPrice" },
    { headerName: "Profit", field: "Profit" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, minWidth: 100 }}
      />
    </div>
  );
}
