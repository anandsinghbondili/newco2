'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PanelProps {
    title?: string
    className?: string
    children: React.ReactNode
    collapsible?: boolean
    defaultCollapsed?: boolean
    onCollapseChange?: (collapsed: boolean) => void
}

export const SimplePanel: React.FC<PanelProps> = ({
    title,
    className,
    children,
    collapsible = false,
    defaultCollapsed = false,
    onCollapseChange,
}) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    const handleToggleCollapse = () => {
        const newCollapsed = !isCollapsed
        setIsCollapsed(newCollapsed)
        onCollapseChange?.(newCollapsed)
    }

    return (
        <Card className={cn('grid grid-cols-1 gap-4 p-3 h-full', className)}>
            {/* Title with optional collapse button */}
            {title && (
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-1 shrink-0">{title}</h2>
                    {collapsible && (
                        <button
                            onClick={handleToggleCollapse}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
                        >
                            {isCollapsed ? (
                                <ChevronDown className="h-5 w-5" />
                            ) : (
                                <ChevronUp className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Collapsible Content */}
            {!isCollapsed && (
                <CardContent className="min-h-0 overflow-auto p-0 flex-1">
                    {children}
                </CardContent>
            )}
        </Card>
    )
}
