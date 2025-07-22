import { SimpleGrid } from '@/components/ext/grid/SimpleGrid'
import { SimplePanel } from '@/components/ext/containers/SimplePanel'
import React from 'react'

const DiscountLines = () => {
    return (
        <>
            <SimplePanel title='Discount Lines' collapsible={true} defaultCollapsed={false} onCollapseChange={() => { }}>
                <SimpleGrid columns={[{
                    header: 'Discount Line',
                    accessorKey: 'discount_line',
                }]} data={[]} />

            </SimplePanel>
        </>
    )
}

export default DiscountLines;