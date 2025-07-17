// Tonic API Client
// API Documentation: https://fabricate.tonic.ai/api/v1/workspaces/Anand%20Singh%20Bondili/databases/newco2/api

const TONIC_API_BASE_URL = process.env.NEXT_PUBLIC_TONIC_API_URL || 'https://fabricate.tonic.ai/api/v1/workspaces/Anand%20Singh%20Bondili/databases/newco2/api';
const TONIC_API_KEY = process.env.NEXT_PUBLIC_TONIC_API_KEY || '74dfb4da-3138-4e01-b5d8-5ffffcb6c50f';

// Generic API client for Tonic
class TonicApiClient {
    private baseUrl: string;
    private apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                ...options.headers,
            },
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`Tonic API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    // Generic CRUD operations
    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    async patch<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }
}

// Create and export the Tonic API client instance
export const tonicApi = new TonicApiClient(TONIC_API_BASE_URL, TONIC_API_KEY);

// Common API endpoints and types
export interface TonicUser {
    id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TonicApiResponse<T> {
    data: T;
    message?: string;
    status: string;
}

// Specific API services
export class TonicUserService {
    // Get all users
    static async getUsers(): Promise<TonicUser[]> {
        return tonicApi.get<TonicUser[]>('/users');
    }

    // Get user by ID
    static async getUser(id: string): Promise<TonicUser> {
        return tonicApi.get<TonicUser>(`/users/${id}`);
    }

    // Create user
    static async createUser(userData: Partial<TonicUser>): Promise<TonicUser> {
        return tonicApi.post<TonicUser>('/users', userData);
    }

    // Update user
    static async updateUser(id: string, userData: Partial<TonicUser>): Promise<TonicUser> {
        return tonicApi.put<TonicUser>(`/users/${id}`, userData);
    }

    // Delete user
    static async deleteUser(id: string): Promise<void> {
        return tonicApi.delete<void>(`/users/${id}`);
    }
}

// You can add more services as needed
// export class TonicDealService {
//     static async getDeals(): Promise<any[]> {
//         return tonicApi.get<any[]>('/deals');
//     }
//     // ... other deal methods
// }

// Utility function to handle API errors
export const handleTonicApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred with the Tonic API';
};
