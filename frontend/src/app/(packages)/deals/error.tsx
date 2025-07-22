// Add this to your error.tsx in the same folder
'use client';

export default function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="font-bold">
                Error loading deal details
                </h2>
            <p>{error.message}</p>
        </div>
    );
}