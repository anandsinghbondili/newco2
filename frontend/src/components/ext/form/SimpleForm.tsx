"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextInput from "./fields/TextInput";
import NumberInput from "./fields/NumberInput";
import DateInput from "./fields/DateInput";
import ComboBox from "./fields/ComboBox";

type FieldType = "text" | "number" | "date" | "select";

interface SimpleField {
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
    onSubmit: SubmitHandler<any>;
    onCancel?: () => void;
    showSubmit?: boolean;
    showCancel?: boolean;
    submitDisabled?: boolean;
    cancelDisabled?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    defaultValues?: Record<string, any>;
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
}) => {
    const methods = useForm({ defaultValues });
    const { handleSubmit, reset } = methods;

    const renderField = (field: SimpleField) => {
        if (field.hidden) return null;

        const commonProps = {
            name: field.name,
            label: field.label,
            disabled: field.disabled,
            required: field.required,
        };

        switch (field.type) {
            case "text":
                return <TextInput {...commonProps} />;
            case "number":
                return <NumberInput {...commonProps} />;
            case "date":
                return <DateInput {...commonProps} />;
            case "select":
                return <ComboBox {...commonProps} options={field.options || []} />;
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

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex justify-end gap-4">
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
            </form>
        </FormProvider>
    );
};
