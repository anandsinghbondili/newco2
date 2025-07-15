// components/ext/form/RadioGroupField.tsx
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
    label: string;
    value: string;
}

interface RadioGroupFieldProps {
    label?: string;
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
}

export default function RadioGroupField({ label, options, value, onChange }: RadioGroupFieldProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
                {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value}>{opt.label}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
