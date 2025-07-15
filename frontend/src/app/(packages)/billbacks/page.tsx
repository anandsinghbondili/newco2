"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MessageSquareText } from "lucide-react";
import { ExtendedGrid } from "@/components/ext/grid/ExtendedGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

const columns: ColumnDef<Comment>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "body", header: "Comment" },
];

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then((r) => r.json())
            .then((data) => {
                setComments(data.slice(0, 100)); // only first 100
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-xl mx-auto">
                <Alert variant="destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle>Fetch Failed</AlertTitle>
                    <AlertDescription>Unable to load comments. Please try again later.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquareText className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-semibold">Comments</h1>
            </div>

            <ExtendedGrid
                columns={columns}
                data={comments}
                title="Comments Table"
                enablePagination
                enableFilters
                striped
                className="h-[70vh]"
            />
        </div>
    );
}
