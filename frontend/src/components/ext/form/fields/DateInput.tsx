import { Input } from "@/components/ui/input";
import { BaseFormField } from "./BaseFormField";

interface DateInputProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const DateInput = ({
    label,
    name,
    value,
    onChange,
    required,
}: DateInputProps) => (
    <BaseFormField label={label} htmlFor={name} required={required}>
        <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type="date"
            required={required}
        />
    </BaseFormField>
);

export default DateInput;