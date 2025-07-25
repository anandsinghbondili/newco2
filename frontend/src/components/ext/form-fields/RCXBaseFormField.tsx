import * as React from 'react';
import { Label } from '@/components/ui/label';

export interface RCXBaseFormFieldProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    children: React.ReactNode;
    name?: string;
}

const RCXBaseFormField: React.FC<RCXBaseFormFieldProps> = ({ label, helperText, error, required, children }) => {
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>{label}</Label>
            )}
            {children}
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXBaseFormField;