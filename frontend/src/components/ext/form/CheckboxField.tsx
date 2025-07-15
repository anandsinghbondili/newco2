// components/ext/form/CheckboxField.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFieldProps {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export default function CheckboxField({ label, checked, onCheckedChange }: CheckboxFieldProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
            {label && <Label>{label}</Label>}
        </div>
    );
}
