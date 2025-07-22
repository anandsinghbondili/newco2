import { SimplePanel } from '@/components/ext/containers/SimplePanel';
import { SimpleField, SimpleForm } from '@/components/ext/form/SimpleForm';
import React from 'react';

// Moved Deal interface to a shared types file (recommended)
interface Deal {
    id: number;
    deal_number: string;
    deal_name?: string;
    deal_type?: string;
    vendor_name?: string;
    division?: string;
    deal_status?: string;
    deal_start_date?: string;
    deal_end_date?: string;
    category_manager?: string;
    last_update_date?: string;
    currency?: string;
    payment_frequency?: string;
    creation_date?: string;
    performance_name?: string;
    claimed_amount?: number;
    claimed_quantity?: number;
    sales?: number;
    max_capped_amount?: number;
    comments?: string;
    created_by?: string;
}

interface DealHeaderFormProps {
    deal: Deal;
    onSubmit?: (data: Deal) => Promise<void> | void;
}

const DealHeaderForm = ({ deal }: DealHeaderFormProps) => {
    const defaultValues = {
        deal_number: deal.deal_number,
        deal_name: deal.deal_name,
        deal_type: deal.deal_type,
        vendor_name: deal.vendor_name,
        division: deal.division,
        deal_status: deal.deal_status,
        deal_start_date: deal.deal_start_date,
        deal_end_date: deal.deal_end_date,
        category_manager: deal.category_manager,
        currency: deal.currency,
        payment_frequency: deal.payment_frequency,
        comments: deal.comments
    };

    const fields: SimpleField[] = [
        {
            name: 'deal_number',
            label: 'Deal Number',
            type: 'text',
            required: true,
            disabled: true,
        },
        {
            name: 'deal_name',
            label: 'Deal Name',
            type: 'text',
            required: true,
        },
        {
            name: 'deal_type',
            label: 'Deal Type',
            type: 'text',
            required: true,
        },
        {
            name: 'vendor_name',
            label: 'Vendor Name',
            type: 'text',
            required: true,
        },
        {
            name: 'division',
            label: 'Division',
            type: 'text',
            required: true,
        },
        {
            name: 'deal_status',
            label: 'Status',
            type: 'text',
            required: true,
        },
        {
            name: 'deal_start_date',
            label: 'Start Date',
            type: 'date',
            required: true,
        },
        {
            name: 'deal_end_date',
            label: 'End Date',
            type: 'date',
            required: true,
        },
        {
            name: 'category_manager',
            label: 'Category Manager',
            type: 'text',
            required: true,
        },
        {
            name: 'currency',
            label: 'Currency',
            type: 'text',
            required: true,
        },
        {
            name: 'payment_frequency',
            label: 'Payment Frequency',
            type: 'text',
            required: true,
        },
        {
            name: 'comments',
            label: 'Comments',
            type: 'text',
        }
    ];

    return (
        <SimplePanel
            title='Summary'
            collapsible={true}
            defaultCollapsed={false}
            onCollapseChange={() => { }}
        >
            <SimpleForm
                fields={fields}
                defaultValues={defaultValues}
                showSubmit={false}
                showCancel={false}
                onSubmit={() => { }}
            />
        </SimplePanel>
    );
};

export default DealHeaderForm;