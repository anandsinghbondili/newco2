// components/ext/form/FileUpload.tsx
import { Input } from "@/components/ui/input";

interface FileUploadProps {
    label?: string;
    onChange?: (file: File | null) => void;
}

export default function FileUpload({ label, onChange }: FileUploadProps) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <Input
                type="file"
                onChange={(e) => onChange?.(e.target.files?.[0] ?? null)}
            />
        </div>
    );
}
