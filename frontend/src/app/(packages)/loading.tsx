'use client'

import Spinner from '@/components/ext/spinner/Spinner'

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner size="lg" />
        </div>
    )
}
