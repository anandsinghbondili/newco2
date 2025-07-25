'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    loading?: boolean
}

const RCXNeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
    ({ children, className, loading, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    'rcx-btn rcx-btn-ghost',
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

RCXNeuButton.displayName = 'RCXNeuButton'

export default RCXNeuButton
