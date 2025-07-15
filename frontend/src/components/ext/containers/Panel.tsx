'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Plus, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PanelProps {
    title?: string
    onCreate?: () => void
    onEdit?: () => void
    onDelete?: () => void
    toolbarExtra?: React.ReactNode
    className?: string
    children: React.ReactNode
}

export const Panel: React.FC<PanelProps> = ({
    title,
    onCreate,
    onEdit,
    onDelete,
    toolbarExtra,
    className,
    children,
}) => {
    return (
        <Card className={cn('grid grid-cols-1 gap-4 p-3 h-full', className)}>
            {/* Title */}
            {title && (
                <h2 className="text-xl font-semibold mb-1 shrink-0">{title}</h2>
            )}

            {/* Tbar */}
            <div className="flex items-center gap-3">
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onCreate}
                    disabled={!onCreate}
                    className="flex gap-1"
                >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Create</span>
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onEdit}
                    disabled={!onEdit}
                    className="flex gap-1"
                >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={!onDelete}
                    className="flex gap-1"
                >
                    <Trash className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                </Button>

                {/* Right-aligned optional controls */}
                {toolbarExtra && (
                    <div className="ml-auto flex items-center gap-2">
                        {toolbarExtra}
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <CardContent className="min-h-0 overflow-auto p-0 flex-1">
                {children}
            </CardContent>
        </Card >
    )
}
