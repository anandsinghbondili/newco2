"use client";

import { RCXBreadcrumb } from "@/components/ext/misc/RCXBreadcrumb";
import RCXSimplePanel from "@/components/ext/panel/RCXSimplePanel";
import DealHeaderForm from "@/app/(packages)/deals/(details)/DealHeaderForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiscountLines from "../(details)/DiscountLines";
import { RCXSimpleGrid } from "@/components/ext/grid/RCXSimpleGrid";
import AppAreaChart from "@/components/common/AppAreaChart";

interface Deal {
  id: string;
  deal_number: string;
  deal_name: string;
  deal_type: string;
  vendor_name: string;
  division: string;
  deal_status: string;
  deal_start_date: string;
  deal_end_date: string;
  category_manager: string;
  currency: string;
  payment_frequency: string;
  last_update_date: string;
  creation_date: string;
  performance_name: string;
  claimed_amount: number;
  claimed_quantity: number;
  sales: number;
  max_capped_amount: number;
  comments: string;
  created_by: string;
}

type DealDetailsClientProps = { deal_number: string };

export default function DealDetailsClient({
  deal_number,
}: DealDetailsClientProps) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/data/Deals/DealHeaders.json`);
        if (!response.data) {
          throw new Error("Failed to fetch deal");
        }
        const data = await response.data;
        setDeal(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeal();
  }, [deal_number]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading deal: {error.message}</div>;
  if (!deal) return <div>Deal not found</div>;

  return (
    <>
      <RCXBreadcrumb />
      <div className="flex flex-col gap-2">
        <RCXSimplePanel
          title={`Deal Details - ${deal.deal_number}`}
          className="flex flex-col gap-2 w-full h-full"
        >
          <DealHeaderForm deal={{ ...deal, id: parseInt(deal.id) }} />
          <Tabs
            defaultValue="discount-lines"
            className="w-full h-full flex flex-col gap-1 mt-3"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="discount-lines">Discount Lines</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="qualifiers">Qualifiers</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
            </TabsList>
            <TabsContent value="discount-lines">
              <DiscountLines />
            </TabsContent>
            <TabsContent value="products">
              <RCXSimplePanel
                title="Products"
                collapsible={true}
                defaultCollapsed={false}
              >
                <RCXSimpleGrid
                  columns={[{ header: "Product", accessorKey: "product" }]}
                  data={[]}
                />
              </RCXSimplePanel>
            </TabsContent>
            <TabsContent value="qualifiers">
              <RCXSimplePanel
                title="Qualifiers"
                collapsible={true}
                defaultCollapsed={false}
              >
                <RCXSimpleGrid
                  columns={[{ header: "Qualifier", accessorKey: "qualifier" }]}
                  data={[]}
                />
              </RCXSimplePanel>
            </TabsContent>
            <TabsContent value="summary">
              <RCXSimplePanel
                title="Summary"
                collapsible={true}
                defaultCollapsed={false}
              >
                <AppAreaChart />
              </RCXSimplePanel>
            </TabsContent>
            <TabsContent value="history">
              <RCXSimplePanel
                title="History"
                collapsible={true}
                defaultCollapsed={false}
              >
                <RCXSimpleGrid
                  columns={[{ header: "History", accessorKey: "history" }]}
                  data={[]}
                />
              </RCXSimplePanel>
            </TabsContent>
            <TabsContent value="claims">
              <RCXSimplePanel
                title="Claims"
                collapsible={true}
                defaultCollapsed={false}
              >
                <RCXSimpleGrid
                  columns={[{ header: "Claim", accessorKey: "claim" }]}
                  data={[]}
                />
              </RCXSimplePanel>
            </TabsContent>
          </Tabs>
        </RCXSimplePanel>
      </div>
    </>
  );
}
