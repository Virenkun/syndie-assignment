"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationsTable } from "@/components/leads/conversations-table";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Home, MessageSquare } from "lucide-react";

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb className="mb-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <Home className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/leads">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/conversations" isCurrentPage>
                Conversations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Conversations</h1>
            <Badge variant="secondary">All Leads</Badge>
          </div>
          <p className="text-muted-foreground">
            View and manage all communication history with leads across your
            organization.
          </p>
        </div>
      </div>

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">
            <MessageSquare className="h-4 w-4 mr-2" />
            Table View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="p-0 mt-4">
          <ConversationsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
