// UnderProgressPage.tsx
// A friendly “under construction” page for routes that are not yet ready.
// Place it in your /app (or /pages) and render it for unfinished modules.

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export default function UnderProgressPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                    <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                        <div className="relative">
                            {/* Animated spinning loader behind icon */}
                            <motion.span
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                            >
                                <Loader2 size={88} className="opacity-20" />
                            </motion.span>
                            <Hammer size={88} className="relative text-primary" />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Module in Progress
                        </h1>
                        <p className="max-w-prose text-sm text-muted-foreground">
                            Thanks for your curiosity! Our team is hammering away at this
                            feature. Check back soon, or return to the dashboard for other
                            goodies already live.
                        </p>

                        <Button asChild className="mt-2 w-full sm:w-auto">
                            <Link href="/dashboard">← Back to Dashboard</Link>
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

/*
 * ➜ Usage suggestions
 *
 * 1. Create a route at /under-progress/(.)* and redirect unfinished modules there;
 * 2. Or, in a layout.tsx, check feature flags and conditionally render this page.
 *
 * Example Next.js route handler:
 *   // app/not-ready/page.tsx
 *   import UnderProgressPage from "@/components/UnderProgressPage";
 *   export default UnderProgressPage;
 */
