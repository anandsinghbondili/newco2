// Deal Headers API Service using Tonic API
import { tonicApi } from '@/lib/tonic-api';

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
        const endpoint = `/newco2_deal_headers${queryString ? `?${queryString}` : ''}`;

        return tonicApi.get<DealHeader[]>(endpoint);
    }

    // Get a specific deal header by ID
    static async getDealHeader(id: number): Promise<DealHeader> {
        return tonicApi.get<DealHeader>(`/newco2_deal_headers/${id}`);
    }

    // Get deal header by deal number
    static async getDealHeaderByDealNumber(dealNumber: string): Promise<DealHeader[]> {
        return this.getDealHeaders({ deal_number: dealNumber });
    }

    // Create a new deal header
    static async createDealHeader(data: DealHeaderCreateRequest): Promise<DealHeaderApiResponse> {
        return tonicApi.post<DealHeaderApiResponse>('/newco2_deal_headers', data);
    }

    // Update a deal header
    static async updateDealHeader(id: number, data: DealHeaderUpdateRequest): Promise<DealHeaderApiResponse> {
        return tonicApi.patch<DealHeaderApiResponse>(`/newco2_deal_headers/${id}`, data);
    }

    // Delete a deal header
    static async deleteDealHeader(id: number): Promise<DealHeaderApiResponse> {
        return tonicApi.delete<DealHeaderApiResponse>(`/newco2_deal_headers/${id}`);
    }
}

// Utility function to handle API errors
export const handleDealHeaderApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred with the Deal Headers API';
};
