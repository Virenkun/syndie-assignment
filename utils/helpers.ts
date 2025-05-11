import { ConversationType, Lead, LeadStage } from '../types';

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const getStageColor = (stage: LeadStage): string => {
  switch (stage) {
    case 'New':
      return 'bg-blue-100 text-blue-800';
    case 'Contacted':
      return 'bg-yellow-100 text-yellow-800';
    case 'Converted':
      return 'bg-green-100 text-green-800';
    case 'Lost':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getConversationIcon = (type: ConversationType): string => {
  switch (type) {
    case 'email':
      return 'mail';
    case 'call':
      return 'phone';
    case 'linkedin':
      return 'linkedin';
    case 'in_person':
      return 'users';
    default:
      return 'message-circle';
  }
};

export const getAiSuggestion = (lead: Lead): string => {
  // Mock AI suggestions based on lead stage
  switch (lead.stage) {
    case 'New':
      return `Send ${lead.name} an intro email explaining how we helped similar companies in the ${lead.company} industry.`;
    case 'Contacted':
      return `Follow up with ${lead.name} to schedule a demo as it's been a few days since your last outreach.`;
    case 'Converted':
      return `Check in with ${lead.name} to ensure successful onboarding and explore upsell opportunities.`;
    case 'Lost':
      return `Reconnect with ${lead.name} in 3 months with our new feature announcement.`;
    default:
      return 'Consider reaching out to establish initial contact.';
  }
};

export const filterLeads = (leads: Lead[], search: string, selectedTags: string[], selectedStage: LeadStage | 'All'): Lead[] => {
  return leads.filter((lead) => {
    const matchesSearch = search === '' 
      || lead.name.toLowerCase().includes(search.toLowerCase())
      || lead.company.toLowerCase().includes(search.toLowerCase())
      || lead.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 
      || selectedTags.some(tag => lead.tags.includes(tag));
    
    const matchesStage = selectedStage === 'All' 
      || lead.stage === selectedStage;
    
    return matchesSearch && matchesTags && matchesStage;
  });
};