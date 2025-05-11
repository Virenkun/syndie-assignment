"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Linkedin,
  UserRound,
  Plus,
  Filter,
  Loader2,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import { mockLeads } from "@/lib/mock-data";
import { AddConversationDialog } from "./add-conversation-dialog";
import {
  useGetConversationsQuery,
  useAddConversationMutation,
} from "@/lib/conversations-api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationsTableProps {
  leadId?: string; // Optional - if provided, filters by lead
  limit?: number; // Optional - limits number of conversations shown
}

export function ConversationsTable({ leadId, limit }: ConversationsTableProps) {
  const [isAddConversationOpen, setIsAddConversationOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Get conversations from API
  const { data, isLoading, isFetching, refetch } = useGetConversationsQuery({
    leadId,
    type: activeFilter || undefined,
  });

  // Add conversation mutation
  const [addConversation] = useAddConversationMutation();

  // Get conversations from API response
  const conversations = data?.conversations || [];

  // Apply limit if provided
  const displayedConversations = limit
    ? conversations.slice(0, limit)
    : conversations;

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "in_person":
        return <UserRound className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filterByType = (type: string | null) => {
    setActiveFilter(type);
  };

  const handleAddConversation = async (newConversation: Conversation) => {
    try {
      await addConversation(newConversation).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to add conversation:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Conversations</h3>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {activeFilter
                  ? activeFilter.charAt(0).toUpperCase() +
                    activeFilter.slice(1).replace("_", " ")
                  : "All Types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => filterByType(null)}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterByType("email")}>
                Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterByType("call")}>
                Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterByType("linkedin")}>
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => filterByType("in_person")}>
                In Person
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {leadId && (
            <Button size="sm" onClick={() => setIsAddConversationOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Conversation
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading conversations...</span>
        </div>
      ) : displayedConversations.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">No conversations found</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="w-[50%]">Content</TableHead>
                {!leadId && <TableHead>Lead</TableHead>}
                <TableHead>Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedConversations.map((conversation) => {
                const lead = mockLeads.find(
                  (l) => l.id === conversation.leadId
                );
                return (
                  <TableRow key={conversation.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 p-1 bg-primary/10 rounded-full">
                          {getConversationIcon(conversation.type)}
                        </div>
                        <span className="capitalize">
                          {conversation.type.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {formatDate(conversation.timestamp)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2">{conversation.content}</p>
                    </TableCell>
                    {!leadId && (
                      <TableCell>{lead?.name || "Unknown Lead"}</TableCell>
                    )}
                    <TableCell>
                      {conversation.followUpDate ? (
                        <Badge variant="outline">
                          {formatDate(conversation.followUpDate)}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {isFetching && (
            <div className="flex justify-center items-center p-4 border-t">
              <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Updating...</span>
            </div>
          )}
        </div>
      )}

      {leadId && (
        <AddConversationDialog
          leadId={leadId}
          open={isAddConversationOpen}
          onOpenChange={setIsAddConversationOpen}
          onConversationAdded={handleAddConversation}
        />
      )}
    </div>
  );
}
