"use client";

import SmartGrid from "@/components/ext/grid/SmartGrid";
import { ColumnDef } from "@tanstack/react-table";

/** Shape of one record in Divisions.json */
export interface DivisionRow {
    id: number;
    name: string;
    division_code: string;
    division_type: string;
    ledger: string;
    start_date: string | null;
    end_date: string | null;
    operating_unit: string;
    legal_entity: string;
    active_flag: boolean;
}

/* 10 hand‑picked columns */
const cols: ColumnDef<DivisionRow>[] = [
    { accessorKey: "division_code", header: "Code" },
    { accessorKey: "name", header: "Division" },
    { accessorKey: "division_type", header: "Type" },
    { accessorKey: "ledger", header: "Ledger" },
    { accessorKey: "start_date", header: "Start" },
    { accessorKey: "end_date", header: "End" },
    { accessorKey: "operating_unit", header: "Op Unit" },
    { accessorKey: "legal_entity", header: "Legal Entity" },
    {
        accessorKey: "active_flag", header: "Active",
        cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No")
    },
    { accessorKey: "id", header: "ID" },
];

export default function DivisionGrid({
    data,
}: {
    data: DivisionRow[];
    onRowSelect: (id: number | null) => void;
}) {
    return (
        <SmartGrid
            title="Divisions"
            columns={cols}
            data={data}
            enableRowSelection
            className="h-full"
        /* TanStack Table gives us a rowSelection state callback */
        // onRowSelectionChange={(state) => {
        //     const first = Object.keys(state ?? {})[0];
        //     onRowSelect(first ? Number(first.split("_")[0]) : null);
        // }}
        // onRefresh={() => {
        //     DivisionsPage.fetchData();
        // }}
        />
    );
}
