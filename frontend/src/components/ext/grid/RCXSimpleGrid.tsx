// components/ext/grid/SimpleGrid.tsx
// ShadCN-powered DataTable with TanStack Table v8 + a locked checkbox-selection column.

"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnOrderState,
  ColumnPinningState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Download,
  ArrowDown,
  ArrowUp,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Columns,
  RefreshCcw,
  Plus,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import RCXNeuButton from "@/components/ext/buttons/RCXNeuButton";

interface SimpleGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableColumnMenu?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  onAdd?: () => void;
  onDelete?: (selectedRows: TData[]) => void;
  onRefresh?: () => void;
  onExport?: (data: TData[]) => void;
}

export function RCXSimpleGrid<TData>({
  data,
  columns,
  enableSorting = true,
  enableColumnMenu = true,
  enablePagination = true,
  enableRowSelection = true,
  onAdd,
  onDelete,
  onRefresh,
  onExport,
}: SimpleGridProps<TData>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ["select"],
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

  // Add selection column if enabled
  const tableColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    const baseColumns = [...columns];
    if (enableRowSelection) {
      baseColumns.unshift({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false,
      });
    }
    return baseColumns;
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
      rowSelection,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const handleExport = () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    const exportData = selectedRows.length > 0 ? selectedRows : data;

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "export.xlsx");

    if (onExport) onExport(exportData);
  };

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <TooltipProvider>
      <div className="w-full space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {onAdd && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAdd}
                    className="p-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add</TooltipContent>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(selectedRows)}
                    disabled={selectedRows.length === 0}
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Columns button with tooltip */}
            {enableColumnMenu && (
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="p-2">
                        <Columns className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Columns</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {/* Export and Refresh buttons remain unchanged */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="p-2"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export as Excel</TooltipContent>
            </Tooltip>
            {onRefresh && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    className="p-2"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-sm border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn({
                          "sticky left-0 z-10 bg-background":
                            header.column.getIsPinned() === "left",
                        })}
                        style={{
                          width: header.getSize(),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn("flex items-center", {
                              "cursor-pointer select-none":
                                header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ArrowUp className="ml-2 h-4 w-4" />,
                              desc: <ArrowDown className="ml-2 h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(idx % 2 === 1 ? "odd:bg-muted/30" : "")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn({
                          "sticky left-0 z-10 bg-background":
                            cell.column.getIsPinned() === "left",
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {enablePagination && (
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <RCXNeuButton className="h-8 w-8 p-0">
                        {table.getState().pagination.pageSize}
                      </RCXNeuButton>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Records Per Page</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start">
                  {[10, 20, 50, 100].map((size) => (
                    <DropdownMenuCheckboxItem
                      key={size}
                      checked={pageSize === size}
                      onCheckedChange={() => setPageSize(size)}
                    >
                      {size}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
                {/* Page size dropdown as menu */}
              </div>
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
