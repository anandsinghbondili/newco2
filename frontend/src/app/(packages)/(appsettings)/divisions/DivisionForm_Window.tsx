"use client";

import React, { useState } from "react";
import Window from "@/components/ext/window/Window";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ext/form/DateInput";
import { TextInput } from "@/components/ext/form/TextInput";
import ComboBox from "@/components/ext/form/ComboBox";

interface DivisionFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}

const defaultValues = {
    name: "Chewy",
    division_code: "100",
    start_date: null,
    end_date: null,
    operating_unit: "",
    legal_entity: "",
    credit_account: "",
    debit_account: "",
    division_type: "DC",
    accounted_currency: "",
};

export default function DivisionForm({ open, onClose, onSubmit }: DivisionFormProps) {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleChange = (field: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <Window
            open={open}
            onClose={onClose}
            title="Create Division"
            footer={
                <div className="flex gap-2 justify-end">
                    <Button variant="default" onClick={handleSubmit}>
                        Create
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            }
        >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    name="name"
                    value={formValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <TextInput
                    label="Division Code"
                    name="division_code"
                    value={formValues.division_code}
                    onChange={(e) => handleChange("division_code", e.target.value)}
                />
                <DateInput
                    label="Start Date"
                    name="start_date"
                    value={formValues.start_date}
                    onChange={(date) => handleChange("start_date", date)}
                />
                <DateInput
                    label="End Date"
                    name="end_date"
                    value={formValues.end_date}
                    onChange={(date) => handleChange("end_date", date)}
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
                    options={['DC', 'HO', 'BR']}
                    onChange={(val) => handleChange("division_type", val)}
                />
                <TextInput
                    label="Accounted Currency"
                    name="accounted_currency"
                    value={formValues.accounted_currency}
                    onChange={(e) => handleChange("accounted_currency", e.target.value)}
                />
            </form>
        </Window>
    );
}
