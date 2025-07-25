"use client";

import { RCXBreadcrumb } from '@/components/ext/misc/RCXBreadcrumb';
import { RCXSimplePanel } from '@/components/ext/panel/RCXSimplePanel';
import { RCXSmartForm } from '@/components/ext/form/RCXSmartForm';
import React from 'react'

const Billbacks = () => {
    return (
        <>
            <RCXBreadcrumb />
            <RCXSimplePanel
                title="Billbacks"
            >
                <RCXSmartForm
                    fields={[]}
                    onSubmit={() => { }}
                />
            </RCXSimplePanel>
        </>
    )
}

export default Billbacks;