import * as React from 'react';
import { Label } from '@/components/ui/label';

export interface RCXSpinnerFieldProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
}

const RCXSpinnerField: React.FC<RCXSpinnerFieldProps> = ({ label, helperText, error, required }) => {
    return (
        <div className="grid gap-1.5 items-center">
            {label && (
                <Label className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>{label}</Label>
            )}
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary" />
            </div>
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXSpinnerField; 