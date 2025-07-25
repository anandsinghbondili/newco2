import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface RCXTagFieldProps {
    label?: string;
    helperText?: string;
    error?: string | boolean;
    required?: boolean;
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    id?: string;
    name?: string;
}

const RCXTagField: React.FC<RCXTagFieldProps> = ({ label, helperText, error, required, id, value = [], onChange, placeholder, name }) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    const [inputValue, setInputValue] = React.useState('');
    const [tags, setTags] = React.useState<string[]>(value);

    React.useEffect(() => {
        setTags(value);
    }, [value]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                const newTags = [...tags, inputValue.trim()];
                setTags(newTags);
                onChange?.(newTags);
            }
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            const newTags = tags.slice(0, -1);
            setTags(newTags);
            onChange?.(newTags);
        }
    };

    const handleRemoveTag = (tag: string) => {
        const newTags = tags.filter(t => t !== tag);
        setTags(newTags);
        onChange?.(newTags);
    };

    return (
        <div className="grid gap-1.5">
            {label && (
                <Label htmlFor={inputId} className={required ? 'after:content-[\"*\"] after:ml-0.5 after:text-destructive' : ''}>
                    {label}
                </Label>
            )}
            <div className="flex flex-wrap gap-1 mb-1">
                {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center bg-accent text-accent-foreground rounded px-2 py-0.5 text-xs">
                        {tag}
                        <button type="button" className="ml-1 text-destructive" onClick={() => handleRemoveTag(tag)} aria-label={`Remove ${tag}`}>&times;</button>
                    </span>
                ))}
            </div>
            <Input
                id={inputId}
                aria-invalid={!!error}
                required={required}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder || 'Add tag and press Enter'}
                name={name}
            />
            {helperText && !error && <div className="text-xs text-muted-foreground mt-1">{helperText}</div>}
            {error && <div className="text-xs text-destructive mt-1">{typeof error === 'string' ? error : 'Invalid input'}</div>}
        </div>
    );
};

export default RCXTagField; 