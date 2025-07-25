import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RCXFileFieldProps extends React.ComponentProps<typeof Input> {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    accept?: string;
    multiple?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const RCXFileField: React.FC<RCXFileFieldProps> = ({ label, helperText, error, required, id, accept, multiple, value, onChange, name, ...props }) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label htmlFor={inputId} className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>
                    {label}
                </Label>
            )}
            <Input id={inputId} type="file" aria-invalid={!!error} required={required} accept={accept} multiple={multiple} value={value} onChange={onChange} name={name} {...props} />
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXFileField; 