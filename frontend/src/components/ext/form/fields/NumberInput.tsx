import { Input } from "@/components/ui/input";
import { BaseFormField } from "./BaseFormField";

interface NumberInputProps {
    label?: string;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

export const NumberInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required,
    min,
    max,
}: NumberInputProps) => (
    <BaseFormField label={label} htmlFor={name} required={required}>
        <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type="number"
            required={required}
            min={min}
            max={max}
        />
    </BaseFormField>
);

export default NumberInput;