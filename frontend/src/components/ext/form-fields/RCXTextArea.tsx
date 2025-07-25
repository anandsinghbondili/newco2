import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface RCXTextAreaProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    id?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
}

const RCXTextArea: React.FC<RCXTextAreaProps> = ({ label, helperText, error, required, id, placeholder, value, onChange, name }) => {
    const autoId = React.useId();
    const textareaId = id || autoId;
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label htmlFor={textareaId} className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>
                    {label}
                </Label>
            )}
            <Textarea id={textareaId} aria-invalid={!!error} required={required} placeholder={placeholder} value={value} onChange={onChange} name={name} autoComplete="off" />
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXTextArea; 