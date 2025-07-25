"use client";

import RCXWindow from "@/components/ext/window/RCXWindow";
import { RCXSimpleForm } from "@/components/ext/form/RCXSimpleForm";

export interface DivisionFormValues {
  div_type: string | null;
  div_code: string;
  div_name: string;
  parent_div_code: string | null;
  business_unit: string | null;
  accounting_currency: string | null;
  reporting_currency: string | null;
  dr_account: string | null;
  cr_account: string | null;
  ledger: string | null;
  legal_entity: string | null;
  start_date: string | null;
  end_date: string | null;
  active_flag: string;
  id: number | null;
  created_at: string;
  updated_at: string;
}

interface DivisionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: DivisionFormValues) => void;
  mode?: "create" | "edit";
  initialValues?: DivisionFormValues;
}

const defaultValues: DivisionFormValues = {
  div_type: null,
  div_code: "",
  div_name: "",
  parent_div_code: null,
  business_unit: null,
  accounting_currency: null,
  reporting_currency: null,
  dr_account: null,
  cr_account: null,
  ledger: null,
  legal_entity: null,
  start_date: null,
  end_date: null,
  active_flag: "Y",
  id: null,
  created_at: "",
  updated_at: "",
};

export default function DivisionForm({
  open,
  onClose,
  onSubmit,
  mode = "create",
  initialValues = { ...defaultValues, id: null },
}: DivisionFormProps) {
  const fields = [
    {
      id: "div_code",
      name: "div_code",
      label: "Division Code",
      type: "text" as const,
      required: true,
      placeholder: "--",
    },
    {
      id: "div_name",
      name: "div_name",
      label: "Division Name",
      type: "text" as const,
      required: true,
      placeholder: "--",
    },
    {
      id: "div_type",
      name: "div_type",
      label: "Division Type",
      type: "select" as const,
      required: true,
      placeholder: "Division",
      options: [
        { label: "Business Unit", value: "BU" },
        { label: "Eastern", value: "EAST" },
        { label: "Territory", value: "TR" },
        { label: "Warehouse", value: "WH" },
        { label: "Western", value: "WEST" },
      ],
    },
    {
      id: "parent_div_code",
      name: "parent_div_code",
      label: "Parent Division Code",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "business_unit",
      name: "business_unit",
      label: "Business Unit",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "accounting_currency",
      name: "accounting_currency",
      label: "Accounting Currency",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "reporting_currency",
      name: "reporting_currency",
      label: "Reporting Currency",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "dr_account",
      name: "dr_account",
      label: "Debit Account",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "cr_account",
      name: "cr_account",
      label: "Credit Account",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "ledger",
      name: "ledger",
      label: "Ledger",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "legal_entity",
      name: "legal_entity",
      label: "Legal Entity",
      type: "text" as const,
      placeholder: "--",
    },
    {
      id: "start_date",
      name: "start_date",
      label: "Start Date",
      type: "date" as const,
      placeholder: "--",
    },
    {
      id: "end_date",
      name: "end_date",
      label: "End Date",
      type: "date" as const,
      placeholder: "--",
    },
    {
      id: "active_flag",
      name: "active_flag",
      label: "Active Flag",
      type: "radio" as const,
      placeholder: "--",
      options: [
        { label: "Active", value: "Y" },
        { label: "Inactive", value: "N" },
      ],
    },
  ];

  return (
    <RCXWindow
      open={open}
      onClose={onClose}
      title={`${mode === "create" ? "Create" : "Edit"} Division`}
      width="25%"
      height="80%"
    >
      <RCXSimpleForm
        fields={fields}
        defaultValues={{ ...initialValues }}
        onSubmit={(data) => onSubmit(data as DivisionFormValues)}
        onCancel={onClose}
        columns={1}
      />
    </RCXWindow>
  );
}
