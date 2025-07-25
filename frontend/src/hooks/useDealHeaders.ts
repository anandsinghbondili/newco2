// React hooks for Deal Headers API integration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DealHeaderService,
    DealHeaderCreateRequest,
    DealHeaderUpdateRequest,
    DealHeaderQueryParams,
    handleDealHeaderApiError
} from '@/lib/deal-headers-api';

// Query keys for React Query
export const DEAL_HEADER_QUERY_KEYS = {
    DEAL_HEADERS: 'deal_headers',
    DEAL_HEADER: (id: number) => ['deal_header', id],
    DEAL_HEADER_BY_NUMBER: (dealNumber: string) => ['deal_header_by_number', dealNumber],
} as const;

// Hook to get all deal headers with optional filtering
export const useDealHeaders = (params?: DealHeaderQueryParams) => {
    return useQuery({
        queryKey: [DEAL_HEADER_QUERY_KEYS.DEAL_HEADERS, params],
        queryFn: () => DealHeaderService.getDealHeaders(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook to get a specific deal header by ID
export const useDealHeader = (id: number) => {
    return useQuery({
        queryKey: DEAL_HEADER_QUERY_KEYS.DEAL_HEADER(id),
        queryFn: () => DealHeaderService.getDealHeader(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// Hook to get deal header by deal number
export const useDealHeaderByDealNumber = (dealNumber: string) => {
    return useQuery({
        queryKey: DEAL_HEADER_QUERY_KEYS.DEAL_HEADER_BY_NUMBER(dealNumber),
        queryFn: () => DealHeaderService.getDealHeaderByDealNumber(dealNumber),
        enabled: !!dealNumber,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// Hook to create a deal header
export const useCreateDealHeader = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DealHeaderCreateRequest) => DealHeaderService.createDealHeader(data),
        onSuccess: () => {
            // Invalidate and refetch deal headers list
            queryClient.invalidateQueries({ queryKey: [DEAL_HEADER_QUERY_KEYS.DEAL_HEADERS] });
        },
        onError: (error) => {
            console.error('Failed to create deal header:', handleDealHeaderApiError(error));
        },
    });
};

// Hook to update a deal header
export const useUpdateDealHeader = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: DealHeaderUpdateRequest }) =>
            DealHeaderService.updateDealHeader(id, data),
        onSuccess: (_, variables) => {
            // Invalidate and refetch deal headers list
            queryClient.invalidateQueries({ queryKey: [DEAL_HEADER_QUERY_KEYS.DEAL_HEADERS] });
            // Invalidate the specific deal header cache
            queryClient.invalidateQueries({ queryKey: DEAL_HEADER_QUERY_KEYS.DEAL_HEADER(variables.id) });
        },
        onError: (error) => {
            console.error('Failed to update deal header:', handleDealHeaderApiError(error));
        },
    });
};

// Hook to delete a deal header
export const useDeleteDealHeader = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => DealHeaderService.deleteDealHeader(id),
        onSuccess: (_, deletedId) => {
            // Invalidate and refetch deal headers list
            queryClient.invalidateQueries({ queryKey: [DEAL_HEADER_QUERY_KEYS.DEAL_HEADERS] });
            // Remove the specific deal header from cache
            queryClient.removeQueries({ queryKey: DEAL_HEADER_QUERY_KEYS.DEAL_HEADER(deletedId) });
        },
        onError: (error) => {
            console.error('Failed to delete deal header:', handleDealHeaderApiError(error));
        },
    });
};
