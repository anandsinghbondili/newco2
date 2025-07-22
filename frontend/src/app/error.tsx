"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4 sm:p-8">
            <div className="max-w-md text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-destructive">
                    Something went wrong
                </h1>
                <p className="mb-6 text-base sm:text-lg text-muted-foreground">
                    {error.message || "An unexpected error occurred."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="px-6 py-2 text-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        onClick={() => {
                            router.push("/dashboard");
                        }}
                    >
                        Go to Home
                    </Link>
                </div>

                {error.digest && (
                    <p className="mt-8 text-xs text-muted-foreground">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}