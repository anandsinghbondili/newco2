import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface RCXCheckboxGroupOption {
    label: string;
    value: string;
}

export interface RCXCheckboxGroupProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    options: RCXCheckboxGroupOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    name?: string;
}

const RCXCheckboxGroup: React.FC<RCXCheckboxGroupProps> = ({ label, helperText, error, required, options, value = [], onChange, name }) => {
    const handleChange = (val: string) => {
        if (value.includes(val)) {
            onChange?.(value.filter(v => v !== val));
        } else {
            onChange?.([...value, val]);
        }
    };
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>{label}</Label>
            )}
            <div className="flex flex-col gap-2">
                {options.map(opt => (
                    <label key={opt.value} className="flex items-center gap-2">
                        <Checkbox
                            checked={value.includes(opt.value)}
                            onCheckedChange={() => handleChange(opt.value)}
                            aria-invalid={!!error}
                            name={name}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXCheckboxGroup; 