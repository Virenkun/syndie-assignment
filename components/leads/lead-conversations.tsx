"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/lib/types";
import {
  Mail,
  Phone,
  Linkedin,
  UserRound,
  Calendar,
  Clock,
  Plus,
  Loader2,
} from "lucide-react";
import { AddConversationDialog } from "@/components/leads/add-conversation-dialog";
import {
  useGetConversationsQuery,
  useAddConversationMutation,
} from "@/lib/conversations-api";

interface LeadConversationsProps {
  leadId: string;
}

export function LeadConversations({ leadId }: LeadConversationsProps) {
  const [isAddConversationOpen, setIsAddConversationOpen] = useState(false);

  // Get conversations from API
  const { data, isLoading, isFetching, refetch } = useGetConversationsQuery({
    leadId,
  });

  // Add conversation mutation
  const [addConversation] = useAddConversationMutation();

  // Get conversations from API response
  const conversations = data?.conversations || [];

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5" />;
      case "call":
        return <Phone className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "in_person":
        return <UserRound className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
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

  const handleAddConversation = async (newConversation: Conversation) => {
    try {
      await addConversation(newConversation).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to add conversation:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading conversations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No conversations recorded yet
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsAddConversationOpen(true)}
            >
              Record your first conversation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <Card key={conversation.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1 p-2 bg-primary/10 rounded-full">
                    {getConversationIcon(conversation.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {conversation.type.charAt(0).toUpperCase() +
                            conversation.type.slice(1).replace("_", " ")}
                        </Badge>
                        {conversation.followUpDate && (
                          <Badge variant="secondary" className="ml-2 mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            Follow-up: {formatDate(conversation.followUpDate)}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(conversation.timestamp)}
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        {formatTime(conversation.timestamp)}
                      </div>
                    </div>
                    <p className="mt-2 whitespace-pre-line">
                      {conversation.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {isFetching && (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Updating...</span>
            </div>
          )}
        </div>
      )}

      <AddConversationDialog
        leadId={leadId}
        open={isAddConversationOpen}
        onOpenChange={setIsAddConversationOpen}
        onConversationAdded={handleAddConversation}
      />
    </div>
  );
}
