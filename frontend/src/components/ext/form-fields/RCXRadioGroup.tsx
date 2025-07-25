import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface RCXRadioGroupOption {
    label: string;
    value: string;
}

export interface RCXRadioGroupProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    options: RCXRadioGroupOption[];
    id?: string;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
}

const RCXRadioGroup: React.FC<RCXRadioGroupProps> = ({ label, helperText, error, required, options, id, value, onChange, name }) => {
    const autoId = React.useId();
    const groupId = id || autoId;
    return (
        <div className="grid gap-1.5">
            {label && (
                <Label className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>{label}</Label>
            )}
            <RadioGroup id={groupId} aria-invalid={!!error} value={value} onValueChange={onChange} name={name}>
                {options.map(opt => (
                    <div key={opt.value} className="flex items-center gap-2">
                        <RadioGroupItem value={opt.value} id={`${groupId}-${opt.value}`} />
                        <Label htmlFor={`${groupId}-${opt.value}`}>{opt.label}</Label>
                    </div>
                ))}
            </RadioGroup>
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXRadioGroup; 