'use client';

import { useEffect, useState } from 'react';
import { SimpleGrid } from '@/components/ext/grid/SimpleGrid';
import { Button } from '@/components/ui/button';
import { ItemsService } from '@/client/sdk.gen';
import { SimpleForm, SimpleField } from '@/components/ext/form/SimpleForm';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SmartPanel } from '@/components/ext/containers/SmartPanel';

interface Item {
    id: string;
    title: string;
    description?: string;
}

const itemFields: SimpleField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' },
];

function ItemForm({
    open,
    onClose,
    onSuccess,
    initialValues,
    isEdit = false,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialValues?: Partial<Item>;
    isEdit?: boolean;
}) {
    const handleSubmit = async (values: unknown) => {
        const data = values as {
            title?: string;
            description?: string;
        };
        if (isEdit && initialValues?.id) {
            // Only pass allowed fields for update
            const updateData = {
                title: typeof data.title === 'string' ? data.title : undefined,
                description: typeof data.description === 'string' ? data.description : undefined,
            };
            await ItemsService.updateItem({
                id: initialValues.id,
                requestBody: updateData
            });
        } else {
            // Only pass allowed fields for create
            if (typeof data.title === 'string') {
                const createData = {
                    title: data.title,
                    description: typeof data.description === 'string' ? data.description : undefined,
                };
                await ItemsService.createItem({
                    requestBody: createData
                });
            }
        }
        onSuccess();
        onClose();
    };
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>{isEdit ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <SimpleForm
                    fields={itemFields}
                    onSubmit={handleSubmit}
                    defaultValues={initialValues}
                    submitLabel={isEdit ? 'Update' : 'Create'}
                    cancelLabel="Cancel"
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<Item | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await ItemsService.readItems();
            // Convert ItemPublic[] to Item[] by ensuring description is not null
            const itemsData = data.data.map(item => ({
                ...item,
                description: item.description ?? undefined
            }));
            setItems(itemsData);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditItem(null);
        setShowForm(true);
    };

    const handleEdit = (id: string) => {
        const item = items.find(i => i.id === id);
        if (item) {
            setEditItem(item);
            setShowForm(true);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await ItemsService.deleteItem({ id });
            await fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Breadcrumb />
            <div className="flex flex-col gap-4">
                <SmartPanel
                    title='Items'
                    onCreate={handleAddNew}
                    onEdit={editItem ? () => handleEdit(editItem.id) : undefined}
                    onDelete={editItem ? () => handleDelete(editItem.id) : undefined}
                >
                    <SimpleGrid
                        columns={[
                            { header: 'Title', accessorKey: 'title' },
                            { header: 'Description', accessorKey: 'description' },
                            {
                                header: 'Actions', accessorKey: 'actions', cell: ({ row }) => (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(row.original.id)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>Delete</Button>
                                    </div>
                                )
                            }
                        ]}
                        data={items}
                    />
                </SmartPanel>
            </div>

            <ItemForm
                open={showForm}
                onClose={() => setShowForm(false)}
                onSuccess={fetchItems}
                initialValues={editItem || undefined}
                isEdit={!!editItem}
            />
        </>
    );
}
