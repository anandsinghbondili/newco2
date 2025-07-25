// components/ext/grid/SmartGrid.tsx
// ShadCN‑powered DataTable with TanStack Table v8 + a locked checkbox‑selection column.

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
    ColumnResizeMode,
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

import RCXSecButton from "@/components/ext/buttons/RCXSecButton";
import RCXNeuButton from "@/components/ext/buttons/RCXNeuButton";
import RCXToggle from "@/components/ext/buttons/RCXToggle";
import { Input } from "@/components/ui/input";
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
    Filter,
    GripVertical,
    List,
    MoreVertical,
    RefreshCcw,
    RotateCcw,
    Trash,
    Plus,
    Pencil,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import RCXPriButton from "@/components/ext/buttons/RCXPriButton";

interface SmartGridProps<T> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    title?: string;
    pageSize?: number;
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enablePagination?: boolean;
    enableExport?: boolean;
    height?: string;
    width?: string;
    className?: string;
    onRowDoubleClick?: (record: T) => void;
    onRefresh?: () => void;
    // Add new props for buttons
    onCreate?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (records: T[]) => void;
    canEdit?: boolean;
    canDelete?: boolean;
    toolbarExtra?: React.ReactNode;
    isLoading?: boolean;
}

export function SmartGrid<T>({
    columns,
    data,
    title = "",
    pageSize = 10,
    enableRowSelection = true,
    enableMultiRowSelection = true,
    enablePagination = true,
    enableExport = true,
    height = "100%",
    width = "100%",
    className = "",
    onRowDoubleClick,
    onRefresh,
    onCreate,
    onEdit,
    onDelete,
    canEdit = false,
    canDelete = false,
    toolbarExtra,
    isLoading = false,
}: SmartGridProps<T>) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    /* ------------------------------------------------------------------ */
    /* Selection column (always visible + pinned left)                     */
    /* ------------------------------------------------------------------ */
    const allColumns = React.useMemo(() => {
        const selectionColumn: ColumnDef<T, unknown> = {
            id: "__select",
            size: 60,
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
                    aria-label="Select all"
                    className="translate-y-[2px] border border-gray-400"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(v) => row.toggleSelected(!!v)}
                    aria-label="Select row"
                    className="translate-y-[2px] border border-gray-400"
                />
            ),
            enableHiding: false,
            enableResizing: false,
            meta: { isSelection: true },
        };

        return [selectionColumn, ...columns];
    }, [columns]);

    /* ------------------------------------------------------------------ */
    /* States                                                             */
    /* ------------------------------------------------------------------ */
    const [sorting, setSorting] = React.useState<import("@tanstack/react-table").SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<import("@tanstack/react-table").ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState<import("@tanstack/react-table").RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({ __select: true });
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
    const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({ left: ["__select"] });
    const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [showFilters, setShowFilters] = React.useState(false);

    // keep columnOrder synced with columns prop changes
    React.useEffect(() => {
        setColumnOrder(
            allColumns.map((c, i) => (c.id ? c.id.toString() : `col${i}`)) as ColumnOrderState
        );
    }, [allColumns]);

    // Responsive visibility (never hide selection column)
    React.useEffect(() => {
        if (isMobile) {
            const mobileVisible: VisibilityState = { __select: true };
            columns.forEach((col, i) => {
                if (i < 2) mobileVisible[col.id as string] = true;
            });
            setColumnVisibility(mobileVisible);
        } else {
            const vis: VisibilityState = { __select: true };
            columns.forEach((col) => {
                vis[col.id as string] = true;
            });
            setColumnVisibility(vis);
        }
    }, [isMobile, columns]);

    const table = useReactTable({
        data,
        columns: allColumns,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            columnVisibility,
            columnOrder,
            columnPinning,
            globalFilter: showFilters ? globalFilter : undefined,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: showFilters ? setColumnFilters : undefined,
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onColumnPinningChange: setColumnPinning,
        onGlobalFilterChange: showFilters ? setGlobalFilter : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getFilteredRowModel: showFilters ? getFilteredRowModel() : undefined,
        enableRowSelection,
        enableMultiRowSelection,
        columnResizeMode,
        enableFilters: showFilters,
    });

    React.useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize, table]);

    /* Pin selection column left always */
    React.useEffect(() => {
        if (enableRowSelection) {
            table.getColumn("__select")?.pin("left");
        }
    }, [table, enableRowSelection]);

    /* ------------------------------------------------------------------ */
    /* Export helpers                                                     */
    /* ------------------------------------------------------------------ */
    const exportToExcel = () => {
        const exportData = table.getFilteredRowModel().rows.map((r) => r.original);
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${title || "data"}.xlsx`);
    };

    const resetAll = () => {
        table.resetColumnFilters();
        setGlobalFilter("");
        table.resetSorting();
        table.resetColumnOrder();
        table.resetColumnVisibility();
        table.resetColumnPinning();
    };

    /* ------------------------------------------------------------------ */
    /* UI                                                                 */
    /* ------------------------------------------------------------------ */
    // Compute selected row count for conditional button rendering
    const selectedRowCount = Object.keys(rowSelection).length;
    // Get selected rows' data
    const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
    const selectedRow = selectedRows[0];

    return (
        <div className={cn("flex flex-col h-full w-full", className)} style={{ width, height }}>
            {/* Header ------------------------------------------------------ */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2">
                <div className="flex items-center gap-2 min-h-0">
                    {onCreate && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <RCXPriButton
                                        onClick={onCreate}
                                        className="flex items-center gap-1 py-0.5 px-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </RCXPriButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Create</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {/* Edit button: show only if one row is selected */}
                    {onEdit && selectedRowCount === 1 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <RCXSecButton
                                        onClick={() => onEdit(selectedRow)}
                                        className="flex items-center gap-1 py-0.5 px-2"
                                        disabled={!canEdit}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </RCXSecButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {/* Delete button: show only if one or more rows are selected */}
                    {onDelete && selectedRowCount > 0 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <RCXNeuButton
                                        onClick={() => onDelete(selectedRows)}
                                        className="flex items-center gap-1 py-0.5 px-2 bg-red-500 hover:bg-red-600 text-white border-red-600 hover:border-red-700"
                                        disabled={!canDelete}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </RCXNeuButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {toolbarExtra && (
                        <div className="ml-2 flex items-center gap-1">
                            {toolbarExtra}
                        </div>
                    )}
                </div>
                <h2 className="text-lg md:text-xl font-semibold truncate">{title}</h2>

                <div className="flex flex-wrap gap-2">
                    {/* Search */}
                    {showFilters && (
                        <div className="relative flex-1 min-w-[150px] max-w-[300px]">
                            <Input
                                placeholder="Search..."
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="h-8 w-full"
                            />
                            <Filter className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                        </div>
                    )}

                    {/* Add this refresh button */}
                    {onRefresh && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <RCXSecButton
                                        onClick={onRefresh}
                                        className="h-8 w-8 p-0"
                                    >
                                        <RefreshCcw className="h-4 w-4" />
                                    </RCXSecButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Refresh
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}

                    {/* Reset Button */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <RCXSecButton
                                    onClick={resetAll}
                                    className="h-8 w-8 p-0"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </RCXSecButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                Reset
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* Toggle Filters */}
                    <RCXToggle
                        pressed={showFilters}
                        onPressedChange={setShowFilters}
                        className="h-8 w-8 p-0"
                        tooltip={showFilters ? "Hide Filters" : "Show Filters"}
                    >
                        <Filter className="h-4 w-4" />
                    </RCXToggle>

                    {/* Column visibility */}
                    <DropdownMenu>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <RCXSecButton className="h-8 w-8 p-0">
                                            <Columns className="h-4 w-4" />
                                        </RCXSecButton>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Columns
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenuContent align="end">
                            {table.getAllColumns().filter((c) => c.getCanHide()).map((col) => (
                                <DropdownMenuCheckboxItem key={col.id} checked={col.getIsVisible()} onCheckedChange={(v) => col.toggleVisibility(!!v)}>
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {enableExport && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <RCXNeuButton onClick={exportToExcel} className="h-8 w-8 p-0">
                                        <Download className="h-4 w-4" />
                                    </RCXNeuButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Download as Excel
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>

            {/* Table wrapper ---------------------------------------------- */}
            <div
                className={cn(
                    "flex-1 min-h-[300px] overflow-auto border rounded-sm relative",
                    "border",
                    "[&_tr:nth-child(even)]:bg-[#f3f4f7]",
                    "[&_tr:hover]:bg-muted/50"
                )}
                style={{ maxHeight: height === "100%" ? undefined : height }}
            >
                <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-background shadow-md border-b">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => {
                                    const sortDir = header.column.getIsSorted();

                                    // Selection column gets fixed styles
                                    if (header.column.id === "__select") {
                                        return (
                                            <TableHead key={header.id} className="sticky left-0 bg-primary-foreground w-20 min-w-[33px] max-w-[33px]">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    }

                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className={cn(
                                                "relative group px-3 py-2",
                                                "bg-muted/30",
                                                "text-xs font-semibold uppercase",
                                                "cursor-pointer",
                                                header.column.getIsPinned() && "sticky bg-background",
                                                isMobile && "min-w-[120px]"
                                            )}
                                            style={{
                                                width: header.getSize(),
                                                left: header.column.getIsPinned() === "left" ? `${header.getStart()}px` : undefined,
                                                right: header.column.getIsPinned() === "right" ? `${header.getSize()}px` : undefined,
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 truncate">
                                                    {!isMobile && (
                                                        <GripVertical className="w-3 h-3 mr-1 text-muted-foreground cursor-grab" />
                                                    )}
                                                    <span className="truncate">
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </span>
                                                    {sortDir === "asc" && <ArrowUp className="w-3 h-3 ml-1" />}
                                                    {sortDir === "desc" && <ArrowDown className="w-3 h-3 ml-1" />}
                                                </div>
                                                {!isMobile && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <RCXNeuButton className="h-4 w-4 p-0"><MoreVertical className="h-3 w-3" /></RCXNeuButton>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => header.column.toggleSorting(false)}><ArrowUp className="mr-2 h-3.5 w-3.5" />Sort Ascending</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => header.column.toggleSorting(true)}><ArrowDown className="mr-2 h-3.5 w-3.5" />Sort Descending</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => header.column.clearSorting()} disabled={!header.column.getIsSorted()}><List className="mr-2 h-3.5 w-3.5" />Clear Sort</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => header.column.pin("left")} disabled={header.column.getIsPinned() === "left"}>Pin Left</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => header.column.pin("right")} disabled={header.column.getIsPinned() === "right"}>Pin Right</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => header.column.pin(false)} disabled={!header.column.getIsPinned()}>Unpin</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => header.column.toggleVisibility(false)}>Hide Column</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                            {showFilters && header.column.getCanFilter() && !isMobile && (
                                                <Input
                                                    type="text"
                                                    placeholder="Filter..."
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                    className="mt-2 h-8 w-full rounded-sm bg-white text-sm"
                                                />
                                            )}
                                            {!isMobile && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`absolute right-0 top-0 h-full w-1 bg-border cursor-col-resize select-none touch-none opacity-0 group-hover:opacity-100 ${header.column.getIsResizing() ? "bg-primary opacity-100" : ""}`}
                                                />
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onDoubleClick={() => onRowDoubleClick?.(row.original)}
                                    className={cn(
                                        "hover:bg-muted/50",
                                        row.getIsSelected() && "bg-primary/10"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === "__select") {
                                            return (
                                                <TableCell key={cell.id} className="sticky left-0 bg-background w-20 min-w-[33px] max-w-[33px]">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(cell.column.getIsPinned() && "sticky bg-background", "max-w-[200px] overflow-hidden text-ellipsis")}
                                                style={{
                                                    left: cell.column.getIsPinned() === "left" ? `${cell.column.getStart()}px` : undefined,
                                                    right: cell.column.getIsPinned() === "right" ? `${cell.column.getAfter()}px` : undefined,
                                                }}
                                            >
                                                <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination ----------------------------------------------- */}
            {
                enablePagination && (
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-2">
                        {/* Records count on the left */}
                        <div className="text-sm text-muted-foreground mr-3">
                            <DropdownMenu>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenuTrigger asChild>
                                                <RCXNeuButton className="h-8 w-8 p-0 mr-2">
                                                    {table.getState().pagination.pageSize}
                                                </RCXNeuButton>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            Records per page
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <DropdownMenuContent align="end">
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <DropdownMenuItem
                                            key={size}
                                            onClick={() => table.setPageSize(size)}
                                        >
                                            {size}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            Showing {table.getRowModel().rows.length} of{' '}
                            {table.getFilteredRowModel().rows.length} records
                        </div>


                        {/* Page navigation on the right */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">
                                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm hidden md:inline">Go to:</span>
                                    <Input
                                        type="number"
                                        defaultValue={table.getState().pagination.pageIndex + 1}
                                        onChange={(e) => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                            table.setPageIndex(Math.min(Math.max(page, 0), table.getPageCount() - 1));
                                        }}
                                        className="w-16 h-8"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RCXNeuButton

                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronFirst className="h-4 w-4" />
                                </RCXNeuButton>
                                <RCXNeuButton

                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </RCXNeuButton>
                                <RCXNeuButton

                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </RCXNeuButton>
                                <RCXNeuButton

                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLast className="h-4 w-4" />
                                </RCXNeuButton>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default SmartGrid;
