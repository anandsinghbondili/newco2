'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

/**
 * Dummy user object – replace with real data fetched from your API.
 */
const mockUser = {
    fullName: "Jane Doe",
    username: "jane",
    bio: "Full‑stack developer. Coffee lover ☕. Amateur climber 🧗‍♀️.",
    location: "Bengaluru, IN",
    website: "https://jane.dev",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    joinDate: "2023‑02‑14",
    stats: {
        posts: 128,
        followers: 560,
        following: 180,
    },
    roles: ["Pro", "Moderator"],
};

export default function ProfilePage() {
    const [user, setUser] = useState<typeof mockUser | null>(null);

    useEffect(() => {
        // TODO: replace with real API call
        setUser(mockUser);
    }, []);

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8 max‑w‑4xl">
            <Card className="shadow‑lg">
                <CardHeader className="flex flex‑col md:flex‑row md:items‑center gap‑4 md:gap‑6">
                    <Avatar className="h‑24 w‑24">
                        <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                        <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex‑1 space‑y‑2 min‑w‑0">
                        <CardTitle className="truncate text‑2xl font‑semibold">{user.fullName}</CardTitle>
                        <p className="text‑muted‑foreground truncate">@{user.username}</p>

                        <div className="flex flex‑wrap gap‑2">
                            {user.roles.map((role) => (
                                <Badge key={role}>{role}</Badge>
                            ))}
                        </div>
                    </div>

                    <Button asChild className="mt‑4 md:mt‑0 w‑36">
                        <a href="/settings">Edit Profile</a>
                    </Button>
                </CardHeader>

                <Separator />

                <CardContent className="grid grid‑cols‑1 md:grid‑cols‑3 gap‑6 py‑6">
                    {/* Bio */}
                    <div className="md:col‑span‑2 space‑y‑2">
                        <h3 className="font‑medium">About</h3>
                        <p className="text‑sm leading‑relaxed break‑words whitespace‑pre‑wrap" >
                            {user.bio}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex md:flex‑col justify‑around md:justify‑start gap‑4 text‑center md:text‑left">
                        {Object.entries(user.stats).map(([label, value]) => (
                            <div key={label}>
                                <p className="text‑2xl font‑bold leading‑none">{value}</p>
                                <p className="uppercase tracking‑wider text‑xs text‑muted‑foreground">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className="flex flex‑col gap‑2 md:flex‑row md:gap‑6 py‑6 text‑sm">
                    <div>
                        <p className="font‑medium">Location</p>
                        <p className="text‑muted‑foreground">{user.location}</p>
                    </div>
                    <div>
                        <p className="font‑medium">Website</p>
                        <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text‑primary hover:underline break‑all"
                        >
                            {user.website.replace(/^https?:\/\//, "")}
                        </a>
                    </div>
                    <div>
                        <p className="font‑medium">Member since</p>
                        <p className="text‑muted‑foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}