"use client";

import SmartGrid from "@/components/ext/grid/SmartGrid";
import { ColumnDef } from "@tanstack/react-table";
import { DivisionService } from "@/client/sdk.gen";

/** Shape of one record in Divisions.json */
export interface DivisionRow {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

/* 10 hand‑picked columns */
const cols: ColumnDef<DivisionRow>[] = [
    { accessorKey: "name", header: "Division" },
    { accessorKey: "description", header: "Description" },
    {
        accessorKey: "created_at", header: "Created At",
        cell: ({ getValue }) => (getValue<string>() ? new Date(getValue<string>()).toLocaleDateString() : "")
    },
    {
        accessorKey: "updated_at", header: "Updated At",
        cell: ({ getValue }) => (getValue<string>() ? new Date(getValue<string>()).toLocaleDateString() : "")
    },
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
            onRefresh={() => {
                DivisionService.readDivisions().then((data) => {
                    console.log(data);
                });
            }}
        />
    );
}
