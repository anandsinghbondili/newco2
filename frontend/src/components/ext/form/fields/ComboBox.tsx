// components/ext/form/ComboBox.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ComboBoxProps {
    label?: string;
    options: { label: string; value: string }[];
    value?: string;
    onChange?: (value: string) => void;
}

export default function ComboBox({ label, options, value, onChange }: ComboBoxProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
