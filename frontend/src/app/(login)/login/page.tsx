'use client';

import "../../globals.css";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Loader2, LogInIcon } from "lucide-react";
import { showSuccessToast } from "@/components/ext/window/Toaster";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type AccessToken = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const { loginMutation, error: authError, resetError } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AccessToken>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: AccessToken) => {
        if (isSubmitting || loading) return;

        setLoading(true);
        resetError();

        try {
            // await loginMutation.mutateAsync(data);
            // router.push("/dashboard");
            // Assuming loginMutation handles the API call and sets user data in localStorage/sessionStorage
            loginMutation.mutate(data, {
                onSuccess: () => {
                    showSuccessToast("Login successful");
                    router.push("/dashboard");
                },
                onError: (error) => {
                    console.error("Login failed:", error);
                    // Handle error appropriately, e.g., set an error state
                },
            });
        } catch (error) {
            // The error is already handled by the mutation's onError callback
            // which sets the authError state and calls handleError
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
            {/* Logo */}
            <Image
                src="/newco_logo.png"
                alt="NewCo logo"
                width={220}
                height={220}
                priority
                className="drop-shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="w-full max-w-md mt-8">
                {loading ? (
                    <Card className="flex items-center justify-center p-12">
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <span className="text-lg font-medium">Logging in... Please wait.</span>
                        </div>
                    </Card>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
                    >
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                            Welcome back
                        </h1>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="email"
                                {...register("username", {
                                    required: "Username is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="Enter your email"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {authError && (
                            <p className="text-sm text-red-600 text-center">{authError}</p>
                        )}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            <LogInIcon className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Logging in..." : "Log in"}
                        </Button>

                        <div className="flex items-center justify-between text-sm">
                            <Link href="/forgot-password" className="underline-offset-4 hover:underline">
                                Forgot password?
                            </Link>
                            <Link href="/signup" className="underline-offset-4 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}