"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserPlus } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { ApiError } from "@/client";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { signUpMutation } = useAuth();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await signUpMutation.mutateAsync({
                email,
                password,
                full_name: name || undefined, // Map name to full_name, make it undefined if empty
            });
            // Success is handled by the mutation's onSuccess callback which redirects to login
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                const errorDetail = (error.body as { detail: string })?.detail;
                setError(errorDetail || "Something went wrong. Please try again.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
            <Image
                src="/newco_logo.png"
                alt="NewCo logo"
                width={220}
                height={220}
                priority
                className="drop-shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h1 className="text-2xl font-semibold">Create account</h1>
                    <p className="text-sm text-muted-foreground">
                        Sign up with your details below.
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <label htmlFor="confirm" className="text-sm font-medium">
                                Confirm password
                            </label>
                            <Input
                                id="confirm"
                                type="password"
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="link" asChild>
                        <Link href="/login">Already have an account?</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/forgot-password">Forgot password?</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
