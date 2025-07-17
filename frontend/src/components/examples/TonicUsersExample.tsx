// Example component showing how to use Tonic API
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    useTonicUsers,
    useCreateTonicUser,
    useUpdateTonicUser,
    useDeleteTonicUser
} from '@/hooks/useTonic';
import { TonicUser } from '@/lib/tonic-api';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

export default function TonicUsersExample() {
    const [editingUser, setEditingUser] = useState<TonicUser | null>(null);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Hooks
    const { data: users, isLoading, error } = useTonicUsers();
    const createUserMutation = useCreateTonicUser();
    const updateUserMutation = useUpdateTonicUser();
    const deleteUserMutation = useDeleteTonicUser();

    // Handlers
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            await createUserMutation.mutateAsync(newUser);
            setNewUser({ name: '', email: '' });
            setShowCreateForm(false);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            await updateUserMutation.mutateAsync({
                id: editingUser.id,
                userData: {
                    name: editingUser.name,
                    email: editingUser.email
                }
            });
            setEditingUser(null);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await deleteUserMutation.mutateAsync(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading Tonic users...</span>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Failed to load users: {error.message}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tonic API Users</h2>
                <Button
                    onClick={() => setShowCreateForm(true)}
                    disabled={showCreateForm}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                </Button>
            </div>

            {/* Create User Form */}
            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create New User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    type="submit"
                                    disabled={createUserMutation.isPending}
                                >
                                    {createUserMutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create User'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Users List */}
            <div className="grid gap-4">
                {users?.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="pt-6">
                            {editingUser?.id === user.id ? (
                                <form onSubmit={handleUpdateUser} className="space-y-4">
                                    <div>
                                        <Label htmlFor={`edit-name-${user.id}`}>Name</Label>
                                        <Input
                                            id={`edit-name-${user.id}`}
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser(prev =>
                                                prev ? { ...prev, name: e.target.value } : null
                                            )}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`edit-email-${user.id}`}>Email</Label>
                                        <Input
                                            id={`edit-email-${user.id}`}
                                            type="email"
                                            value={editingUser.email}
                                            onChange={(e) => setEditingUser(prev =>
                                                prev ? { ...prev, email: e.target.value } : null
                                            )}
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={updateUserMutation.isPending}
                                        >
                                            {updateUserMutation.isPending ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                'Save'
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingUser(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ID: {user.id}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteUser(user.id)}
                                            disabled={deleteUserMutation.isPending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {users?.length === 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            No users found. Create your first user to get started.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
