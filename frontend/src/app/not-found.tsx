"use client";

import { useRouter } from "next/navigation";
import RCXPriButton from "@/components/ext/buttons/RCXPriButton";
import RCXSecButton from "@/components/ext/buttons/RCXSecButton";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4 sm:p-8">
      <div className="max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-destructive">
          404 – Page Not Found
        </h1>
        <p className="mb-6 text-base sm:text-lg text-muted-foreground">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <RCXPriButton onClick={() => router.back()}>Go Back</RCXPriButton>

          <RCXSecButton onClick={() => router.push("/dashboard")}>
            Go to Home
          </RCXSecButton>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">Error Code: 404</p>
      </div>
    </div>
  );
}
