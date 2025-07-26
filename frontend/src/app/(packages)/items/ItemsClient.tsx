"use client";

import { useState, useEffect } from "react";
import { RCXSimplePanel } from "@/components/ext/panel/RCXSimplePanel";
import { ColumnDef } from "@tanstack/react-table";
import RCXSmartGrid from "@/components/ext/grid/RCXSmartGrid";
import { MessageType, RCXMsg } from "@/components/ext/window/RCXMsg";
import ItemForm from "./ItemForm";

interface Item {
  id: number;
  item_number: string;
  item_name: string;
  item_description: string;
  brand: string;
}

interface ItemFormValues {
  id: number | null;
  item_number: string;
  item_name: string;
  item_description: string;
  brand: string;
}

export default function ItemsClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<ItemFormValues | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "item_number",
      header: "Item Number",
    },
    {
      accessorKey: "item_name",
      header: "Name",
    },
    {
      accessorKey: "item_description",
      header: "Description",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
  ];

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://rcxdev.marketmedium.net:8000/items/?skip=0&limit=10"
      );
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRefresh = () => {
    fetchItems();
  };

  const handleCreate = () => {
    setFormValues(null);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values: ItemFormValues) => {
    setIsLoading(true);
    try {
      const url = values.id
        ? `https://rcxdev.marketmedium.net:8000/items/${values.id}?`
        : `https://rcxdev.marketmedium.net:8000/items/`;

      const method = values.id ? "PUT" : "POST";

      const requestValues = { ...values };
      if (method === "POST") {
        requestValues.id = null;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestValues),
      });

      if (!response.ok)
        throw new Error(`Failed to ${values.id ? "update" : "create"} item`);

      await fetchItems();
      setFormOpen(false);
    } catch (error) {
      console.error("Error submitting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: Item) => {
    const formValues: ItemFormValues = {
      id: item.id,
      item_number: item.item_number,
      item_name: item.item_name,
      item_description: item.item_description,
      brand: item.brand,
    };
    setFormValues(formValues);
    setFormOpen(true);
  };

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://rcxdev.marketmedium.net:8000/items/${itemToDelete.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete item");

      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const defaultItemFormValues: ItemFormValues = {
    id: null,
    item_number: "",
    item_name: "",
    item_description: "",
    brand: "",
  };

  return (
    <>
      <RCXSimplePanel
        title="Items"
        className="grid grid-cols-1 gap-4 p-2 h-full"
      >
        <RCXSmartGrid
          columns={columns}
          data={items}
          isLoading={isLoading}
          onCreate={handleCreate}
          onRefresh={handleRefresh}
          canDelete={true}
          canEdit={true}
          onEdit={(item) => {
            if (item) {
              handleEdit(item);
            }
          }}
          onDelete={(selectedItems) => {
            if (selectedItems && selectedItems.length > 0) {
              handleDeleteClick(selectedItems[0]);
            }
          }}
        />

        <ItemForm
          open={formOpen}
          mode={formValues ? "edit" : "create"}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialValues={{
            ...(formValues || defaultItemFormValues),
            id:
              formValues && typeof formValues.id === "number"
                ? formValues.id
                : null,
          }}
        />

        <RCXMsg
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          type={MessageType.QUESTION}
          message="Are you sure you want to delete this item?"
          onConfirm={handleDeleteConfirm}
        />
      </RCXSimplePanel>
    </>
  );
}
