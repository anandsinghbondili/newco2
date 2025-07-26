"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Building2, Mail, Phone, MapPin, Globe, Calendar } from "lucide-react";
import RCXSimplePanel from "@/components/ext/panel/RCXSimplePanel";
import RCXPriButton from "@/components/ext/buttons/RCXPriButton";

const mockUser = {
  fullName: "Jane Doe",
  username: "jane.doe",
  email: "jane.doe@company.com",
  phone: "+1 (555) 123-4567",
  title: "Senior Software Engineer",
  department: "Engineering",
  bio: "Experienced full-stack developer specializing in React, Node.js and cloud architecture. Leading the frontend team for our core product platform.",
  location: "San Francisco, CA",
  office: "HQ - Building A, Floor 3",
  avatarUrl: "https://i.pravatar.cc/150?img=47",
  joinDate: "2023-02-14",
  stats: {
    projectsCompleted: 24,
    tasksInProgress: 5,
    teamMembers: 8,
  },
  roles: ["Team Lead", "Frontend", "Architecture"],
  skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
  recentActivity: [
    {
      type: "Project",
      name: "Customer Portal Redesign",
      status: "In Progress",
      date: "2024-01-15",
    },
    {
      type: "Code Review",
      name: "API Integration PR #234",
      status: "Completed",
      date: "2024-01-14",
    },
    {
      type: "Release",
      name: "v2.1.0 Frontend Deploy",
      status: "Successful",
      date: "2024-01-10",
    },
  ],
};

export default function ProfilePage() {
  const [user, setUser] = useState<typeof mockUser | null>(null);

  useEffect(() => {
    // TODO: Replace with real API call
    setUser(mockUser);
  }, []);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary/10">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2 min-w-0">
              <CardTitle className="text-2xl font-semibold">
                {user.fullName}
              </CardTitle>
              <p className="text-muted-foreground">{user.title}</p>
              <div className="flex flex-wrap gap-2">
                {user.roles.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <RCXPriButton onClick={() => {}}>Edit Profile</RCXPriButton>
          </CardHeader>

          <Separator />

          <CardContent className="py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{user.department}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{user.office}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">About</h3>
              <p className="text-sm leading-relaxed">{user.bio}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Activity Panel */}
        <div className="space-y-6">
          <RCXSimplePanel title="Statistics" className="shadow-lg">
            <div className="grid grid-cols-3 gap-4 p-4">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                </div>
              ))}
            </div>
          </RCXSimplePanel>

          <RCXSimplePanel title="Recent Activity" className="shadow-lg">
            <div className="space-y-4 p-4">
              {user.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-muted-foreground">{activity.type}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "Completed"
                        ? "secondary"
                        : activity.status === "In Progress"
                        ? "outline"
                        : "default"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </RCXSimplePanel>
        </div>
      </div>
    </div>
  );
}
