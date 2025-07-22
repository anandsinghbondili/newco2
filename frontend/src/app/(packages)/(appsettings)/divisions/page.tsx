"use client";

import { useState, useEffect } from "react";
import DivisionGrid, { DivisionRow } from "./DivisionGrid";
import { deleteDivision } from "./actions";
import { Panel } from "@/components/ext/containers/SmartPanel";
import ConfirmDialog from "@/components/ext/window/Alert";
import DivisionForm from "./DivisionForm";
import type { DivisionFormValues } from "./DivisionForm";
import Loading from "@/app/loading";
import axios from "axios";

export default function DivisionsPage() {
    const [rows, setRows] = useState<DivisionRow[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get("http://localhost:8000/api/divisions");
            setRows(data);
        } catch (error) {
            console.error("Error fetching divisions:", error);
            setError("Failed to load divisions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!selectedId) return;
        setError(null);
        try {
            await deleteDivision(selectedId);
            setRows(prev => prev.filter(r => r.id !== selectedId));
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting division:", error);
            setError("Failed to delete division. Please try again.");
        } finally {
            setShowDeleteDialog(false);
        }
    };

    const handleFormSubmit = (values: DivisionFormValues) => {
        // Add your create/update logic here
        console.log("Form submitted:", values);
        fetchData(); // Refresh data after form submission
        setShowFormDialog(false);
    };

    // Helper to map DivisionRow to DivisionFormValues
    const toFormValues = (row?: DivisionRow): DivisionFormValues | undefined => {
        if (!row) return undefined;
        return {
            name: row.name,
            division_code: row.division_code,
            start_date: row.start_date ? new Date(row.start_date) : null,
            end_date: row.end_date ? new Date(row.end_date) : null,
            operating_unit: row.operating_unit,
            legal_entity: row.legal_entity,
            credit_account: "",
            debit_account: "",
            division_type: row.division_type,
            accounted_currency: "",
        };
    };

    const openCreateForm = () => {
        setFormMode("create");
        setSelectedId(null);
        setShowFormDialog(true);
    };

    const openEditForm = () => {
        if (!selectedId) return;
        setFormMode("edit");
        setShowFormDialog(true);
    };

    const selectedDivision = rows.find(r => r.id === selectedId);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Panel
                title="Divisions"
                onCreate={openCreateForm}
                onEdit={selectedId ? openEditForm : undefined}
                onDelete={selectedId ? () => setShowDeleteDialog(true) : undefined}
            >
                {error && (
                    <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
                        {error}
                    </div>
                )}
                <DivisionGrid
                    data={rows}
                    onRowSelect={setSelectedId}
                />
            </Panel>

            {/* Form Dialog */}
            {showFormDialog && (
                <DivisionForm
                    open={showFormDialog}
                    onClose={() => setShowFormDialog(false)}
                    onSubmit={handleFormSubmit}
                    mode={formMode}
                    initialValues={formMode === "edit" ? toFormValues(selectedDivision) : undefined}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Division"
                description="Are you sure you want to delete this division?"
                destructive
            />
        </>
    );
}