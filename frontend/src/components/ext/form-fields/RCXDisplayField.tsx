import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface RCXDisplayFieldProps {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  required?: boolean;
  value?: React.ReactNode;
  name?: string;
}

const RCXDisplayField: React.FC<RCXDisplayFieldProps> = ({
  label,
  helperText,
  error,
  required,
  value,
  name,
}) => {
  return (
    <div className="grid gap-1.5">
      {label && (
        <Label
          className={
            required
              ? 'after:content-["*"] after:ml-0.5 after:text-destructive'
              : ""
          }
        >
          {label}
        </Label>
      )}
      <Input
        readOnly
        value={value as string}
        name={name}
        className="bg-muted"
      />
      {helperText && !error && (
        <div className="text-xs text-muted-foreground mt-1">{helperText}</div>
      )}
      {error && (
        <div className="text-xs text-destructive mt-1">
          {typeof error === "string" ? error : "Invalid input"}
        </div>
      )}
    </div>
  );
};

export default RCXDisplayField;
