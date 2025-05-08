import * as React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ActionItem {
  label: string;
  onClick: (record: any) => void;
  disabled?: boolean;
}

export interface ActionCellOptions {
  menuLabel?: string;
  actions: ActionItem[];
}

/**
 * Creates an action cell component for use in data tables
 *
 * @param options Configuration options for the action cell
 * @returns A cell component for use in a table column definition
 */
export function createActionCell(options: ActionCellOptions) {
  const ActionCell = ({ row }: { row: any }) => {
    const record = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.menuLabel && <DropdownMenuLabel>{options.menuLabel}</DropdownMenuLabel>}

          {options.actions.map((action, index, array) => (
            <div key={action.label}>
              <DropdownMenuItem
                onClick={() => action.onClick(record)}
                disabled={action.disabled}
              >
                {action.label}
              </DropdownMenuItem>
              {index < array.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return ActionCell;
}
