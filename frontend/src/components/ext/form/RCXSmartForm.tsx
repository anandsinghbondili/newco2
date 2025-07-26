// components/ext/form/SmartForm.tsx
"use client";

import * as React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import RCXTextField from "../form-fields/RCXTextField";
import RCXNumberField from "../form-fields/RCXNumberField";
import RCXDateField from "../form-fields/RCXDateField";
import RCXComboBox from "../form-fields/RCXComboBox";

export interface FormField {
  id: string;
  name: string;
  label?: string;
  type:
    | "text"
    | "number"
    | "date"
    | "time"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select"
    | "file"
    | "display";
  component?: React.ComponentType<unknown>;
  options?: { value: string; label: string }[];
  defaultValue?: unknown;
  required?: boolean;
  validation?: Record<string, unknown>;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  [key: string]: unknown;
}

interface SmartFormProps {
  fields: FormField[];
  onSubmit: SubmitHandler<unknown>;
  onCancel?: () => void;
  showCancel?: boolean;
  showSubmit?: boolean;
  submitDisabled?: boolean;
  cancelDisabled?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValues?: Record<string, unknown>;
  className?: string;
  collapsible?: boolean; // New prop for panel collapsibility
  defaultCollapsed?: boolean; // New prop for initial collapse state
  panelTitle?: string; // Optional title for the collapsible panel
}

export const RCXSmartForm: React.FC<SmartFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  showCancel = true,
  showSubmit = true,
  submitDisabled = false,
  cancelDisabled = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  defaultValues = {},
  className = "",
  collapsible = false, // Default to non-collapsible
  defaultCollapsed = false, // Default to expanded
  panelTitle = "Form", // Default panel title
}) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const renderField = (field: FormField) => {
    if (field.hidden) return null;

    const commonProps = {
      label: field.label,
      disabled: field.disabled,
      className: field.className,
    };
    const value = methods.watch(field.name);

    switch (field.type) {
      case "text":
        return (
          <RCXTextField
            {...commonProps}
            name={field.name}
            value={String(value ?? "")}
            onChange={(e) => methods.setValue(field.name, e.target.value)}
          />
        );
      case "number":
        return (
          <RCXNumberField
            {...commonProps}
            name={field.name}
            value={
              typeof value === "number"
                ? value
                : value && !isNaN(Number(value))
                ? Number(value)
                : 0
            }
            onChange={(e) => methods.setValue(field.name, e.target.value)}
          />
        );
      case "date":
        return (
          <RCXDateField
            {...commonProps}
            name={field.name}
            value={String(value ?? "")}
            onChange={(e) => methods.setValue(field.name, e.target.value)}
          />
        );
      case "select":
        return (
          <RCXComboBox
            {...commonProps}
            value={String(value ?? "")}
            onSelect={(val) => methods.setValue(field.name, val)}
            options={field.options || []}
          />
        );
      default:
        return (
          <RCXTextField
            {...commonProps}
            name={field.name}
            value={String(value ?? "")}
            onChange={(e) => methods.setValue(field.name, e.target.value)}
          />
        );
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  // Group fields into rows of 4
  const groupedFields = React.useMemo(() => {
    const visibleFields = fields.filter((field) => !field.hidden);
    const groups = [];

    for (let i = 0; i < visibleFields.length; i += 4) {
      groups.push(visibleFields.slice(i, i + 4));
    }

    return groups;
  }, [fields]);

  const renderFormContent = () => (
    <>
      {/* 4-column grid layout */}
      <div className="grid grid-cols-4 gap-4">
        {groupedFields.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((field) => (
              <div key={field.name} className="col-span-1">
                {renderField(field)}
              </div>
            ))}
            {/* Fill empty slots in incomplete rows */}
            {row.length < 4 &&
              Array(4 - row.length)
                .fill(0)
                .map((_, i) => (
                  <div key={`empty-${rowIndex}-${i}`} className="col-span-1" />
                ))}
          </React.Fragment>
        ))}
      </div>

      {/* Action buttons */}
      {(showCancel || showSubmit) && (
        <div className="flex justify-end gap-4 mt-6">
          {showCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={cancelDisabled}
            >
              {cancelLabel}
            </Button>
          )}
          {showSubmit && (
            <Button type="submit" disabled={submitDisabled}>
              {submitLabel}
            </Button>
          )}
        </div>
      )}
    </>
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        autoComplete="off"
      >
        {collapsible ? (
          <div className="border rounded-lg p-3">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <h3 className="font-medium text-lg">{panelTitle}</h3>
              {isCollapsed ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </div>
            {!isCollapsed && renderFormContent()}
          </div>
        ) : (
          renderFormContent()
        )}
      </form>
    </FormProvider>
  );
};
