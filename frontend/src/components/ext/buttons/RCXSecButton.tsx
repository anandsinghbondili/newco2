'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SecButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    loading?: boolean
}

const RCXSecButton = React.forwardRef<HTMLButtonElement, SecButtonProps>(
    ({ children, className, loading, ...props }, ref) => {
        const [isPressed, setIsPressed] = React.useState(false)

        return (
            <Button
                ref={ref}
                className={cn(
                    'rcx-btn rcx-btn-secondary',
                    loading && 'opacity-70 cursor-not-allowed',
                    isPressed && 'hover:bg-secondary-foreground hover:text-secondary',
                    className
                )}
                disabled={loading}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

RCXSecButton.displayName = 'RCXSecButton'

export default RCXSecButton
