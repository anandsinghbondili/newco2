'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/client';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
}

const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("access_token") !== null;
    }
    return false;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [hasToken, setHasToken] = useState(false);

    // Handle hydration mismatch and initial token check
    useEffect(() => {
        setIsClient(true);
        setHasToken(isLoggedIn());
    }, []);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["currentUser"],
        queryFn: UsersService.readUserMe,
        enabled: isClient && hasToken,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Wait for client-side hydration
    if (!isClient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // Check if user is logged in (has token)
    if (!hasToken) {
        router.replace('/login');
        return null;
    }

    // Show loading while fetching user data
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // If there's an error fetching user data (e.g., invalid token), redirect to login
    if (error) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
            localStorage.removeItem("access_token");
        }
        router.replace('/login');
        return null;
    }

    // If user data is successfully fetched, render the protected content
    if (user) {
        return <>{children}</>;
    }

    // Fallback loading state
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
}
