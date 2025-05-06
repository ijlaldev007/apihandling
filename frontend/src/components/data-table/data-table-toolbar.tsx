import { type Table as TableType } from "@tanstack/react-table";
import { SearchInput } from "@/components/search/SearchInput";

interface DataTableToolbarProps<TData> {
  table: TableType<TData>;
  searchColumn: string;
  // Add new props for server-side search
  onSearch?: (value: string) => void;
  searchValue?: string;
  isServerSide?: boolean;
  isSearching?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  onSearch,
  searchValue = "",
  isServerSide = false,
  isSearching = false,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SearchInput
          placeholder={`Search ${searchColumn}...`}
          value={isServerSide ? searchValue : (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(value) => {
            if (isServerSide && onSearch) {
              // Use server-side search
              onSearch(value);
            } else {
              // Use client-side filtering
              table.getColumn(searchColumn)?.setFilterValue(value);
            }
          }}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
}
