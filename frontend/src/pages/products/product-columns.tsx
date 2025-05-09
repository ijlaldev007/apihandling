import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { createCurrencyCell, createNumberCell } from "@/components/data-table/column-helpers";
import { createActionCell } from "@/components/data-table/action-cell";
import { createSlug } from "@/utils/slug";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

/**
 * Creates column definitions for the products table
 *
 * @returns An array of column definitions for the products table
 */
export function useProductColumns(): ColumnDef<Product>[] {
  const navigate = useNavigate();

  // Create an action cell with product-specific actions
  const ActionCell = createActionCell({
    menuLabel: "Actions",
    actions: [
      {
        label: "Copy product ID",
        onClick: (product: Product) => {
          navigator.clipboard.writeText(product.id.toString());
        },
      },
      {
        label: "View details",
        onClick: (product: Product) => {
          navigate(`/products/${product.slug || createSlug(product.name)}`);
        },
      },
      {
        label: "Add to cart",
        onClick: (product: Product) => {
          // This would be implemented when we add cart functionality
          console.log(`Added ${product.name} to cart`);
        },
        disabled: false, // Could be based on stock
      },
    ],
  });

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: createCurrencyCell()
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("category")}</div>
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: createNumberCell(0)
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: createNumberCell(1)
    },
    {
      id: "actions",
      cell: ActionCell,
    },
  ];
}
