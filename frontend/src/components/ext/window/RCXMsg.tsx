"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  InfoIcon,
  AlertTriangleIcon,
  AlertOctagonIcon,
  HelpCircleIcon,
} from "lucide-react";
import { createRoot } from "react-dom/client";
import RCXPriButton from "@/components/ext/buttons/RCXPriButton";
import RCXSecButton from "@/components/ext/buttons/RCXSecButton";

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

export enum MessageType {
  INFO = "info",
  WARNING = "warning",
  QUESTION = "question",
  ERROR = "error",
}

interface MessageBoxProps {
  open: boolean;
  onClose: () => void;
  type: MessageType;
  title?: string;
  message: string;
  onConfirm?: () => void | Promise<void>;
}

export function RCXMsg({
  open,
  onClose,
  type,
  title,
  message,
  onConfirm,
}: MessageBoxProps) {
  const getIcon = () => {
    switch (type) {
      case MessageType.INFO:
        return <InfoIcon className="h-6 w-6 text-blue-500" />;
      case MessageType.WARNING:
        return <AlertTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case MessageType.ERROR:
        return <AlertOctagonIcon className="h-6 w-6 text-red-500" />;
      case MessageType.QUESTION:
        return <HelpCircleIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case MessageType.INFO:
        return "Information";
      case MessageType.WARNING:
        return "Warning";
      case MessageType.ERROR:
        return "Error";
      case MessageType.QUESTION:
        return "Question";
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            {getIcon()}
            <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {type === MessageType.QUESTION ? (
            <>
              <RCXSecButton onClick={onClose}>Cancel</RCXSecButton>
              <RCXPriButton
                onClick={async () => {
                  if (onConfirm) await onConfirm();
                  onClose();
                }}
              >
                Confirm
              </RCXPriButton>
            </>
          ) : (
            <RCXPriButton onClick={onClose}>OK</RCXPriButton>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Helper functions for common message types
export const showInfo = (message: string, title?: string) => {
  return new Promise<void>((resolve) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);
    const root = createRoot(dialog);

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(dialog);
      resolve();
    };

    root.render(
      <RCXMsg
        open={true}
        onClose={cleanup}
        type={MessageType.INFO}
        title={title}
        message={message}
      />
    );
  });
};

export const showWarning = (message: string, title?: string) => {
  return new Promise<void>((resolve) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);
    const root = createRoot(dialog);

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(dialog);
      resolve();
    };

    root.render(
      <RCXMsg
        open={true}
        onClose={cleanup}
        type={MessageType.WARNING}
        title={title}
        message={message}
      />
    );
  });
};

export const showError = (message: string, title?: string) => {
  return new Promise<void>((resolve) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);
    const root = createRoot(dialog);

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(dialog);
      resolve();
    };

    root.render(
      <RCXMsg
        open={true}
        onClose={cleanup}
        type={MessageType.ERROR}
        title={title}
        message={message}
      />
    );
  });
};

export const showQuestion = (message: string, title?: string) => {
  return new Promise<boolean>((resolve) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);
    const root = createRoot(dialog);

    const cleanup = (result: boolean) => {
      root.unmount();
      document.body.removeChild(dialog);
      resolve(result);
    };

    root.render(
      <RCXMsg
        open={true}
        onClose={() => cleanup(false)}
        type={MessageType.QUESTION}
        title={title}
        message={message}
        onConfirm={() => cleanup(true)}
      />
    );
  });
};
