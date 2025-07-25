"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import RCXTextField from "../form-fields/RCXTextField";
import RCXNumberField from "../form-fields/RCXNumberField";
import RCXDateField from "../form-fields/RCXDateField";
import RCXComboBox from "../form-fields/RCXComboBox";
import RCXSecButton from "../buttons/RCXSecButton";
import RCXPriButton from "../buttons/RCXPriButton";
import RCXCheckbox from "../form-fields/RCXCheckbox";
import RCXRadio from "../form-fields/RCXRadio";

export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "radio";
export interface SimpleField {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  placeholder?: string;
}

interface SimpleFormProps {
  fields: SimpleField[];
  onSubmit?: SubmitHandler<unknown>;
  onCancel?: () => void;
  showSubmit?: boolean;
  showCancel?: boolean;
  submitDisabled?: boolean;
  cancelDisabled?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValues?: Record<string, unknown>;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  panelTitle?: string;
  columns?: 1 | 2 | 3;
}

export const RCXSimpleForm: React.FC<SimpleFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  showSubmit = true,
  showCancel = true,
  submitDisabled = false,
  cancelDisabled = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  defaultValues = {},
  collapsible = false,
  defaultCollapsed = false,
  panelTitle = "Form",
  columns,
}) => {
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { handleSubmit, reset, formState } = methods;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  // Ensure columns is always a valid number (1, 2, or 3)
  const gridColsClass =
    columns === 3
      ? "grid-cols-3"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-1";

  const renderField = (field: SimpleField) => {
    if (field.hidden) return null;

    const commonProps = {
      label: field.label,
      disabled: field.disabled,
      required: field.required,
      placeholder: field.placeholder,
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
      case "checkbox":
        return (
          <RCXCheckbox
            {...commonProps}
            name={field.name}
            checked={String(value ?? "") === "true"}
            onCheckedChange={(val) => methods.setValue(field.name, val)}
          />
        );
      case "radio":
        return (
          <RCXRadio
            {...commonProps}
            name={field.name}
            value={String(value ?? "")}
            onChange={(val) => methods.setValue(field.name, val)}
            options={field.options || []}
          />
        );
      default:
        return null;
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
        className="space-y-6 flex flex-col h-full"
        autoComplete="off"
      >
        {collapsible ? (
          <div className="border rounded-lg p-3 h-full flex flex-col">
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
            {!isCollapsed && (
              <div className="flex-1 min-h-0 flex flex-col">
                <div
                  className={`grid ${gridColsClass} gap-4 overflow-y-auto max-h-full p-1 flex-1`}
                >
                  {fields
                    .filter((f) => !f.hidden)
                    .map((field) => (
                      <div key={field.name} className={field.className}>
                        {renderField(field)}
                      </div>
                    ))}
                </div>
                {(showSubmit || showCancel) && (
                  <div className="flex justify-end gap-4 mt-6 sticky bottom-0 bg-white pt-2 z-10">
                    {showCancel && (
                      <RCXSecButton
                        type="button"
                        onClick={handleCancel}
                        disabled={cancelDisabled}
                      >
                        {cancelLabel}
                      </RCXSecButton>
                    )}
                    {showSubmit && (
                      <RCXPriButton
                        type="submit"
                        disabled={submitDisabled || !formState.isValid}
                      >
                        {submitLabel}
                      </RCXPriButton>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col">
            <div
              className={`grid ${gridColsClass} gap-4 overflow-y-auto max-h-full p-1 flex-1`}
            >
              {fields
                .filter((f) => !f.hidden)
                .map((field) => (
                  <div key={field.name} className={field.className}>
                    {renderField(field)}
                  </div>
                ))}
            </div>
            {(showSubmit || showCancel) && (
              <div className="flex justify-end gap-4 mt-6 sticky bottom-0 bg-white pt-2 z-10">
                {showCancel && (
                  <RCXSecButton
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelDisabled}
                  >
                    {cancelLabel}
                  </RCXSecButton>
                )}
                {showSubmit && (
                  <RCXPriButton
                    type="submit"
                    disabled={submitDisabled || !formState.isValid}
                  >
                    {submitLabel}
                  </RCXPriButton>
                )}
              </div>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};
