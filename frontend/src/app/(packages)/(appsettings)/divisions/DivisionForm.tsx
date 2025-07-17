"use client";

import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ext/form/fields/DateInput";
import { TextInput } from "@/components/ext/form/fields/TextInput";
import ComboBox from "@/components/ext/form/fields/ComboBox";

interface DivisionFormValues {
    name: string;
    division_code: string;
    start_date: Date | null;
    end_date: Date | null;
    operating_unit: string;
    legal_entity: string;
    credit_account: string;
    debit_account: string;
    division_type: string;
    accounted_currency: string;
}

interface DivisionFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: DivisionFormValues) => void;
    mode?: "create" | "edit";
    initialValues?: DivisionFormValues;
}

const defaultValues = {
    name: "",
    division_code: "",
    start_date: null,
    end_date: null,
    operating_unit: "",
    legal_entity: "",
    credit_account: "",
    debit_account: "",
    division_type: "DC",
    accounted_currency: "",
};

export default function DivisionForm({
    open,
    onClose,
    onSubmit,
    mode = "create",
    initialValues = defaultValues,
}: DivisionFormProps) {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (
        field: keyof DivisionFormValues,
        value: string | Date | null
    ) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitted:", formValues);
        onSubmit(formValues);
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-5">
                <SheetHeader>
                    <SheetTitle>
                        {mode === "create" ? "Create Division" : "Edit Division"}
                    </SheetTitle>
                </SheetHeader>

                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                    />
                    <TextInput
                        label="Division Code"
                        name="division_code"
                        value={formValues.division_code}
                        onChange={(e) => handleChange("division_code", e.target.value)}
                        required
                    />
                    <DateInput
                        label="Start Date"
                        name="start_date"
                        value={formValues.start_date ? formValues.start_date.toISOString().slice(0, 10) : ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            handleChange("start_date", val ? new Date(val) : null);
                        }}
                    />
                    <DateInput
                        label="End Date"
                        name="end_date"
                        value={formValues.end_date ? formValues.end_date.toISOString().slice(0, 10) : ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            handleChange("end_date", val ? new Date(val) : null);
                        }}
                    />
                    <TextInput
                        label="Operating Unit"
                        name="operating_unit"
                        value={formValues.operating_unit}
                        onChange={(e) => handleChange("operating_unit", e.target.value)}
                    />
                    <TextInput
                        label="Legal Entity"
                        name="legal_entity"
                        value={formValues.legal_entity}
                        onChange={(e) => handleChange("legal_entity", e.target.value)}
                    />
                    <TextInput
                        label="Credit Account"
                        name="credit_account"
                        value={formValues.credit_account}
                        onChange={(e) => handleChange("credit_account", e.target.value)}
                    />
                    <TextInput
                        label="Debit Account"
                        name="debit_account"
                        value={formValues.debit_account}
                        onChange={(e) => handleChange("debit_account", e.target.value)}
                    />
                    <ComboBox
                        label="Division Type"
                        value={formValues.division_type}
                        options={[
                            { label: "DC", value: "DC" },
                            { label: "HO", value: "HO" },
                            { label: "BR", value: "BR" },
                        ]}
                        onChange={(val) => handleChange("division_type", val)}
                    />
                    <TextInput
                        label="Accounted Currency"
                        name="accounted_currency"
                        value={formValues.accounted_currency}
                        onChange={(e) => handleChange("accounted_currency", e.target.value)}
                    />
                </form>
                <div className="flex-1">
                </div>

                <SheetFooter className="grid grid-cols-2 gap-2 justify-end mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        {mode === "create" ? "Create" : "Save Changes"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}