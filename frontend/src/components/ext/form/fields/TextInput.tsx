import { Input } from "@/components/ui/input";
import { BaseFormField } from "./BaseFormField";

interface TextInputProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "email" | "password";
    disabled?: boolean;
}

export const TextInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required,
    type = "text",
    disabled,
}: TextInputProps) => (
    <BaseFormField label={label} htmlFor={name} required={required}>
        <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            type={type}
            disabled={disabled}
        />
    </BaseFormField>
);

export default TextInput;