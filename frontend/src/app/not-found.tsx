"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4 sm:p-8">
            <div className="max-w-md text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-destructive">
                    404 – Page Not Found
                </h1>
                <p className="mb-6 text-base sm:text-lg text-muted-foreground">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="px-6 py-2 text-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                        onClick={() => router.push("/dashboard")}
                    >
                        Return Home
                    </Link>
                </div>

                <p className="mt-8 text-xs text-muted-foreground">
                    Error Code: 404
                </p>
            </div>
        </div>
    );
}