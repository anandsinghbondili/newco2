"use client";

import { useState, useEffect } from "react";
import DivisionGrid, { DivisionRow } from "./DivisionGrid";
import { deleteDivision } from "./actions";
import { Panel } from "@/components/ext/containers/Panel";
import ConfirmDialog from "@/components/ext/window/Alert";
import DivisionForm from "./DivisionForm";
import Loading from "@/app/loading";

export default function DivisionsPage() {
    const [rows, setRows] = useState<DivisionRow[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5050/api/divisions");
            if (!response.ok) throw new Error("Failed to fetch divisions");
            const data = await response.json();
            setRows(data);
        } catch (error) {
            console.error("Error fetching divisions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await deleteDivision(selectedId);
            setRows(prev => prev.filter(r => r.id !== selectedId));
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting division:", error);
        } finally {
            setShowDeleteDialog(false);
        }
    };

    const handleFormSubmit = async (values: any) => {
        try {
            console.log("Form submitted:", values);
            // Add your create/update logic here
            await fetchData(); // Refresh data after form submission
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setShowFormDialog(false);
        }
    };

    const openCreateForm = () => {
        setFormMode("create");
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
                    initialValues={formMode === "edit" ? selectedDivision : undefined}
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