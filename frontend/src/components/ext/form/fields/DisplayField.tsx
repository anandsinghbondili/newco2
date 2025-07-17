// components/ext/form/DisplayField.tsx
interface DisplayFieldProps {
    label?: string;
    value: string;
}

export default function DisplayField({ label, value }: DisplayFieldProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <div className="p-2 border rounded-md text-muted-foreground bg-muted">{value}</div>
        </div>
    );
}