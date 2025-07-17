"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import {
    useDealHeaders,
    useDealHeaderByDealNumber,
    useCreateDealHeader,
    useUpdateDealHeader,
    useDeleteDealHeader
} from '@/hooks/useDealHeaders';

export default function TonicDealHeadersExample() {
    const [dealNumber, setDealNumber] = useState('');
    const [searchDealNumber, setSearchDealNumber] = useState('');
    const [newDealNumber, setNewDealNumber] = useState('');
    const [selectedDealHeaderId, setSelectedDealHeaderId] = useState<number | null>(null);
    const [updateDealNumber, setUpdateDealNumber] = useState('');

    // React Query hooks
    const { data: allDealHeaders, isLoading: isLoadingAll, error: errorAll } = useDealHeaders();
    const {
        data: searchedDealHeaders,
        isLoading: isLoadingSearch,
        error: errorSearch
    } = useDealHeaderByDealNumber(searchDealNumber);

    const createMutation = useCreateDealHeader();
    const updateMutation = useUpdateDealHeader();
    const deleteMutation = useDeleteDealHeader();

    const handleSearch = () => {
        setSearchDealNumber(dealNumber);
    };

    const handleCreate = async () => {
        if (!newDealNumber.trim()) return;

        try {
            await createMutation.mutateAsync({ deal_number: newDealNumber });
            setNewDealNumber('');
        } catch (error) {
            console.error('Create failed:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedDealHeaderId || !updateDealNumber.trim()) return;

        try {
            await updateMutation.mutateAsync({
                id: selectedDealHeaderId,
                data: { deal_number: updateDealNumber }
            });
            setUpdateDealNumber('');
            setSelectedDealHeaderId(null);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this deal header?')) return;

        try {
            await deleteMutation.mutateAsync(id);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Deal Headers */}
            <Card>
                <CardHeader>
                    <CardTitle>Search Deal Headers</CardTitle>
                    <CardDescription>Search for deal headers by deal number</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                        <Input
                            placeholder="Enter deal number"
                            value={dealNumber}
                            onChange={(e) => setDealNumber(e.target.value)}
                        />
                        <Button onClick={handleSearch} disabled={isLoadingSearch}>
                            {isLoadingSearch ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
                        </Button>
                    </div>

                    {errorSearch && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Search failed: {errorSearch.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    {searchedDealHeaders && searchedDealHeaders.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium">Search Results:</h4>
                            {searchedDealHeaders.map((header) => (
                                <div key={header.id} className="p-2 border rounded">
                                    <strong>ID:</strong> {header.id}, <strong>Deal Number:</strong> {header.deal_number}
                                </div>
                            ))}
                        </div>
                    )}

                    {searchedDealHeaders && searchedDealHeaders.length === 0 && searchDealNumber && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                No deal headers found for deal number &quot;{searchDealNumber}&quot;
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Create Deal Header */}
            <Card>
                <CardHeader>
                    <CardTitle>Create Deal Header</CardTitle>
                    <CardDescription>Create a new deal header</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newDealNumber">Deal Number</Label>
                        <Input
                            id="newDealNumber"
                            placeholder="Enter new deal number"
                            value={newDealNumber}
                            onChange={(e) => setNewDealNumber(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleCreate}
                        disabled={createMutation.isPending || !newDealNumber.trim()}
                    >
                        {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create'}
                    </Button>

                    {createMutation.isSuccess && (
                        <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                                Deal header created successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    {createMutation.error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Create failed: {createMutation.error.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* All Deal Headers */}
            <Card>
                <CardHeader>
                    <CardTitle>All Deal Headers</CardTitle>
                    <CardDescription>View and manage all deal headers</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingAll ? (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="ml-2">Loading deal headers...</span>
                        </div>
                    ) : errorAll ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Failed to load deal headers: {errorAll.message}
                            </AlertDescription>
                        </Alert>
                    ) : allDealHeaders && allDealHeaders.length > 0 ? (
                        <div className="space-y-2">
                            {allDealHeaders.map((header) => (
                                <div key={header.id} className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <strong>ID:</strong> {header.id}, <strong>Deal Number:</strong> {header.deal_number}
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedDealHeaderId(header.id);
                                                setUpdateDealNumber(header.deal_number);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(header.id)}
                                            disabled={deleteMutation.isPending}
                                        >
                                            {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                No deal headers found.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Update Deal Header */}
            {selectedDealHeaderId && (
                <Card>
                    <CardHeader>
                        <CardTitle>Update Deal Header</CardTitle>
                        <CardDescription>Update deal header ID: {selectedDealHeaderId}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="updateDealNumber">Deal Number</Label>
                            <Input
                                id="updateDealNumber"
                                placeholder="Enter updated deal number"
                                value={updateDealNumber}
                                onChange={(e) => setUpdateDealNumber(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                onClick={handleUpdate}
                                disabled={updateMutation.isPending || !updateDealNumber.trim()}
                            >
                                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedDealHeaderId(null);
                                    setUpdateDealNumber('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>

                        {updateMutation.isSuccess && (
                            <Alert>
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Deal header updated successfully!
                                </AlertDescription>
                            </Alert>
                        )}

                        {updateMutation.error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Update failed: {updateMutation.error.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
