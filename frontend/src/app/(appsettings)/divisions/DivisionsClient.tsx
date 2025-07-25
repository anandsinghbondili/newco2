'use client';

import { useState, useEffect } from 'react';
import { RCXSimplePanel } from '@/components/ext/panel/RCXSimplePanel';
import { Division } from '@/client/types.gen';
import { ColumnDef } from '@tanstack/react-table';
import RCXSmartGrid from '@/components/ext/grid/RCXSmartGrid';
import { MessageType, RCXMsg } from '@/components/ext/window/RCXMsg';
import DivisionForm, { DivisionFormValues } from './DivisionForm';

export default function DivisionsClient() {
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formValues, setFormValues] = useState<DivisionFormValues | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState<Division | null>(null);

    const columns: ColumnDef<Division>[] = [
        { accessorKey: 'div_type', header: 'Type' },
        { accessorKey: 'div_code', header: 'Code' },
        { accessorKey: 'div_name', header: 'Name' },
        { accessorKey: 'parent_div_code', header: 'Parent Code' },
        { accessorKey: 'business_unit', header: 'Business Unit' },
        { accessorKey: 'accounting_currency', header: 'Accounting Currency' },
        { accessorKey: 'reporting_currency', header: 'Reporting Currency' },
        { accessorKey: 'dr_account', header: 'DR Account' },
        { accessorKey: 'cr_account', header: 'CR Account' },
        // { accessorKey: 'ledger', header: 'Ledger' },
        // { accessorKey: 'legal_entity', header: 'Legal Entity' },
        // { accessorKey: 'start_date', header: 'Start Date' },
        // { accessorKey: 'end_date', header: 'End Date' },
        { accessorKey: 'active_flag', header: 'Active' },
        // Add more columns as needed
    ];

    const fetchDivisions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://rcxdev.marketmedium.net:8000/divisions/?skip=0&limit=10');
            if (!response.ok) throw new Error('Failed to fetch divisions');
            const data = await response.json();
            setDivisions(data);
        } catch (error) {
            console.error('Error fetching divisions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDivisions();
    }, []);

    const handleRefresh = () => {
        fetchDivisions();
    };

    const handleCreate = () => {
        setFormValues(null);
        setFormOpen(true);
    };

    const handleFormSubmit = async (values: DivisionFormValues) => {
        setIsLoading(true);
        try {
            const url = values.id
                ? `https://rcxdev.marketmedium.net:8000/divisions/${values.id}?`
                : `https://rcxdev.marketmedium.net:8000/divisions/`;
            const method = values.id ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            if (!response.ok) throw new Error(`Failed to ${values.id ? 'update' : 'create'} division`);
            await fetchDivisions();
            setFormOpen(false);
        } catch (error) {
            console.error('Error submitting division:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (division: Division) => {
        const formValues: DivisionFormValues = {
            div_type: division.div_type,
            div_code: division.div_code,
            div_name: division.div_name,
            parent_div_code: division.parent_div_code,
            business_unit: division.business_unit,
            accounting_currency: division.accounting_currency,
            reporting_currency: division.reporting_currency,
            dr_account: division.dr_account,
            cr_account: division.cr_account,
            ledger: division.ledger,
            legal_entity: division.legal_entity,
            start_date: division.start_date ?? "",
            end_date: division.end_date ?? "",
            active_flag: division.active_flag ?? "",
            id: division.id ?? null,
            created_at: division.created_at ?? "",
            updated_at: division.updated_at ?? ""
        };
        setFormValues(formValues);
        setFormOpen(true);
    };

    const handleDeleteClick = (division: Division) => {
        setDivisionToDelete(division);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!divisionToDelete) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://rcxdev.marketmedium.net:8000/divisions/${divisionToDelete.id}`,
                { method: 'DELETE' }
            );
            if (!response.ok) throw new Error('Failed to delete division');
            await fetchDivisions();
        } catch (error) {
            console.error('Error deleting division:', error);
        } finally {
            setIsLoading(false);
            setDeleteConfirmOpen(false);
        }
    };

    const defaultDivisionFormValues: DivisionFormValues = {
        div_type: null,
        div_code: "",
        div_name: "",
        parent_div_code: null,
        business_unit: null,
        accounting_currency: null,
        reporting_currency: null,
        dr_account: null,
        cr_account: null,
        ledger: null,
        legal_entity: null,
        start_date: null,
        end_date: null,
        active_flag: "Y",
        id: null,
        created_at: "",
        updated_at: "",
    };

    return (
        <>
            <RCXSimplePanel title="Divisions" className="grid grid-cols-1 gap-4 p-2 h-full">
                <RCXSmartGrid
                    columns={columns}
                    data={divisions}
                    isLoading={isLoading}
                    onCreate={handleCreate}
                    onRefresh={handleRefresh}
                    canDelete={true}
                    canEdit={true}
                    onEdit={(division) => {
                        if (division) {
                            handleEdit(division);
                        }
                    }}
                    onDelete={(selectedDivisions) => {
                        if (selectedDivisions && selectedDivisions.length > 0) {
                            handleDeleteClick(selectedDivisions[0]);
                        }
                    }}
                />

                <DivisionForm
                    open={formOpen}
                    mode={formValues ? 'edit' : 'create'}
                    onClose={() => setFormOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialValues={formValues || defaultDivisionFormValues}
                />

                <RCXMsg
                    open={deleteConfirmOpen}
                    onClose={() => setDeleteConfirmOpen(false)}
                    type={MessageType.QUESTION}
                    message="Are you sure you want to delete this division?"
                    onConfirm={handleDeleteConfirm}
                />
            </RCXSimplePanel>
        </>
    );
} 