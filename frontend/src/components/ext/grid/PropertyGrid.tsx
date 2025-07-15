"use client";

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    PencilLine,
    Save,
    XCircle,
    ChevronRight,
    ChevronDown,
} from "lucide-react";
import dayjs from "dayjs";

/**
 * Simple ExtJS‑style PropertyGrid built with ShadCN + Tailwind.
 * Each row = { label, key, type, value, options? }
 * Supported types: string | number | boolean | date | select
 */

interface Property {
    key: string;
    label: string;
    type: "string" | "number" | "boolean" | "date" | "select";
    value: any;
    options?: { label: string; value: any }[];
}

const initialData: Property[] = [
    { key: "name", label: "Name", type: "string", value: "Chewy" },
    { key: "division_code", label: "Division Code", type: "number", value: 100 },
    { key: "start_date", label: "Start Date", type: "date", value: null },
    { key: "end_date", label: "End Date", type: "date", value: null },
    { key: "operating_unit", label: "Operating Unit", type: "string", value: "" },
    {
        key: "division_type", label: "Division Type", type: "select", value: "DC", options: [
            { label: "DC", value: "DC" },
            { label: "HO", value: "HO" },
            { label: "BR", value: "BR" },
        ]
    },
    { key: "active", label: "Active?", type: "boolean", value: true },
];

export default function PropertyGridPage() {
    const [rows, setRows] = useState<Property[]>(initialData);
    const [editing, setEditing] = useState<string | null>(null);

    const setValue = (key: string, value: any) => {
        setRows((prev) => prev.map((r) => (r.key === key ? { ...r, value } : r)));
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-muted/20">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-semibold mb-4">Division Property Grid</h1>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-muted/40 h-10">
                            <TableHead className="w-1/3">Property</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-16 text-right">Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((prop) => {
                            const isEditing = editing === prop.key;

                            return (
                                <TableRow key={prop.key} className="group/row">
                                    {/* Property label */}
                                    <TableCell className="font-medium text-sm whitespace-nowrap">
                                        {prop.label}
                                    </TableCell>

                                    {/* Value cell */}
                                    <TableCell>
                                        {isEditing ? (
                                            <ValueEditor
                                                property={prop}
                                                onChange={(val) => setValue(prop.key, val)}
                                            />
                                        ) : (
                                            <ValueDisplay property={prop} />
                                        )}
                                    </TableCell>

                                    {/* Edit buttons */}
                                    <TableCell className="text-right">
                                        {isEditing ? (
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setEditing(null)}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setEditing(null)}
                                                >
                                                    <Save className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="opacity-0 group-hover/row:opacity-100 transition"
                                                onClick={() => setEditing(prop.key)}
                                            >
                                                <PencilLine className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function ValueDisplay({ property }: { property: Property }) {
    switch (property.type) {
        case "boolean":
            return property.value ? (
                <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <ChevronDown className="w-3 h-3" /> True
                </span>
            ) : (
                <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                    <ChevronRight className="w-3 h-3" /> False
                </span>
            );
        case "date":
            return property.value ? dayjs(property.value).format("DD‑MMM‑YYYY") : "—";
        default:
            return property.value?.toString() || "—";
    }
}

function ValueEditor({
    property,
    onChange,
}: {
    property: Property;
    onChange: (val: any) => void;
}) {
    switch (property.type) {
        case "string":
            return (
                <Input
                    value={property.value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case "number":
            return (
                <Input
                    type="number"
                    value={property.value ?? ""}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
            );
        case "boolean":
            return (
                <Checkbox
                    checked={Boolean(property.value)}
                    onCheckedChange={(v) => onChange(v)}
                />
            );
        case "date":
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            {property.value ? dayjs(property.value).format("DD‑MMM‑YYYY") : "Select"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={property.value ?? undefined}
                            onSelect={(d) => onChange(d)}
                        />
                    </PopoverContent>
                </Popover>
            );
        case "select":
            return (
                <select
                    className={cn(
                        "border border-input rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                    )}
                    value={property.value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {property.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        default:
            return null;
    }
}
