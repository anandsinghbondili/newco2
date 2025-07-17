'use client';

import AppBarChart from '@/components/common/AppBarChart';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SmartForm } from '@/components/ext/form/SmartForm';
import { SimpleGrid } from '@/components/ext/grid/SimpleGrid';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface FormField {
    name: string;
    label: string;
    type: "text" | "number" | "date" | "time" | "textarea" | "checkbox" | "radio" | "select" | "file" | "display";
    // other properties as needed
}

interface DealHeader {
    id: number;
    deal_number: string;
    deal_name?: string;
    deal_type?: string;
    vendor_name?: string;
    division?: string;
    deal_status?: string;
    deal_start_date?: string;
    deal_end_date?: string;
    category_manager?: string;
    last_update_date?: string;
    currency?: string;
    payment_frequency?: string;
    creation_date?: string;
    performance_name?: string;
    claimed_amount?: number;
    claimed_quantity?: number;
    sales?: number;
    max_capped_amount?: number;
    comments?: string;
    created_by?: string;
}

interface JsonDealHeader {
    deal_header_id: number;
    deal_number: string;
    deal_name: string;
    deal_type_name: string;
    vendor_name: string;
    division: string;
    deal_status: string;
    deal_start_date: string;
    deal_end_date: string;
    name: string;
    last_update_date: string;
    currency: string;
    payment_frequency: string;
    creation_date: string;
    performance_name: string;
    claimed_amount: number;
    claimed_quantity: number;
    sales: number;
    max_capped_amount: number;
    comments: string;
    user_name: string;
}

const dealFields: FormField[] = [
    { name: "id", label: "Deal Header ID", type: "text" },
    { name: "deal_number", label: "Deal Number", type: "text" },
    { name: "deal_name", label: "Deal Name", type: "text" },
    { name: "deal_type", label: "Deal Type", type: "text" },
    { name: "vendor_name", label: "Vendor Name", type: "text" },
    { name: "division", label: "Division", type: "text" },
    { name: "deal_start_date", label: "Deal Start Date", type: "date" },
    { name: "deal_end_date", label: "Deal End Date", type: "date" },
    { name: "deal_status", label: "Deal Status", type: "text" },
    { name: "payment_frequency", label: "Payment Frequency", type: "text" },
    { name: "currency", label: "Currency", type: "text" },
    { name: "category_manager", label: "Category Manager", type: "text" },
    { name: "creation_date", label: "Creation Date", type: "date" },
    { name: "last_update_date", label: "Last Update Date", type: "date" },
    { name: "performance_name", label: "Performance Name", type: "text" },
    { name: "claimed_amount", label: "Claimed Amount", type: "number" },
    { name: "claimed_quantity", label: "Claimed Quantity", type: "number" },
    { name: "sales", label: "Sales", type: "number" },
    { name: "max_capped_amount", label: "Max Capped Amount", type: "number" },
    { name: "comments", label: "Comments", type: "text" }
];

interface DealDetailsPageProps {
    params: {
        deal_number: string;
    };
}

