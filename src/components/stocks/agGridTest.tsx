"use client";

import React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register row model
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Import the AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface AgGridTestProps {
  rowData: {
    Date: string;
    BuyPrice: string;
    SellPrice: string;
    Profit: string;
  }[];
}

export default function AgGridTest({ rowData }: AgGridTestProps) {
  // Define columns explicitly
  const columnDefs: ColDef[] = [
    { headerName: "Date", field: "Date" },
    { headerName: "Buy Price", field: "BuyPrice" },
    { headerName: "Sell Price", field: "SellPrice" },
    { headerName: "Profit", field: "Profit" },
  ];

  if (!rowData || rowData.length === 0) {
    return <p>No Trade Data</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Trade Data</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, minWidth: 100 }}
        />
      </div>
    </div>
  );
}
