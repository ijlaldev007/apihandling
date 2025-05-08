import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

/**
 * Creates a sortable column header
 *
 * @param label The display label for the column
 * @returns A header component for use in a column definition
 */
export function createSortableHeader(label: string) {
  return ({ column }: { column: any }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

/**
 * Creates a formatter cell for currency values
 *
 * @param currency The currency code (default: 'USD')
 * @returns A cell component for use in a column definition
 */
export function createCurrencyCell(currency: string = 'USD') {
  return ({ row, column }: { row: any, column: any }) => {
    const rawValue = row.getValue(column.id);

    // Handle null or undefined values
    if (rawValue === null || rawValue === undefined) {
      return <div className="text-right font-medium">-</div>;
    }

    // Parse the value and format it
    const value = parseFloat(rawValue);

    // Check if value is NaN
    if (isNaN(value)) {
      return <div className="text-right font-medium">-</div>;
    }

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);

    return <div className="text-right font-medium">{formatted}</div>;
  };
}

/**
 * Creates a formatter cell for numeric values
 *
 * @param decimals Number of decimal places (default: 0)
 * @returns A cell component for use in a column definition
 */
export function createNumberCell(decimals: number = 0) {
  return ({ row, column }: { row: any, column: any }) => {
    const rawValue = row.getValue(column.id);

    // Handle null or undefined values
    if (rawValue === null || rawValue === undefined) {
      return <div className="text-center">-</div>;
    }

    // Parse the value and format it
    const value = parseFloat(rawValue);

    // Check if value is NaN
    if (isNaN(value)) {
      return <div className="text-center">-</div>;
    }

    return <div className="text-center">{value.toFixed(decimals)}</div>;
  };
}

/**
 * Creates a basic column definition with a sortable header
 *
 * @param accessorKey The key to access the data
 * @param header The header label or component
 * @param cellRenderer Optional custom cell renderer
 * @returns A column definition
 */
export function createColumn<T>(
  accessorKey: keyof T,
  header: string | (({ column }: { column: any }) => React.ReactNode),
  cellRenderer?: ({ row }: { row: any }) => React.ReactNode
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: typeof header === 'string' ? createSortableHeader(header) : header,
    cell: cellRenderer,
  };
}
