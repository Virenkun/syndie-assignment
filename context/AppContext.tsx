"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  mockLeads,
  mockConversations,
  mockTags,
  createLead,
  createConversation,
} from "../utils/mockData";
import { Conversation, Lead, LeadStage, Tag } from "../types";

interface AppContextType {
  // Data
  leads: Lead[];
  conversations: Conversation[];
  tags: Tag[];

  // Lead actions
  addLead: (lead: Partial<Lead>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  // Conversation actions
  addConversation: (conversation: Partial<Conversation>) => void;

  // Filters and views
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedStage: LeadStage | "All";
  setSelectedStage: (stage: LeadStage | "All") => void;
  viewMode: "table" | "kanban";
  setViewMode: (mode: "table" | "kanban") => void;

  // UI state
  isLeadFormOpen: boolean;
  setIsLeadFormOpen: (isOpen: boolean) => void;
  currentLeadId: string | null;
  setCurrentLeadId: (id: string | null) => void;
  isConversationFormOpen: boolean;
  setIsConversationFormOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Data state
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [tags, setTags] = useState<Tag[]>(mockTags);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState<LeadStage | "All">("All");
  const [viewMode, setViewMode] = useState<"table" | "kanban">(
    (localStorage.getItem("viewMode") as "table" | "kanban") || "table"
  );

  // UI state
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [isConversationFormOpen, setIsConversationFormOpen] = useState(false);

  // Persist view mode
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Lead actions
  const addLead = (leadData: Partial<Lead>) => {
    const newLead = createLead(leadData);
    setLeads([...leads, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates, updatedAt: new Date() } : lead
      )
    );
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    setConversations(conversations.filter((conv) => conv.leadId !== id));
  };

  // Conversation actions
  const addConversation = (conversationData: Partial<Conversation>) => {
    const newConversation = createConversation(conversationData);
    setConversations([...conversations, newConversation]);

    // Update lead's updatedAt time
    if (conversationData.leadId) {
      updateLead(conversationData.leadId, { updatedAt: new Date() });
    }
  };

  const value = {
    // Data
    leads,
    conversations,
    tags,

    // Lead actions
    addLead,
    updateLead,
    deleteLead,

    // Conversation actions
    addConversation,

    // Filters and views
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    selectedStage,
    setSelectedStage,
    viewMode,
    setViewMode,

    // UI state
    isLeadFormOpen,
    setIsLeadFormOpen,
    currentLeadId,
    setCurrentLeadId,
    isConversationFormOpen,
    setIsConversationFormOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
