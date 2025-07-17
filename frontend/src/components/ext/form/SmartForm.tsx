// components/ext/form/SmartForm.tsx
"use client";

import * as React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import TextInput from "./fields/TextInput";
import NumberInput from "./fields/NumberInput";
import DateInput from "./fields/DateInput";
import TimeField from "./fields/TimeField";
import TextArea from "./fields/TextArea";
import CheckboxField from "./fields/CheckboxField";
import RadioGroupField from "./fields/RadioGroupField";
import ComboBox from "./fields/ComboBox";
import DisplayField from "./fields/DisplayField";
import FileUpload from "./fields/FileUpload";

interface FormField {
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
    component?: React.ComponentType<any>;
    options?: { value: string; label: string }[];
    defaultValue?: any;
    required?: boolean;
    validation?: Record<string, any>;
    disabled?: boolean;
    hidden?: boolean;
    className?: string;
    [key: string]: any;
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
    defaultValues?: Record<string, string>;
    className?: string;
    collapsible?: boolean; // New prop for panel collapsibility
    defaultCollapsed?: boolean; // New prop for initial collapse state
    panelTitle?: string; // Optional title for the collapsible panel
}

export const SmartForm: React.FC<SmartFormProps> = ({
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
            name: field.name,
            label: field.label,
            disabled: field.disabled,
            className: field.className,
            ...field.validation,
            ...field,
        };

        switch (field.type) {
            case "text":
                return <TextInput {...commonProps} />;
            case "number":
                return <NumberInput {...commonProps} />;
            case "date":
                return <DateInput {...commonProps} />;
            case "time":
                return <TimeField {...commonProps} />;
            case "textarea":
                return <TextArea {...commonProps} />;
            case "checkbox":
                return <CheckboxField {...commonProps} />;
            case "radio":
                return <RadioGroupField {...commonProps} options={field.options || []} />;
            case "select":
                return <ComboBox {...commonProps} options={field.options || []} />;
            case "file":
                return <FileUpload {...commonProps} />;
            case "display":
                return <DisplayField {...commonProps} />;
            default:
                return field.component ? (
                    React.createElement(field.component, commonProps)
                ) : (
                    <TextInput {...commonProps} />
                );
        }
    };

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    // Group fields into rows of 4
    const groupedFields = React.useMemo(() => {
        const visibleFields = fields.filter(field => !field.hidden);
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
                        {row.length < 4 && Array(4 - row.length).fill(0).map((_, i) => (
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
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
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