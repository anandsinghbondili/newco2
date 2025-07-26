import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface RCXCheckboxProps {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  required?: boolean;
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
}

const RCXCheckbox: React.FC<RCXCheckboxProps> = ({
  label,
  helperText,
  error,
  required,
  id,
  checked,
  onCheckedChange,
  ...props
}) => {
  const autoId = React.useId();
  const checkboxId = id || autoId;
  return (
    <div className="grid gap-1.5 items-center">
      <div className="flex items-center gap-2">
        <Checkbox
          id={checkboxId}
          aria-invalid={!!error}
          required={required}
          checked={checked}
          onCheckedChange={onCheckedChange}
          {...props}
        />
        {label && (
          <Label
            htmlFor={checkboxId}
            className={
              required
                ? 'after:content-["*"] after:ml-0.5 after:text-destructive'
                : ""
            }
          >
            {label}
          </Label>
        )}
      </div>
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

export default RCXCheckbox;
