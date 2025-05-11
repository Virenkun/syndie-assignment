"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { LeadDetails } from "@/components/leads/lead-details";
import { LeadConversations } from "@/components/leads/lead-conversations";
import { LeadAISuggestions } from "@/components/leads/lead-ai-suggestions";
import { EditLeadDialog } from "@/components/leads/edit-lead-dialog";
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog";
import { AddConversationDialog } from "@/components/leads/add-conversation-dialog";
import { ConversationsTable } from "@/components/leads/conversations-table";
import { useGetLeadQuery } from "@/lib/leads-api";
import { useState } from "react";

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const { data: lead, isLoading } = useGetLeadQuery(leadId);
  const [isEditLeadOpen, setIsEditLeadOpen] = useState(false);
  const [isDeleteLeadOpen, setIsDeleteLeadOpen] = useState(false);
  const [isAddConversationOpen, setIsAddConversationOpen] = useState(false);

  // Refresh lead after edit
  const handleEditClose = (open: boolean) => {
    setIsEditLeadOpen(open);
  };

  // After delete, redirect to leads list
  const handleDeleteClose = (open: boolean) => {
    setIsDeleteLeadOpen(open);
    if (!open) {
      // Check if lead still exists
      fetch(`/api/leads/${leadId}`).then((res) => {
        if (!res.ok) window.location.href = "/leads";
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground text-lg">Loading lead...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6 bg-gradient-to-br from-muted/40 to-background min-h-screen">
        <div className="flex items-center space-x-2">
          <Link href="/leads">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leads
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground text-lg">Lead not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-0 md:p-0 pt-0 bg-gradient-to-br from-muted/40 to-background min-h-screen">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/60 px-4 md:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/leads">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border/60 hover:bg-primary/10 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              {lead.name}
            </h2>
            <Badge
              variant="secondary"
              className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium"
            >
              {lead.stage}
            </Badge>
            {lead.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-accent/30 text-accent-foreground border border-accent/40 rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              onClick={() => setIsAddConversationOpen(true)}
              className="rounded-lg shadow-sm bg-primary/90 hover:bg-primary/80 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Conversation
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditLeadOpen(true)}
              className="rounded-lg shadow-sm hover:bg-primary/10 transition-colors"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteLeadOpen(true)}
              className="rounded-lg shadow-sm hover:bg-destructive/90 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 px-4 md:px-8 mt-4">
        <Card className="md:col-span-2 border border-border/40 shadow-lg dark:bg-card/10 backdrop-blur-md rounded-2xl">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-5xl text-primary font-bold">
              Lead Information
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 text-lg">
              Detailed information about{" "}
              <span className="font-semibold">{lead.name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <LeadDetails lead={lead} />
          </CardContent>
        </Card>

        <Card className="border border-border/40 shadow-lg dark:bg-card/30 backdrop-blur-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/40">
            <div>
              <CardTitle className="text-3xl text-primary font-semibold">
                AI Suggestions
              </CardTitle>
              <CardDescription className="text-muted-foreground/80">
                Smart next steps for this lead
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Refresh AI Suggestions"
            >
              <RefreshCw className="h-4 w-4 text-primary" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <LeadAISuggestions leadId={lead.id} />
          </CardContent>
        </Card>
      </div>

      <div className="px-4 md:px-8">
        <Tabs defaultValue="conversations" className="space-y-4 mt-6">
          <TabsList className="bg-background border border-border/40 rounded-lg shadow-sm">
            <TabsTrigger
              value="conversations"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-4 py-2 transition-colors"
            >
              Conversations
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-4 py-2 transition-colors"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-4 py-2 transition-colors"
            >
              Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="conversations" className="space-y-4">
            <Tabs defaultValue="cards" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Conversation History</h3>
                <div className="flex items-center space-x-2">
                  <TabsList className="bg-background border border-border/40 rounded-lg">
                    <TabsTrigger
                      value="cards"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Cards
                    </TabsTrigger>
                    <TabsTrigger
                      value="table"
                      className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Table
                    </TabsTrigger>
                  </TabsList>
                  <Button onClick={() => setIsAddConversationOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Conversation
                  </Button>
                </div>
              </div>
              <TabsContent value="cards" className="p-0">
                <LeadConversations leadId={lead.id} />
              </TabsContent>
              <TabsContent value="table" className="p-0">
                <ConversationsTable leadId={lead.id} />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <Card className="rounded-xl border border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Manage tasks related to this lead
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-base">
                  Task management will be available in the next update
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            <Card className="rounded-xl border border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>
                  Keep track of important notes about this lead
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-base">
                  Notes feature will be available in the next update
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <EditLeadDialog
        lead={lead}
        open={isEditLeadOpen}
        onOpenChange={handleEditClose}
      />

      <DeleteLeadDialog
        leadId={lead.id}
        leadName={lead.name}
        open={isDeleteLeadOpen}
        onOpenChange={handleDeleteClose}
      />

      <AddConversationDialog
        leadId={lead.id}
        open={isAddConversationOpen}
        onOpenChange={setIsAddConversationOpen}
      />
    </div>
  );
}
