"use client";

import { useEffect, useState } from "react";
import ExtendedGrid from "@/components/ext/grid/ExtendedGrid";
import { ColumnDef } from "@tanstack/react-table";
import { Panel } from "@/components/ext/containers/Panel";
import { showCustomToast, showSuccessToast } from "@/components/ext/window/Toaster";

interface Deal {
    deal_number: string;
    deal_name: string;
    deal_type: string;
    vendor_name: string;
    division: string;
    deal_status: string;
    deal_start_date: string | null;
    deal_end_date: string | null;
    category_manager: string;
    last_update_date: string;
    currency: string;
    created_by: string;
}

export default function DealSummaryPage() {
    const [data, setData] = useState<Deal[]>([]);

    const columns: ColumnDef<Deal>[] = [
        { accessorKey: "deal_number", header: "Deal #" },
        { accessorKey: "deal_name", header: "Deal Name" },
        { accessorKey: "deal_type", header: "Type" },
        { accessorKey: "vendor_name", header: "Vendor" },
        { accessorKey: "division", header: "Division" },
        { accessorKey: "deal_status", header: "Status" },
        { accessorKey: "deal_start_date", header: "Start Date" },
        { accessorKey: "deal_end_date", header: "End Date" },
        { accessorKey: "category_manager", header: "Manager" },
        { accessorKey: "last_update_date", header: "Last Updated" },
        { accessorKey: "currency", header: "Currency" },
        { accessorKey: "created_by", header: "Created By" },
    ];

    useEffect(() => {
        fetch("/data/Deals/DealHeaders.json")
            .then((res) => res.json())
            .then((json) => setData(json.data));
    }, []);

    return (
        <Panel
            title="Deal Summary"
            onCreate={() => console.log("Create")}
            onEdit={() => console.log("Edit")}
            onDelete={() => console.log("Delete")}
            className="grid grid-cols-1 gap-4 p-3 h-full"
        >
            <ExtendedGrid
                columns={columns}
                data={data}
                enableFilters={false}
                onRefresh={() => showCustomToast("info", "Info", "Refreshed data")}
            />
        </Panel>
    );
}
