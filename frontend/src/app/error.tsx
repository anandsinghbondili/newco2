"use client";

import RCXSecButton from "@/components/ext/buttons/RCXSecButton";
import RCXPriButton from "@/components/ext/buttons/RCXPriButton";
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
                    {"An unexpected error occurred."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RCXSecButton onClick={reset}>
                        Try Again
                    </RCXSecButton>

                    <RCXPriButton onClick={() => router.push("/dashboard")}>
                        Go to Home
                    </RCXPriButton>
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