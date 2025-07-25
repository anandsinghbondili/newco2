"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, AlertCircle } from "lucide-react";
import Image from 'next/image';
import { LoginService, type ApiError } from "@/client";
import { handleError } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const resetPasswordMutation = useMutation({
        mutationFn: (email: string) =>
            LoginService.recoverPassword({ email }),
        onSuccess: () => {
            setError(null);
        },
        onError: (err: ApiError) => {
            handleError(err);
            setError((err.body as { detail: string })?.detail || "Failed to send reset email");
        },
    });

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        resetPasswordMutation.mutate(email);
    }

    const isLoading = resetPasswordMutation.isPending;
    const isSuccess = resetPasswordMutation.isSuccess;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
            <Image
                src="/app_logo_login.png"
                alt="Recaptix logo"
                width={220}
                height={220}
                priority
                className="drop-shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h1 className="text-2xl font-semibold">Forgot password</h1>
                    <p className="text-sm text-muted-foreground">
                        {isSuccess
                            ? "If that email exists in our system you will receive a reset link shortly."
                            : "Enter your account email and we'll send you a password reset link."}
                    </p>
                </CardHeader>

                {/* Error Alert */}
                {error && (
                    <CardContent className="pb-0">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </CardContent>
                )}

                {!isSuccess && (
                    <CardContent>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="grid gap-1.5">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                <Link2 className="mr-2" />
                                {isLoading ? "Sending..." : "Send reset link"}
                            </Button>
                        </form>
                    </CardContent>
                )}

                <CardFooter className={cn("flex", isSuccess ? "justify-center" : "justify-between")}>
                    {isSuccess ? (
                        <Button variant="link" asChild>
                            <Link href="/login">Back to sign in</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="link" asChild>
                                <Link href="/login">Back to sign in</Link>
                            </Button>
                            <Button variant="link" asChild>
                                <Link href="/signup">Create account</Link>
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}