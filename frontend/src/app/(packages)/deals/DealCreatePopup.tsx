import React from 'react';
import RCXWindow from '@/components/ext/window/RCXWindow';
import { RCXSimpleForm, SimpleField } from '@/components/ext/form/RCXSimpleForm';

interface DealCreateProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: Record<string, unknown>) => void;
    initialValues?: Record<string, unknown>;
}

const fields: SimpleField[] = [
    { name: 'deal_name', label: 'Deal Name', type: 'text', required: true },
    { name: 'deal_type', label: 'Deal Type', type: 'text', required: true },
    { name: 'vendor_name', label: 'Vendor Name', type: 'text', required: true },
    { name: 'division', label: 'Division', type: 'text', required: true },
    { name: 'performance_name', label: 'Performance Name', type: 'text' },
    { name: 'deal_start_date', label: 'Deal Start Date', type: 'date', required: true },
    { name: 'deal_end_date', label: 'Deal End Date', type: 'date', required: true },
    { name: 'currency', label: 'Currency', type: 'text', required: true },
    { name: 'category_manager', label: 'Category Manager', type: 'text' },
    { name: 'payment_frequency', label: 'Payment Frequency', type: 'text' },
    { name: 'integration_class', label: 'Integration Class', type: 'text' },
];

const DealCreatePopup: React.FC<DealCreateProps> = ({ open, onClose, onSubmit, initialValues = {} }) => {
    return (
        <RCXWindow
            open={open}
            onClose={onClose}
            title="Create Deal"
            height='80%'
            width='25%'
            dock={
                {
                    position: 'top',
                    content: <p className='text-sm text-gray-500 mb-1'>
                        Create your deal program using this form. You will enter the terms, any comments and attachments on the next screen.
                    </p>
                }
            }
        >
            <RCXSimpleForm
                fields={fields}
                defaultValues={initialValues}
                onSubmit={data => onSubmit(data as Record<string, unknown>)}
                onCancel={onClose}
                columns={1}
            />
        </RCXWindow>
    );
};

export default DealCreatePopup;

