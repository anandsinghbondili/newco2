'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PriButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    loading?: boolean
}

const RCXPriButton = React.forwardRef<HTMLButtonElement, PriButtonProps>(
    ({ children, className, loading, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    'rcx-btn rcx-btn-primary',
                    loading && 'opacity-70 cursor-not-allowed',
                    className
                )}
                disabled={loading}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

RCXPriButton.displayName = 'RCXPriButton'

export default RCXPriButton
