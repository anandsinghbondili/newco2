"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import Image from 'next/image';

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: integrate with your auth API
        // await sendResetLink(email);
        setSubmitted(true);
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
            />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h1 className="text-2xl font-semibold">Forgot password</h1>
                    <p className="text-sm text-muted-foreground">
                        {submitted
                            ? "If that email exists in our system you will receive a reset link shortly."
                            : "Enter your account email and we'll send you a password reset link."}
                    </p>
                </CardHeader>

                {!submitted && (
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
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                <Link2 className="mr-2" />
                                Send reset link
                            </Button>
                        </form>
                    </CardContent>
                )}

                <CardFooter className={cn("flex", submitted ? "justify-center" : "justify-between")}>
                    {submitted ? (
                        <Button variant="link" asChild>
                            <Link href="/login">Back to sign in</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="link" asChild>
                                <Link href="/login">Back to sign in</Link>
                            </Button>
                            {/* <Button variant="link" asChild>
                                <Link href="/register">Create account</Link>
                            </Button> */}
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}