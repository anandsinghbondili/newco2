import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RCXTimeFieldProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    id?: string;
    placeholder?: string;
    name?: string;
}

const RCXTimeField: React.FC<RCXTimeFieldProps> = ({ label, helperText, error, required, id, placeholder, name }) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label htmlFor={inputId} className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>
                    {label}
                </Label>
            )}
            <Input id={inputId} type="time" aria-invalid={!!error} required={required} placeholder={placeholder} name={name} />
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXTimeField; 