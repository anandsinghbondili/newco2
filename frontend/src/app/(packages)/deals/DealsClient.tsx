// app/deals/summary/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { showCustomToast } from "@/components/ext/window/RCXToaster";
import { PropertyGrid } from "@/components/ext/grid/RCXPropertyGrid";
import { RCXBreadcrumb } from "@/components/ext/misc/RCXBreadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import { SmartGrid } from "@/components/ext/grid/RCXSmartGrid";
import { RCXSimplePanel } from "@/components/ext/panel/RCXSimplePanel";
import RCXLink from "@/components/ext/misc/RCXLink";
import DealCreatePopup from "./DealCreatePopup";

interface Deal {
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
  created_by?: string; // Optional to maintain backward compatibility
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

export default function DealSummaryPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isPropertyGridOpen, setIsPropertyGridOpen] = useState(false);
  const [dealHeaders, setDealHeaders] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  // Load data from JSON file
  useEffect(() => {
    const fetchDealHeaders = async () => {
      try {
        setIsLoading(true);
        const { data: jsonData } = await axios.get(
          "/data/Deals/DealHeaders.json"
        );
        // Transform the data to match our interface
        const transformedData = jsonData.data.map((item: JsonDealHeader) => ({
          id: item.deal_header_id,
          deal_number: item.deal_number,
          deal_name: item.deal_name,
          deal_type: item.deal_type_name,
          vendor_name: item.vendor_name,
          division: item.division,
          deal_status: item.deal_status,
          deal_start_date: item.deal_start_date,
          deal_end_date: item.deal_end_date,
          category_manager: item.name,
          last_update_date: item.last_update_date,
          currency: item.currency,
          payment_frequency: item.payment_frequency,
          creation_date: item.creation_date,
          performance_name: item.performance_name,
          claimed_amount: item.claimed_amount,
          claimed_quantity: item.claimed_quantity,
          sales: item.sales,
          max_capped_amount: item.max_capped_amount,
          comments: item.comments,
          created_by: item.user_name,
        }));
        setDealHeaders(transformedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealHeaders();
  }, []);

  const refetch = () => {
    const fetchDealHeaders = async () => {
      try {
        setIsLoading(true);
        const { data: jsonData } = await axios.get(
          "/data/Deals/DealHeaders.json"
        );
        // Transform the data to match our interface
        const transformedData = jsonData.data.map((item: JsonDealHeader) => ({
          id: item.deal_header_id,
          deal_number: item.deal_number,
          deal_name: item.deal_name,
          deal_type: item.deal_type_name,
          vendor_name: item.vendor_name,
          division: item.division,
          deal_status: item.deal_status,
          deal_start_date: item.deal_start_date,
          deal_end_date: item.deal_end_date,
          category_manager: item.name,
          last_update_date: item.last_update_date,
          currency: item.currency,
          payment_frequency: item.payment_frequency,
          creation_date: item.creation_date,
          performance_name: item.performance_name,
          claimed_amount: item.claimed_amount,
          claimed_quantity: item.claimed_quantity,
          sales: item.sales,
          max_capped_amount: item.max_capped_amount,
          comments: item.comments,
          created_by: item.user_name,
        }));
        setDealHeaders(transformedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealHeaders();
  };

  const columns: ColumnDef<Deal>[] = [
    { accessorKey: "deal_number", header: "Deal #" },
    {
      accessorKey: "deal_name",
      header: "Deal Name",
      cell: ({ row }) => {
        const deal = row.original;
        return (
          <RCXLink
            href={{
              pathname: `/deals/${deal.deal_number}`,
              query: { dealData: JSON.stringify(deal) },
            }}
          >
            {deal.deal_name}
          </RCXLink>
        );
      },
    },
    { accessorKey: "deal_type", header: "Type" },
    { accessorKey: "vendor_name", header: "Vendor" },
    { accessorKey: "division", header: "Division" },
    { accessorKey: "deal_status", header: "Status" },
    { accessorKey: "deal_start_date", header: "Start Date" },
    { accessorKey: "deal_end_date", header: "End Date" },
    { accessorKey: "category_manager", header: "Manager" },
    { accessorKey: "last_update_date", header: "Last Updated" },
    { accessorKey: "currency", header: "Currency" },
    { accessorKey: "created_by", header: "Created By" },
  ];

  const handleRowDoubleClick = (deal: Deal) => {
    setIsPropertyGridOpen(true);
    setSelectedDeal(deal);
  };

  const handleCreate = () => {
    setIsCreatePopupOpen(true);
  };

  const handleDealSubmit = (values: Record<string, unknown>) => {
    console.log("values", values);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <RCXBreadcrumb />
        <RCXSimplePanel className="grid grid-cols-1 gap-4 p-2 h-full">
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading deals...</span>
          </div>
        </RCXSimplePanel>
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <>
        <RCXBreadcrumb />
        <RCXSimplePanel
          title="Deal Summary"
          className="grid grid-cols-1 gap-4 p-2 h-full"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load deals: {error.message}
            </AlertDescription>
          </Alert>
        </RCXSimplePanel>
      </>
    );
  }

  const data = dealHeaders || [];

  if (isLoading)
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );

  return (
    <>
      <RCXBreadcrumb />
      <RCXSimplePanel
        title="Deal Summary"
        className="grid grid-cols-1 gap-4 p-2 h-full"
      >
        <>
          <SmartGrid
            columns={columns}
            data={data}
            onRefresh={() => {
              refetch();
              showCustomToast("info", "Info", "Refreshed data");
            }}
            onRowDoubleClick={handleRowDoubleClick}
            onCreate={handleCreate}
            onEdit={() => {
              console.log("onEdit");
            }}
            onDelete={() => {
              console.log("onDelete");
            }}
            canEdit={true}
            canDelete={true}
            // toolbarExtra={<RCXSecButton>
            //     <Plus className="h-4 w-4" />
            // </RCXSecButton>
            // }
          />

          {selectedDeal && (
            <PropertyGrid
              data={Object.fromEntries(
                Object.entries(selectedDeal).map(([key, value]) => [
                  key,
                  value === null ? "" : String(value),
                ])
              )}
              title={`Deal Details - ${selectedDeal.deal_name}`}
              open={isPropertyGridOpen}
              onOpenChange={setIsPropertyGridOpen}
            />
          )}
        </>
      </RCXSimplePanel>

      <DealCreatePopup
        open={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
        onSubmit={(values: Record<string, unknown>) => {
          handleDealSubmit(values as Record<string, unknown>);
        }}
      />
    </>
  );
}
