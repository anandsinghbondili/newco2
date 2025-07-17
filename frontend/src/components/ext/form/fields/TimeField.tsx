// components/ext/form/TimeField.tsx
import { Input } from "@/components/ui/input";

interface TimeFieldProps {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeField({ label, value, onChange }: TimeFieldProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Input type="time" value={value} onChange={onChange} />
        </div>
    );
}
