
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, MoreHorizontal, Users, ChevronsUpDown, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import { mockTeams, users as allUsers, mockCampaigns } from "@/lib/data";
import type { Team } from "@/lib/types";
import { cn } from "@/lib/utils";

const teamSchema = z.object({
    team_name: z.string().min(1, "Team name is required."),
    description: z.string().optional(),
    leader_id: z.string().min(1, "Team leader is required."),
    member_ids: z.array(z.string()).min(1, "At least one member is required."),
    campaign_id: z.string().min(1, "A campaign must be assigned.")
});

export default function TeamsManagementPage() {
  const [teams, setTeams] = React.useState<Team[]>(mockTeams);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTeam, setEditingTeam] = React.useState<Team | null>(null);

  const { toast } = useToast();

  const supervisors = allUsers.filter(u => u.role === 'Supervisor' || u.role === 'Admin');
  const agents = allUsers.filter(u => u.role === 'Agent');

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      team_name: "",
      description: "",
      leader_id: "",
      member_ids: [],
      campaign_id: ""
    }
  });

  const handleCreateNew = () => {
    setEditingTeam(null);
    form.reset({
      team_name: "",
      description: "",
      leader_id: "",
      member_ids: [],
      campaign_id: ""
    });
    setIsFormOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    form.reset({
        team_name: team.team_name,
        description: team.description,
        leader_id: team.leader_id,
        member_ids: team.members.map(m => m.user_id),
        campaign_id: team.campaign_id,
    });
    setIsFormOpen(true);
  };

  const onSubmit = (values: z.infer<typeof teamSchema>) => {
    const leader = supervisors.find(s => s.id === values.leader_id);
    const campaign = mockCampaigns.find(c => String(c.id) === values.campaign_id);
    
    if(editingTeam) {
        // Update logic
        const updatedTeam = {
            ...editingTeam,
            team_name: values.team_name,
            description: values.description,
            leader_id: values.leader_id,
            leader_name: leader?.name || 'Unknown',
            members: values.member_ids.map(id => {
                const agent = agents.find(a => a.id === id);
                return { user_id: id, name: agent?.name || 'Unknown', role: 'Agent' };
            }),
            campaign_id: values.campaign_id,
            campaign_name: campaign?.name || 'Unknown',
        };
        setTeams(teams.map(t => t.team_id === editingTeam.team_id ? updatedTeam : t));
        toast({ title: "Team Updated", description: `${values.team_name} has been updated successfully.` });
    } else {
        // Create logic
        const newTeam: Team = {
            team_id: `team-${Date.now()}`,
            org_id: 'org-1', // Mock org
            team_name: values.team_name,
            description: values.description || '',
            leader_id: values.leader_id,
            leader_name: leader?.name || 'Unknown',
            members: values.member_ids.map(id => {
                const agent = agents.find(a => a.id === id);
                return { user_id: id, name: agent?.name || 'Unknown', role: 'Agent' };
            }),
            campaign_id: values.campaign_id,
            campaign_name: campaign?.name || 'Unknown',
            created_at: new Date().toISOString().split('T')[0]
        };
        setTeams([newTeam, ...teams]);
        toast({ title: "Team Created", description: `${values.team_name} has been created successfully.` });
    }
    setIsFormOpen(false);
  };
  
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Teams Management</h1>
                <p className="text-muted-foreground">Create and manage teams, assign leaders and agents.</p>
            </div>
            <Button onClick={handleCreateNew}><PlusCircle className="mr-2 h-4 w-4"/> Create Team</Button>
       </div>
      <Card>
        <CardHeader>
            <CardTitle>All Teams</CardTitle>
            <CardDescription>A list of all teams in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search teams..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Team Leader</TableHead>
                    <TableHead># of Members</TableHead>
                    <TableHead>Campaign Assigned</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teams.map(team => (
                    <TableRow key={team.team_id} className="cursor-pointer" onClick={() => handleEdit(team)}>
                        <TableCell className="font-medium">{team.team_name}</TableCell>
                        <TableCell>{team.leader_name}</TableCell>
                        <TableCell>{team.members.length}</TableCell>
                        <TableCell>{team.campaign_name}</TableCell>
                        <TableCell>{team.created_at}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={(e) => {e.stopPropagation(); handleEdit(team);}}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Team Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>{editingTeam ? 'Edit Team' : 'Create New Team'}</DialogTitle>
                <DialogDescription>
                    {editingTeam ? `Update details for ${editingTeam.team_name}.` : "Fill out the form to create a new team."}
                </DialogDescription>
            </DialogHeader>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                     <FormField
                        control={form.control}
                        name="team_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team Name</FormLabel>
                                <FormControl><Input {...field} placeholder="e.g. Alpha Collections" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Textarea {...field} placeholder="A short description of the team's purpose." /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="leader_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Leader</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a supervisor" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {supervisors.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="campaign_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assigned Campaign</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a campaign" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {mockCampaigns.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="member_ids"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team Members</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn("w-full justify-between", !field.value?.length && "text-muted-foreground")}
                                        >
                                            {field.value?.length > 0 ? `${field.value.length} agent(s) selected` : "Select agents"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search agents..." />
                                            <CommandEmpty>No agents found.</CommandEmpty>
                                            <CommandList>
                                                <CommandGroup>
                                                    {agents.map((agent) => (
                                                    <CommandItem
                                                        key={agent.id}
                                                        onSelect={() => {
                                                            const selected = field.value || [];
                                                            const isSelected = selected.includes(agent.id);
                                                            const newSelection = isSelected
                                                                ? selected.filter((id) => id !== agent.id)
                                                                : [...selected, agent.id];
                                                            field.onChange(newSelection);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn("mr-2 h-4 w-4", (field.value || []).includes(agent.id) ? "opacity-100" : "opacity-0")}
                                                        />
                                                        {agent.name}
                                                    </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                     <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Team</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
