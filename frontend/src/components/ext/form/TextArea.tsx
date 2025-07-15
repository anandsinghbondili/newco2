// components/ext/form/TextArea.tsx
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

export default function TextArea({ label, value, onChange, rows = 4 }: TextAreaProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Textarea value={value} onChange={onChange} rows={rows} />
        </div>
    );
}
