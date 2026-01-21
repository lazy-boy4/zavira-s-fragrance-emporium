'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Edit, Trash2, Mail, Shield, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock team data
const mockTeam = [
    {
        id: 'user_1',
        name: 'Sarah Chen',
        email: 'sarah@zavira.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        lastActive: '2024-01-20T10:30:00',
    },
    {
        id: 'user_2',
        name: 'Michael Ross',
        email: 'michael@zavira.com',
        role: 'editor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        lastActive: '2024-01-20T09:15:00',
    },
    {
        id: 'user_3',
        name: 'Emma Wilson',
        email: 'emma@zavira.com',
        role: 'editor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
        lastActive: '2024-01-19T16:45:00',
    },
    {
        id: 'user_4',
        name: 'James Lee',
        email: 'james@zavira.com',
        role: 'viewer',
        avatar: null,
        lastActive: '2024-01-18T14:20:00',
    },
];

const roleConfig = {
    admin: { label: 'Admin', color: 'bg-red-500/10 text-red-500', icon: Shield },
    editor: { label: 'Editor', color: 'bg-blue-500/10 text-blue-500', icon: UserCog },
    viewer: { label: 'Viewer', color: 'bg-muted text-muted-foreground', icon: UserCog },
};

/**
 * Team Management Page
 */
export default function TeamPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Team</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage team members and permissions
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            {/* Role overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Admins
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {mockTeam.filter((m) => m.role === 'admin').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Editors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {mockTeam.filter((m) => m.role === 'editor').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Viewers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {mockTeam.filter((m) => m.role === 'viewer').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team list */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-display tracking-wider">Team Members</CardTitle>
                    <CardDescription>
                        {mockTeam.length} members in your organization
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {mockTeam.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={member.avatar || undefined} alt={member.name} />
                                        <AvatarFallback>
                                            {member.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {member.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge
                                        variant="secondary"
                                        className={roleConfig[member.role as keyof typeof roleConfig].color}
                                    >
                                        {roleConfig[member.role as keyof typeof roleConfig].label}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground hidden md:block">
                                        Last active:{' '}
                                        {new Date(member.lastActive).toLocaleDateString()}
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="gap-2">
                                                <Edit className="h-4 w-4" /> Edit Role
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 text-destructive">
                                                <Trash2 className="h-4 w-4" /> Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
