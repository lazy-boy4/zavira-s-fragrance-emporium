import { useState } from "react";
import { Plus, MoreHorizontal, Edit, Trash2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * TeamManagement - Manage admin users and permissions
 * 
 * Roles: Owner (full access), Manager (limited), Staff (view only)
 * 
 * Backend Integration:
 * - GET /api/admin/team - List team members
 * - POST /api/admin/team/invite - Invite new member
 * - PATCH /api/admin/team/:id/role - Update role
 * - DELETE /api/admin/team/:id - Remove member
 */

const mockTeam = [
  { id: "usr_1", name: "Admin User", email: "admin@zavira.com", role: "owner", status: "active", lastActive: "Now" },
  { id: "usr_2", name: "Jane Manager", email: "jane@zavira.com", role: "manager", status: "active", lastActive: "2 hours ago" },
  { id: "usr_3", name: "Bob Staff", email: "bob@zavira.com", role: "staff", status: "active", lastActive: "1 day ago" },
  { id: "usr_4", name: "Pending User", email: "pending@example.com", role: "manager", status: "pending", lastActive: "Never" },
];

const roleColors: Record<string, string> = {
  owner: "bg-primary text-primary-foreground",
  manager: "bg-blue-500/10 text-blue-500",
  staff: "bg-muted text-muted-foreground",
};

export default function TeamManagement() {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Team</h1>
          <p className="text-muted-foreground mt-1">Manage team members and permissions</p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Invite Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-4">
              <div><Label>Email</Label><Input placeholder="email@example.com" /></div>
              <div>
                <Label>Role</Label>
                <Select defaultValue="staff">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setInviteOpen(false)}>Send Invitation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role descriptions */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { role: "Owner", desc: "Full access to all settings, billing, and team management" },
          { role: "Manager", desc: "Manage products, orders, customers, and content" },
          { role: "Staff", desc: "View orders and customer information only" },
        ].map((r) => (
          <Card key={r.role}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">{r.role}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeam.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge className={roleColors[member.role]}>{member.role}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell>
                    {member.role !== "owner" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Change Role</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
