"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { OpenAPI } from "@/client";

export function Providers({ children }: { children: React.ReactNode }) {
  // Configure OpenAPI client base URL
  OpenAPI.BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  // Configure OpenAPI client to include Bearer token from localStorage
  OpenAPI.TOKEN = async () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token") || "";
    }
    return "";
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
