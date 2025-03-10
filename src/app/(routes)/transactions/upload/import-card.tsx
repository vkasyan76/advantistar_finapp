"use client";

// import { useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportTable } from "./import-table";
import { useState } from "react";
import { parse, isValid } from "date-fns";
import { toast } from "sonner";
import { detectDateFormat } from "@/lib/utils";

// const dateFormat = "yyyy-MM-dd HH:mm:ss";
// const dateFormat = "dd/MM/yyyy HH:mm";
// const outputFormat = "yyyy-MM-dd";

// Fix for Parsing Dates in File Upload
// const locale = navigator.language || "en-US";
// const inputFormat =
//   locale.startsWith("en-GB") || locale.startsWith("de")
//     ? "dd/MM/yyyy HH:mm"
//     : "MM/dd/yyyy HH:mm";

const requiredOptions = ["amount", "date", "payee"];

// This is like a notebook where we write down which column is what. selectedColumns is an object where the keys are strings and values are either strings or null
interface SelectedColumnsState {
  [key: string]: string | null;
}

interface Props {
  data: string[][];
  onCancel: () => void;
  /* eslint-disable-next-line */
  onSubmit: (data: any) => void;
}

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  // Function to track column selection progress - for continue button. .filter(Boolean) removes all falsy values (null, undefined, false, "", 0).
  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    // Map headers: for each header, pick the mapped field from selectedColumns.
    const mappedHeaders = headers.map((_, index) => {
      return selectedColumns[`column_${index}`] || null;
    });

    // Map the body rows: for each row, keep the cell value only if the corresponding header mapping is set.
    const mappedBody = body.map((row) => {
      return row.map((cell, index) => {
        return selectedColumns[`column_${index}`] ? cell : null;
      });
    });

    // Reduce each row into an object based on the mapped headers.
    const arrayOfData = mappedBody.map((row) =>
      row.reduce((acc: Record<string, string>, cell, index) => {
        const header = mappedHeaders[index];
        if (header !== null && cell !== null && cell.trim() !== "") {
          acc[header] = cell;
        }
        return acc;
      }, {})
    );

    // Filter out rows that are completely empty.
    const validArrayOfData = arrayOfData.filter(
      (row) => Object.keys(row).length > 0
    );

    console.log("Raw mapped data:", validArrayOfData);

    // Validate that each required field is present.
    for (const [i, item] of validArrayOfData.entries()) {
      for (const key of requiredOptions) {
        if (!item[key]) {
          console.error(`Row ${i} is missing required field: ${key}`);
          toast.error(`Row ${i + 1} is missing required field: ${key}`);
          return; // Stop processing if any required field is missing.
        }
      }
    }

    // Transform each object to match the transaction schema.
    const formattedData = validArrayOfData
      .map((item) => {
        // Convert the amount string to a number
        const amount = parseFloat(item.amount);

        // Detect format based on the first date entry
        const formatToUse = detectDateFormat(item.date);
        if (!formatToUse) {
          console.error("Unrecognized date format:", item.date);
          toast.error(`Invalid date format: ${item.date}`);
          return null; // Skip invalid rows
        }

        // Parse the date string using the detected format
        const parsedDate = parse(item.date, formatToUse, new Date());

        // Ensure the parsed date is valid
        if (!isValid(parsedDate)) {
          console.error("Invalid date detected:", item.date);
          toast.error(`Invalid date: ${item.date}`);
          return null; // Skip invalid rows
        }

        return {
          ...item,
          amount,
          date: parsedDate.getTime(),
        };
      })
      .filter(Boolean); // Remove invalid entries

    console.log("Formatted data:", formattedData);

    onSubmit(formattedData);
  };

  // method for setting selected columns in the table head:
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    // Creates a copy of the previous selected columns state.
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      // Reset the previous selection if the same value was chosen elsewhere
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      // If "skip" is selected, set the value to null
      if (value === "skip") {
        value = null;
      }

      // Assign the selected value to the respective column.  stores the selected column for each index dynamically
      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  return (
    <Card className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Import Transaction
        </CardTitle>
        <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
          <Button onClick={onCancel} size="sm" className="w-full lg:w-auto">
            Cancel
          </Button>
          {/* Continue Button */}
          <Button
            size="sm"
            disabled={progress < requiredOptions.length} // Disabled if not all required fields are selected
            // onClick={() => onSubmit(selectedColumns)}
            onClick={handleContinue}
            className="w-full lg:w-auto"
          >
            Continue ({progress}/{requiredOptions.length})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ImportTable
          headers={headers}
          body={body}
          selectedColumns={selectedColumns}
          onTableHeadSelectChange={onTableHeadSelectChange}
        />
      </CardContent>
    </Card>
  );
};
