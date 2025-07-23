'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
    const [displayName, setDisplayName] = useState("Jane Doe");
    const [email, setEmail] = useState("jane.doe@company.com");
    const [bio, setBio] = useState("Full-stack developer with 5+ years of experience. Passionate about building scalable web applications and mentoring junior developers.");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [themeDark, setThemeDark] = useState(false);
    const [language, setLanguage] = useState("en");
    const [timezone, setTimezone] = useState("UTC-8");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
                <Avatar className="h-20 w-20 ring-2 ring-primary/10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=47" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and settings</p>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* General */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information and public profile</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="displayName">Display name</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <Button className="w-full md:w-auto">Save changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>Manage your password and security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 max-w-sm">
                                <div className="grid gap-2">
                                    <Label htmlFor="currentPassword">Current password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="newPassword">New password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <Button>Update password</Button>
                            </div>
                            <div className="mt-6 pt-6 border-t">
                                <h3 className="font-medium mb-4">Active Sessions</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Chrome - MacOS</p>
                                            <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
                                        </div>
                                        <Badge>Current</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                                </div>
                                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="space-y-0.5">
                                    <Label>Push Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                                </div>
                                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Appearance & Localization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between py-2">
                                <div className="space-y-0.5">
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                                </div>
                                <Switch checked={themeDark} onCheckedChange={setThemeDark} />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label>Language</Label>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Timezone</Label>
                                    <Select value={timezone} onValueChange={setTimezone}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                                            <SelectItem value="UTC+0">UTC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}