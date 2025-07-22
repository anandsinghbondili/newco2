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
import { Button } from "@/components/ui/button";
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
    Settings,
    Menu,
    RefreshCcw,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/app/hooks/use-media-query";

interface SmartGridProps<T> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    title?: string;
    pageSize?: number;
    enableColumnResizing?: boolean;
    enableColumnReordering?: boolean;
    enableColumnPinning?: boolean;
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enablePagination?: boolean;
    enableExport?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    height?: string;
    width?: string;
    className?: string;
    onRowDoubleClick?: (record: T) => void;
    onRefresh?: () => void;
}

export function SmartGrid<T>({
    columns,
    data,
    title = "",
    pageSize = 10,
    enableColumnResizing = true,
    enableColumnReordering = true,
    enableColumnPinning = true,
    enableRowSelection = true,
    enableMultiRowSelection = true,
    enablePagination = true,
    enableExport = true,
    enableFilters = false, // Disabled by default since filtering not working properly
    enableSorting = true,
    striped = true,
    bordered = true,
    hoverable = true,
    height = "100%",
    width = "100%",
    className = "",
    onRowDoubleClick,
    onRefresh,
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
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(v) => row.toggleSelected(!!v)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
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
    const [columnResizeMode, setColumnResizeMode] = React.useState<ColumnResizeMode>("onChange");
    const [globalFilter, setGlobalFilter] = React.useState("");

    /* ------------------------------------------------------------------ */
    /* Settings state                                                     */
    /* ------------------------------------------------------------------ */
    const [settings, setSettings] = React.useState({
        enableSorting,
        enableFilters,
        enableSearch: enableFilters, // Search is part of filters
    });

    // Update table settings when props change
    React.useEffect(() => {
        setSettings({
            enableSorting,
            enableFilters,
            enableSearch: enableFilters,
        });
    }, [enableSorting, enableFilters]);

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
            globalFilter: settings.enableSearch ? globalFilter : undefined,
        },
        onSortingChange: settings.enableSorting ? setSorting : undefined,
        onColumnFiltersChange: settings.enableFilters ? setColumnFilters : undefined,
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onColumnPinningChange: setColumnPinning,
        onGlobalFilterChange: settings.enableSearch ? setGlobalFilter : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: settings.enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getFilteredRowModel: settings.enableFilters ? getFilteredRowModel() : undefined,
        enableRowSelection,
        enableMultiRowSelection,
        columnResizeMode,
        enableFilters: settings.enableFilters,
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

    const resetFilters = () => {
        table.resetColumnFilters();
        setGlobalFilter("");
    };
    const resetSorting = () => table.resetSorting();
    const resetAll = () => {
        resetFilters();
        resetSorting();
        table.resetColumnOrder();
        table.resetColumnVisibility();
        table.resetColumnPinning();
    };

    /* ------------------------------------------------------------------ */
    /* UI                                                                 */
    /* ------------------------------------------------------------------ */
    return (
        <div className={cn("flex flex-col h-full w-full", className)} style={{ width, height }}>
            {/* Header ------------------------------------------------------ */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2">
                <h2 className="text-lg md:text-xl font-semibold truncate">{title}</h2>

                <div className="flex flex-wrap gap-2">
                    {/* Add this refresh button */}
                    {onRefresh && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRefresh}
                            className="h-8"
                        >
                            {isMobile ? (
                                <RefreshCcw className="h-4 w-4" />
                            ) : (
                                <>
                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                    Refresh
                                </>
                            )}
                        </Button>
                    )}
                    {/* Search */}
                    {settings.enableFilters && settings.enableSearch && (
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

                    {/* Settings menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                {isMobile ? <Menu className="h-4 w-4" /> : (<><Settings className="h-4 w-4 mr-2" />Settings</>)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel>Table Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* Add these new settings controls */}
                            <DropdownMenuCheckboxItem
                                checked={settings.enableSorting}
                                onCheckedChange={(v) => setSettings({ ...settings, enableSorting: v })}
                            >
                                Enable Sorting
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={settings.enableFilters}
                                onCheckedChange={(v) => {
                                    setSettings({
                                        ...settings,
                                        enableFilters: v,
                                        enableSearch: v // Search should follow filters state
                                    });
                                    if (!v) {
                                        resetFilters(); // Clear filters when disabling
                                    }
                                }}
                            >
                                Enable Filters
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={settings.enableSearch}
                                onCheckedChange={(v) => {
                                    setSettings({ ...settings, enableSearch: v });
                                    if (!v) {
                                        setGlobalFilter(""); // Clear search when disabling
                                    }
                                }}
                                disabled={!settings.enableFilters}
                            >
                                Enable Search
                            </DropdownMenuCheckboxItem>
                            {!isMobile && (
                                <>
                                    <DropdownMenuCheckboxItem
                                        checked={enableColumnResizing}
                                        onCheckedChange={(v) => setColumnResizeMode(v ? "onChange" : "onEnd")}
                                    >Column Resizing</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem disabled={!enableColumnReordering}>Column Reordering</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem disabled={!enableColumnPinning}>Column Pinning</DropdownMenuCheckboxItem>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem onClick={resetFilters}>Reset Filters</DropdownMenuItem>
                            <DropdownMenuItem onClick={resetSorting}>Reset Sorting</DropdownMenuItem>
                            <DropdownMenuItem onClick={resetAll}>Reset All</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Column visibility */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                                {isMobile ? <Columns className="h-4 w-4" /> : (<><Columns className="h-4 w-4 mr-2" />Columns</>)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table.getAllColumns().filter((c) => c.getCanHide()).map((col) => (
                                <DropdownMenuCheckboxItem key={col.id} checked={col.getIsVisible()} onCheckedChange={(v) => col.toggleVisibility(!!v)}>
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {enableExport && (
                        <Button variant="outline" size="sm" onClick={exportToExcel} className="h-8">
                            {isMobile ? <Download className="h-4 w-4" /> : (<><Download className="h-4 w-4 mr-2" />Export</>)}
                        </Button>
                    )}
                </div>
            </div>

            {/* Table wrapper ---------------------------------------------- */}
            <div
                className={cn(
                    "flex-1 min-h-[300px] overflow-auto border rounded-lg relative",
                    bordered && "border",
                    striped && "[&_tr:nth-child(even)]:bg-muted/10",
                    hoverable && "[&_tr:hover]:bg-muted/50"
                )}
                style={{ maxHeight: height === "100%" ? undefined : height }}
            >
                <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-sm border-b">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => {
                                    const canSort = enableSorting && header.column.getCanSort();
                                    const sortDir = header.column.getIsSorted();

                                    // Selection column gets fixed styles
                                    if (header.column.id === "__select") {
                                        return (
                                            <TableHead key={header.id} className="sticky left-0 z-20 bg-background w-20 min-w-[33px] max-w-[33px]">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    }

                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                            className={cn(
                                                "relative group px-3 py-2", // 📦 padding
                                                "bg-muted/30",              // 💡 slight background
                                                "text-xs font-semibold uppercase", // 🧑‍🎓 clearer header text
                                                canSort && "cursor-pointer",
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
                                                    {!isMobile && enableColumnReordering && (
                                                        <GripVertical className="w-3 h-3 mr-1 text-muted-foreground cursor-grab" />
                                                    )}
                                                    <span className="truncate">
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </span>
                                                    {canSort && sortDir === "asc" && <ArrowUp className="w-3 h-3 ml-1" />}
                                                    {canSort && sortDir === "desc" && <ArrowDown className="w-3 h-3 ml-1" />}
                                                </div>
                                                {!isMobile && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0"><MoreVertical className="h-3 w-3" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {enableSorting && (
                                                                <>
                                                                    <DropdownMenuItem onClick={() => header.column.toggleSorting(false)}><ArrowUp className="mr-2 h-3.5 w-3.5" />Sort Ascending</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => header.column.toggleSorting(true)}><ArrowDown className="mr-2 h-3.5 w-3.5" />Sort Descending</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => header.column.clearSorting()} disabled={!header.column.getIsSorted()}><List className="mr-2 h-3.5 w-3.5" />Clear Sort</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                </>
                                                            )}
                                                            {enableColumnPinning && (
                                                                <>
                                                                    <DropdownMenuItem onClick={() => header.column.pin("left")} disabled={header.column.getIsPinned() === "left"}>Pin Left</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => header.column.pin("right")} disabled={header.column.getIsPinned() === "right"}>Pin Right</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => header.column.pin(false)} disabled={!header.column.getIsPinned()}>Unpin</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                </>
                                                            )}
                                                            <DropdownMenuItem onClick={() => header.column.toggleVisibility(false)}>Hide Column</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                            {settings.enableFilters && header.column.getCanFilter() && !isMobile && (
                                                <Input
                                                    type="text"
                                                    placeholder="Filter..."
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onClick={(e) => e.stopPropagation()} // 🛠️ This is key
                                                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                    className="mt-2 h-8 w-full rounded-sm bg-white text-sm"
                                                />
                                            )}
                                            {enableColumnResizing && !isMobile && (
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
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onDoubleClick={() => onRowDoubleClick?.(row.original)}
                                    className={cn(
                                        hoverable && "hover:bg-muted/50",
                                        striped && "even:bg-muted/10",
                                        row.getIsSelected() && "bg-primary/10"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === "__select") {
                                            return (
                                                <TableCell key={cell.id} className="sticky left-0 z-20 bg-background w-20 min-w-[33px] max-w-[33px]">
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
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8">
                                        Show {table.getState().pagination.pageSize}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <DropdownMenuItem
                                            key={size}
                                            onClick={() => table.setPageSize(size)}
                                        >
                                            Show {size}
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronFirst className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLast className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default SmartGrid;
