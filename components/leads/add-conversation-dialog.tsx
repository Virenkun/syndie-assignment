"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";
import { useAddConversationMutation } from "@/lib/conversations-api";

interface AddConversationDialogProps {
  leadId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConversationAdded?: (conversation: Conversation) => void;
}

export function AddConversationDialog({
  leadId,
  open,
  onOpenChange,
  onConversationAdded,
}: AddConversationDialogProps) {
  const [formData, setFormData] = useState<Partial<Conversation>>({
    leadId,
    type: "email",
    content: "",
    timestamp: new Date().toISOString(),
  });
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(undefined);
  const [addConversation, { isLoading }] = useAddConversationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new conversation object
    const newConversation: Partial<Conversation> = {
      leadId,
      type: formData.type as "email" | "call" | "linkedin" | "in_person",
      content: formData.content || "",
      timestamp: new Date().toISOString(),
      followUpDate: followUpDate?.toISOString(),
    };

    try {
      // Send the new conversation to the API
      const result = await addConversation(newConversation).unwrap();

      // Call the callback if provided
      if (onConversationAdded && result.conversation) {
        onConversationAdded(result.conversation);
      }

      // Close the dialog
      onOpenChange(false);

      // Reset form
      setFormData({
        leadId,
        type: "email",
        content: "",
        timestamp: new Date().toISOString(),
      });
      setFollowUpDate(undefined);
    } catch (error) {
      console.error("Failed to add conversation:", error);
      // You could add error handling here (e.g., show a toast notification)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Conversation</DialogTitle>
            <DialogDescription>
              Record a new conversation with this lead.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select conversation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="in_person">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Notes
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="col-span-3"
                rows={5}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followUp" className="text-right">
                Follow-up
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !followUpDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {followUpDate
                        ? format(followUpDate, "PPP")
                        : "Set follow-up date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={followUpDate}
                      onSelect={setFollowUpDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {followUpDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setFollowUpDate(undefined)}
                  >
                    Clear follow-up date
                  </Button>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Conversation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
