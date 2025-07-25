"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export default function RCXWindow({
    open,
    onClose,
    title,
    children,
    footer,
    width = "50%",
    height = "50%",
    dock,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
    height?: string;
    dock?: { position: 'top' | 'bottom'; content: React.ReactNode };
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="min-w-[200px] min-h-[100px]"
                style={{
                    width: width,
                    height: height,
                    maxWidth: "100vw",
                    maxHeight: "100vh"
                }}
            >
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {dock && dock.position === 'top' && (
                    <div className="w-full">{dock.content}</div>
                )}
                <div className="p-2 overflow-auto flex-1 max-h-full">{children}</div>
                {dock && dock.position === 'bottom' && (
                    <div className="w-full">{dock.content}</div>
                )}
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
