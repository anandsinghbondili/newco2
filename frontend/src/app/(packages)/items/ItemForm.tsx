"use client";

import RCXWindow from "@/components/ext/window/RCXWindow";
import { RCXSimpleForm } from "@/components/ext/form/RCXSimpleForm";

export interface ItemFormValues {
  id: number | null;
  item_number: string;
  item_name: string;
  item_description: string;
  brand: string;
}

interface ItemFormProps {
  open: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: (values: ItemFormValues) => void;
  initialValues: ItemFormValues;
  columns?: 1 | 2 | 3;
}

export default function ItemForm({
  open,
  mode,
  onClose,
  onSubmit,
  initialValues,
  columns = 2,
}: ItemFormProps) {
  // No need for local state, use initialValues directly for defaultValues

  const fields = [
    {
      id: "item_number",
      name: "item_number",
      label: "Item Number",
      type: "text" as const,
      required: true,
      className: "col-span-2",
    },
    {
      id: "item_name",
      name: "item_name",
      label: "Item Name",
      type: "text" as const,
      required: true,
      className: "col-span-2",
    },
    {
      id: "item_description",
      name: "item_description",
      label: "Item Description",
      type: "text" as const,
      className: "col-span-2",
    },
    {
      id: "brand",
      name: "brand",
      label: "Brand",
      type: "text" as const,
      className: "col-span-2",
    },
  ];

  return (
    <RCXWindow
      open={open}
      onClose={onClose}
      title={`${mode === "create" ? "Create" : "Edit"} Item`}
      width="23%"
      height="55%"
    >
      <RCXSimpleForm
        fields={fields}
        defaultValues={{ ...initialValues }}
        onCancel={onClose}
        onSubmit={(data) => onSubmit(data as ItemFormValues)}
        columns={columns}
      />
    </RCXWindow>
  );
}
