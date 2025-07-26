// app/loading.tsx
// Global route‑segment loader for Next.js App Router
// Displays a full‑page load mask using TailwindCSS, ShadCN primitives & Lucide icon.

"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      {/* Optional logo & spinner card */}
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
