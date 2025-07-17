// React hooks for Tonic API integration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TonicUserService, TonicUser, handleTonicApiError } from '@/lib/tonic-api';

// Query keys for React Query
export const TONIC_QUERY_KEYS = {
    USERS: 'tonic_users',
    USER: (id: string) => ['tonic_user', id],
} as const;

// Custom hooks for Tonic API

// Hook to get all users
export const useTonicUsers = () => {
    return useQuery({
        queryKey: [TONIC_QUERY_KEYS.USERS],
        queryFn: TonicUserService.getUsers,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook to get a specific user
export const useTonicUser = (id: string) => {
    return useQuery({
        queryKey: TONIC_QUERY_KEYS.USER(id),
        queryFn: () => TonicUserService.getUser(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// Hook to create a user
export const useCreateTonicUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: Partial<TonicUser>) => TonicUserService.createUser(userData),
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: [TONIC_QUERY_KEYS.USERS] });
        },
        onError: (error) => {
            console.error('Failed to create user:', handleTonicApiError(error));
        },
    });
};

// Hook to update a user
export const useUpdateTonicUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, userData }: { id: string; userData: Partial<TonicUser> }) =>
            TonicUserService.updateUser(id, userData),
        onSuccess: (data, variables) => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: [TONIC_QUERY_KEYS.USERS] });
            // Update the specific user cache
            queryClient.setQueryData(TONIC_QUERY_KEYS.USER(variables.id), data);
        },
        onError: (error) => {
            console.error('Failed to update user:', handleTonicApiError(error));
        },
    });
};

// Hook to delete a user
export const useDeleteTonicUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => TonicUserService.deleteUser(id),
        onSuccess: (_, deletedId) => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: [TONIC_QUERY_KEYS.USERS] });
            // Remove the specific user from cache
            queryClient.removeQueries({ queryKey: TONIC_QUERY_KEYS.USER(deletedId) });
        },
        onError: (error) => {
            console.error('Failed to delete user:', handleTonicApiError(error));
        },
    });
};
