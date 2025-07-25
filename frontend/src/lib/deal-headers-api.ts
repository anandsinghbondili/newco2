// Deal Headers API Service using fetch

export interface DealHeader {
    id: number;
    deal_number: string;
    deal_name?: string;
    deal_type?: string;
    vendor_name?: string;
    division?: string;
    deal_start_date?: string;
    deal_end_date?: string;
    deal_status?: string;
    payment_frequency?: string;
    currency?: string;
    category_manager?: string;
    creation_date?: string;
    last_update_date?: string;
    performance_name?: string;
    claimed_amount?: number;
    claimed_quantity?: number;
    sales?: number;
    max_capped_amount?: number;
    comments?: string;
}

export interface DealHeaderCreateRequest extends Record<string, unknown> {
    deal_number: string;
}

export interface DealHeaderUpdateRequest extends Record<string, unknown> {
    deal_number?: string;
}

export interface DealHeaderQueryParams {
    sort_by?: 'id' | 'deal_number';
    sort_order?: 'ASC' | 'DESC';
    deal_number?: string;
}

export interface DealHeaderApiResponse {
    message?: string;
    id?: number;
}

const API_BASE = '';

export class DealHeaderService {
    // Get all deal headers with optional filtering and sorting
    static async getDealHeaders(params?: DealHeaderQueryParams): Promise<DealHeader[]> {
        const searchParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    searchParams.append(key, value.toString());
                }
            });
        }

        const queryString = searchParams.toString();
        const endpoint = `${API_BASE}/newco2_deal_headers${queryString ? `?${queryString}` : ''}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch deal headers: ${res.statusText}`);
        return res.json();
    }

    // Get a specific deal header by ID
    static async getDealHeader(id: number): Promise<DealHeader> {
        const res = await fetch(`${API_BASE}/newco2_deal_headers/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch deal header: ${res.statusText}`);
        return res.json();
    }

    // Get deal header by deal number
    static async getDealHeaderByDealNumber(dealNumber: string): Promise<DealHeader[]> {
        return this.getDealHeaders({ deal_number: dealNumber });
    }

    // Create a new deal header
    static async createDealHeader(data: DealHeaderCreateRequest): Promise<DealHeaderApiResponse> {
        const res = await fetch(`${API_BASE}/newco2_deal_headers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`Failed to create deal header: ${res.statusText}`);
        return res.json();
    }

    // Update a deal header
    static async updateDealHeader(id: number, data: DealHeaderUpdateRequest): Promise<DealHeaderApiResponse> {
        const res = await fetch(`${API_BASE}/newco2_deal_headers/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`Failed to update deal header: ${res.statusText}`);
        return res.json();
    }

    // Delete a deal header
    static async deleteDealHeader(id: number): Promise<DealHeaderApiResponse> {
        const res = await fetch(`${API_BASE}/newco2_deal_headers/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error(`Failed to delete deal header: ${res.statusText}`);
        return res.json();
    }
}

// Utility function to handle API errors
export const handleDealHeaderApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred with the Deal Headers API';
};
