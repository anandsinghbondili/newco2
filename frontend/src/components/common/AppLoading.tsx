'use client'

import Image from 'next/image'
import Spinner from '@/components/ext/spinner/Spinner'

export default function AppLoading() {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center min-h-screen">
            <div className="relative w-32 h-32 mb-8">
                <Image
                    src="/images/logo.png"
                    alt="App Logo"
                    fill
                    priority
                    className="object-contain"
                />
            </div>
            <Spinner size="lg" className="text-primary" />
            <p className="mt-4 text-gray-600 text-lg">Loading application...</p>
        </div>
    )
}
