import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface RCXComboBoxOption {
  label: string;
  value: string;
}

export interface RCXComboBoxProps {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  options: RCXComboBoxOption[];
  onSelect?: (value: string) => void;
  name?: string;
}

const RCXComboBox: React.FC<RCXComboBoxProps> = ({
  label,
  helperText,
  error,
  required,
  options,
  id,
  value,
  onSelect,
  name,
  placeholder = "Select...",
  className,
  ...props
}) => {
  const autoId = React.useId();
  const inputId = id || autoId;

  return (
    <div className={className ? `grid gap-1.5 ${className}` : "grid gap-1.5"}>
      {label && (
        <Label
          htmlFor={inputId}
          className={
            required
              ? 'after:content-["*"] after:ml-0.5 after:text-destructive'
              : ""
          }
        >
          {label}
        </Label>
      )}
      <Select
        value={value || ""}
        onValueChange={onSelect}
        name={name}
        {...props}
      >
        <SelectTrigger id={inputId} aria-invalid={!!error} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

export default RCXComboBox;
