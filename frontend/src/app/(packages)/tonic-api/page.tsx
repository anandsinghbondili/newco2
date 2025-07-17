"use client";

import TonicUsersExample from '@/components/examples/TonicUsersExample';
import TonicDealHeadersExample from '@/components/examples/TonicDealHeadersExample';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TonicApiTestPage() {
    return (
        <div className="space-y-6">
            <Breadcrumb
                customPaths={{
                    'tonic-api': 'Tonic API Test'
                }}
            />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Tonic API Integration Test</h1>
                    <p className="text-muted-foreground mt-2">
                        Test your Tonic API integration with CRUD operations for users and deal headers.
                    </p>
                </div>

                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="deal-headers">Deal Headers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users" className="space-y-4">
                        <TonicUsersExample />
                    </TabsContent>

                    <TabsContent value="deal-headers" className="space-y-4">
                        <TonicDealHeadersExample />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