const DealDetailsPage = ({ params }: DealDetailsPageProps) => {
    const { deal_number } = params;

    const [dealHeader, setDealHeader] = useState<DealHeader | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Load data from JSON file and find the specific deal
    useEffect(() => {
        const fetchDealHeader = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/data/Deals/DealHeaders.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch deal headers');
                }
                const jsonData = await response.json();

                // Find the deal with the matching deal_number
                const foundDeal = jsonData.data.find((item: JsonDealHeader) => item.deal_number === deal_number);

                if (foundDeal) {
                    // Transform the data to match our interface
                    const transformedDeal: DealHeader = {
                        id: foundDeal.deal_header_id,
                        deal_number: foundDeal.deal_number,
                        deal_name: foundDeal.deal_name,
                        deal_type: foundDeal.deal_type_name,
                        vendor_name: foundDeal.vendor_name,
                        division: foundDeal.division,
                        deal_status: foundDeal.deal_status,
                        deal_start_date: foundDeal.deal_start_date,
                        deal_end_date: foundDeal.deal_end_date,
                        category_manager: foundDeal.name,
                        last_update_date: foundDeal.last_update_date,
                        currency: foundDeal.currency,
                        payment_frequency: foundDeal.payment_frequency,
                        creation_date: foundDeal.creation_date,
                        performance_name: foundDeal.performance_name,
                        claimed_amount: foundDeal.claimed_amount,
                        claimed_quantity: foundDeal.claimed_quantity,
                        sales: foundDeal.sales,
                        max_capped_amount: foundDeal.max_capped_amount,
                        comments: foundDeal.comments,
                        created_by: foundDeal.user_name
                    };
                    setDealHeader(transformedDeal);
                } else {
                    setDealHeader(null);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDealHeader();
    }, [deal_number]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Loading deal details...</span>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Failed to load deal details: {error.message}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Not found state
    if (!dealHeader) {
        return (
            <div className="p-4">
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Deal with number &quot;{deal_number}&quot; not found.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <>
            <Breadcrumb
                customPaths={{
                    'deals': 'Deals',
                    [deal_number]: `Deal ${deal_number}`
                }}
            />
            <Card className="grid grid-cols-1 gap-4 p-2 h-full w-full overflow-y-auto">
                <div className="flex justify-between items-center">
                    <h2 className='text-2xl font-bold p-2'>
                        Deal Details - {dealHeader.deal_number}
                    </h2>
                    <div className="text-sm text-muted-foreground p-2">
                        ID: {dealHeader.id}
                    </div>
                </div>

                <SmartForm
                    panelTitle='Summary'
                    fields={dealFields}
                    defaultValues={dealHeader ? Object.fromEntries(
                        Object.entries(dealHeader).map(([key, value]) => [key, String(value || '')])
                    ) : {}}
                    showSubmit={false}
                    showCancel={false}
                    className='h-full w-full'
                    collapsible={true}
                    defaultCollapsed={false}
                    onSubmit={() => { }}
                />
                <Card
                    className="grid grid-cols-1 gap-4 p-3 h-full w-full overflow-y-auto"
                >
                    <Tabs defaultValue="discountlines">
                        <TabsList className='gap-2 w-full'>
                            <TabsTrigger value="discountlines">
                                Discount Lines
                            </TabsTrigger>
                            <TabsTrigger value="products">
                                Products
                            </TabsTrigger>
                            <TabsTrigger value="qualifiers">
                                Qualifiers
                            </TabsTrigger>
                            <TabsTrigger value="payment_options">
                                Payment Options
                            </TabsTrigger>
                            <TabsTrigger value="summary">
                                Summary
                            </TabsTrigger>
                            <TabsTrigger value="history">
                                History
                            </TabsTrigger>
                            <TabsTrigger value="claims">
                                Claims
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="discountlines" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="products" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="qualifiers" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onAdd={() => { }}
                                onDelete={() => { }}
                                onRefresh={() => { }}
                                onExport={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="payment_options" className='mt-2'>
                            <SmartForm
                                fields={[
                                    { name: "deal_header_id", label: "Deal Header ID", type: "text" },
                                    { name: "deal_number", label: "Deal Number", type: "text" },
                                    { name: "deal_name", label: "Deal Name", type: "text" },
                                    { name: "deal_type", label: "Deal Type", type: "text" },
                                    { name: "vendor_name", label: "Vendor Name", type: "text" }
                                ]}
                                showSubmit={false}
                                showCancel={false}
                                className='h-full w-full p-3'
                                onSubmit={() => { }}
                            />
                        </TabsContent>
                        <TabsContent value="summary" className='mt-2'>
                            <AppBarChart />
                        </TabsContent>
                        <TabsContent value="history" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onRefresh={() => { }}
                                onExport={() => { }}
                                enableRowSelection={false}
                            />
                        </TabsContent>
                        <TabsContent value="claims" className='mt-2'>
                            <SimpleGrid
                                columns={[]}
                                data={[

                                ]}
                                onRefresh={() => { }}
                                onExport={() => { }}
                                enableRowSelection={false}
                            />
                        </TabsContent>
                    </Tabs>
                </Card>
            </Card>
        </>
    );
};

export default DealDetailsPage;