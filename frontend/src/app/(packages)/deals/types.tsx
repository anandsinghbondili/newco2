export interface Deal {
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

export interface JsonDealHeader {
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
