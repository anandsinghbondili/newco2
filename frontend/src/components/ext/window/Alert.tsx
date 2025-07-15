"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title?: string;
    description?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    destructive?: boolean;
    children?: React.ReactNode;
}

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    destructive = false,
    children,
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    )}
                </AlertDialogHeader>

                {children}

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction
                        className={destructive ? "bg-destructive hover:bg-destructive/90" : ""}
                        onClick={async () => {
                            await onConfirm();
                            onClose();
                        }}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}