"use client";

import { toast, type ToastT, Toaster } from "sonner";

// Toaster component (place this in your root layout or app component)
export const SonnerToaster = () => (
    <Toaster
        position="top-center"  // Position to top-center
        theme="system"         // Auto-adapt to light/dark theme
        // richColors            // Use theme colors (removes default blue/red)
        // closeButton           // Show close button
        icons={{
            success: "✅",
            error: "❌",
            warning: "⚠️",
            info: "ℹ️",
            loading: "🔄",
        }}
    />
);

// Toast utilities (unchanged, but position removed since it's set globally)
export const showSuccessToast = (message: string): void => {
    toast.success(message);
};

export const showErrorToast = (message: string): void => {
    toast.error(message);
};

type ToastType = "success" | "error" | "info" | "warning";

export const showCustomToast = (
    type: ToastType,
    title: string,
    message?: string,
    options?: Partial<ToastT>
): void => {
    toast[type](title, {
        description: message,
        ...options,
    });
};

export const showLoadingToast = (message: string): string | number => {
    return toast.loading(message, {
        duration: 3000
    });
};

export const dismissToast = (id: string | number): void => {
    toast.dismiss(id);
};