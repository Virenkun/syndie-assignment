export type LeadStage = 'New' | 'Contacted' | 'Converted' | 'Lost';

export type ConversationType = 'email' | 'call' | 'linkedin' | 'in_person';

export interface Lead {
  id: string;
  name: string;
  email: string;
  linkedin: string;
  company: string;
  notes: string;
  tags: string[];
  stage: LeadStage;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  leadId: string;
  type: ConversationType;
  content: string;
  timestamp: Date;
  followUpDate?: Date;
}

export interface AISuggestion {
  leadId: string;
  suggestionText: string;
  generatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}