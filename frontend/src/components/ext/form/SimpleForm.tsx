"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import TextInput from "./fields/TextInput";
import NumberInput from "./fields/NumberInput";
import DateInput from "./fields/DateInput";
import ComboBox from "./fields/ComboBox";

export type FieldType = "text" | "number" | "date" | "select";
export interface SimpleField {
    name: string;
    label: string;
    type: FieldType;
    options?: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
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
}

export const SimpleForm: React.FC<SimpleFormProps> = ({
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
}) => {
    const methods = useForm({ defaultValues });
    const { handleSubmit, reset } = methods;
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const renderField = (field: SimpleField) => {
        if (field.hidden) return null;

        const commonProps = {
            label: field.label,
            disabled: field.disabled,
            required: field.required,
        };
        const value = methods.watch(field.name);

        switch (field.type) {
            case "text":
                return (
                    <TextInput
                        {...commonProps}
                        name={field.name}
                        value={String(value ?? "")}
                        onChange={e => methods.setValue(field.name, e.target.value)}
                    />
                );
            case "number":
                return (
                    <NumberInput
                        {...commonProps}
                        name={field.name}
                        value={typeof value === 'number' ? value : (value && !isNaN(Number(value)) ? Number(value) : 0)}
                        onChange={e => methods.setValue(field.name, e.target.value)}
                    />
                );
            case "date":
                return (
                    <DateInput
                        {...commonProps}
                        name={field.name}
                        value={String(value ?? "")}
                        onChange={e => methods.setValue(field.name, e.target.value)}
                    />
                );
            case "select":
                return (
                    <ComboBox
                        {...commonProps}
                        value={String(value ?? "")}
                        onChange={val => methods.setValue(field.name, val)}
                        options={field.options || []}
                    />
                );
            default:
                return null;
        }
    };

    const groupedFields = React.useMemo(() => {
        const visibleFields = fields.filter((f) => !f.hidden);
        const groups = [];

        for (let i = 0; i < visibleFields.length; i += 4) {
            groups.push(visibleFields.slice(i, i + 4));
        }

        return groups;
    }, [fields]);

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    const renderFormContent = () => (
        <>
            <div className="grid grid-cols-4 gap-4">
                {groupedFields.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((field) => (
                            <div key={field.name}>{renderField(field)}</div>
                        ))}
                        {row.length < 4 &&
                            Array(4 - row.length)
                                .fill(0)
                                .map((_, idx) => <div key={`empty-${i}-${idx}`} />)}
                    </React.Fragment>
                ))}
            </div>

            {(showSubmit || showCancel) && (
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
            <form onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
                {collapsible ? (
                    <div className="border rounded-lg p-3">
                        <div
                            className="flex items-center justify-between cursor-pointer mb-2"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <h3 className="font-medium text-lg">{panelTitle}</h3>
                            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
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
