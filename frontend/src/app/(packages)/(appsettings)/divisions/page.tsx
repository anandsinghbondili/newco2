'use client'

import { useState, useEffect } from 'react'
import { SmartPanel } from '@/components/ext/containers/SmartPanel'
import { Division } from '@/client/types.gen'
import { ColumnDef } from '@tanstack/react-table'
import DivisionForm, { DivisionFormValues } from './DivisionForm'
import SmartGrid from '@/components/ext/grid/SmartGrid'

export default function DivisionsPage() {
    const [divisions, setDivisions] = useState<Division[]>([])
    const [, setIsLoading] = useState(false)
    const [formOpen, setFormOpen] = useState(false)

    const columns: ColumnDef<Division>[] = [
        {
            accessorKey: 'code',
            header: 'Code'
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'type',
            header: 'Type'
        },
        {
            accessorKey: 'business_unit',
            header: 'Business Unit'
        },
        {
            accessorKey: 'legal_entity',
            header: 'Legal Entity'
        },
        {
            accessorKey: 'active_flag',
            header: 'Active',
            cell: ({ row }) => row.original.active_flag ? 'Yes' : 'No'
        }
    ]

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await fetch('https://rcxdev.marketmedium.net:8000/divisions/?skip=0&limit=10')
                if (!response.ok) throw new Error('Failed to fetch divisions')
                const data = await response.json()
                setDivisions(data)
            } catch (error) {
                console.error('Error fetching divisions:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDivisions()
    }, [])

    const handleCreate = () => {
        setFormOpen(true)
    }

    const handleFormSubmit = async (values: DivisionFormValues) => {
        try {
            // Example implementation - adjust according to your API
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/divisions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })

            if (!response.ok) throw new Error('Failed to create division')

            // Refresh divisions list
            const updatedResponse = await fetch('https://rcxdev.marketmedium.net:8000/divisions/?skip=0&limit=10')
            const updatedData = await updatedResponse.json()
            setDivisions(updatedData)
        } catch (error) {
            console.error('Error creating division:', error)
        }
        setFormOpen(false)
    }

    return (
        <>
            <SmartPanel
                title="Divisions"
                onCreate={handleCreate}
                onEdit={() => { }}
                onDelete={() => { }}
            >
                <SmartGrid
                    columns={columns}
                    data={divisions}
                />

                <DivisionForm
                    open={formOpen}
                    onClose={() => setFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            </SmartPanel>
        </>
    )
}

