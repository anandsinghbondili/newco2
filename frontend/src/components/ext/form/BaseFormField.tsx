import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // utility to merge classes
import { ReactNode } from "react";

interface BaseFormFieldProps {
    label?: string;
    htmlFor?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}

export const BaseFormField = ({
    label,
    htmlFor,
    required,
    className,
    children,
}: BaseFormFieldProps) => (
    <div className={cn("space-y-2", className)}>
        {label && (
            <Label htmlFor={htmlFor} className="font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
        )}
        {children}
    </div>
);
