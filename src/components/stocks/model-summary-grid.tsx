"use client";

import React, { useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required module for AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface ModelSummaryGridProps {
  summaryData: {
    future_prediction: string[];
    latest_closing_price: string;
    mape: string;
    correlation_coefficient: string;
  };
}

export default function ModelSummaryGrid({
  summaryData,
}: ModelSummaryGridProps) {
  // Convert the summary object into an array for AG Grid
  const rowData = useMemo(() => {
    return [
      {
        Parameter: "Future Prediction",
        Value: Array.isArray(summaryData.future_prediction)
          ? summaryData.future_prediction.join(", ")
          : summaryData.future_prediction,
      },
      {
        Parameter: "Latest Closing Price",
        Value: summaryData.latest_closing_price,
      },
      {
        Parameter: "MAPE",
        Value: summaryData.mape,
      },
      {
        Parameter: "Correlation Coefficient",
        Value: summaryData.correlation_coefficient,
      },
    ];
  }, [summaryData]);

  const columnDefs: ColDef[] = useMemo(() => {
    return [
      { headerName: "Parameter", field: "Parameter" },
      { headerName: "Value", field: "Value" },
    ];
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Model Summary</h2>
      <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, minWidth: 100 }}
          pinnedBottomRowData={[]}
        />
      </div>
    </div>
  );
}
