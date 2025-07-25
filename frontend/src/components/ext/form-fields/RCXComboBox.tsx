import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RCXComboBoxOption {
    label: string;
    value: string;
}

export interface RCXComboBoxProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    className?: string;
    placeholder?: string;
    value?: string;
    id?: string;
    options: RCXComboBoxOption[];
    onSelect?: (value: string) => void;
    name?: string;
}

const RCXComboBox: React.FC<RCXComboBoxProps> = ({ label, helperText, error, required, options, id, value, onSelect, name, ...props }) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value || '');

    const handleSelect = (val: string) => {
        setInputValue(val);
        setOpen(false);
        onSelect?.(val);
    };

    return (
        <div className="grid gap-1.5 relative">
            {label && (
                <Label htmlFor={inputId} className={required ? 'after:content-["*"] after:ml-0.5 after:text-destructive' : ''}>
                    {label}
                </Label>
            )}
            <Input
                id={inputId}
                aria-invalid={!!error}
                required={required}
                value={inputValue}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                onChange={e => setInputValue(e.target.value)}
                autoComplete="off"
                name={name}
                {...props}
            />
            {open && options.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-popover border rounded shadow">
                    {options.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase())).map(opt => (
                        <div
                            key={opt.value}
                            className="px-3 py-2 cursor-pointer hover:bg-accent"
                            onMouseDown={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXComboBox; 