import { AISuggestion, Conversation, Lead, Tag } from '../types';
import { generateId } from './helpers';

export const mockTags: Tag[] = [
  { id: '1', name: 'High Priority', color: 'red' },
  { id: '2', name: 'Decision Maker', color: 'purple' },
  { id: '3', name: 'Enterprise', color: 'blue' },
  { id: '4', name: 'SMB', color: 'green' },
  { id: '5', name: 'Technical', color: 'orange' },
  { id: '6', name: 'Finance', color: 'indigo' },
  { id: '7', name: 'Healthcare', color: 'teal' },
  { id: '8', name: 'Education', color: 'pink' },
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acme.co',
    linkedin: 'linkedin.com/in/johnsmith',
    company: 'Acme Inc',
    notes: 'Met at SaaS Conference, interested in enterprise plan',
    tags: ['Decision Maker', 'Enterprise'],
    stage: 'New',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techlabs.io',
    linkedin: 'linkedin.com/in/sarahjohnson',
    company: 'Tech Labs',
    notes: 'Wants to upgrade from basic to premium plan',
    tags: ['High Priority', 'Decision Maker', 'SMB'],
    stage: 'Contacted',
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-14')
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@globalhealth.org',
    linkedin: 'linkedin.com/in/michaelbrown',
    company: 'Global Health',
    notes: 'Discussing implementation timeline and team training',
    tags: ['Healthcare', 'Enterprise'],
    stage: 'Converted',
    createdAt: new Date('2023-07-25'),
    updatedAt: new Date('2023-08-12')
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@eduworld.edu',
    linkedin: 'linkedin.com/in/emilydavis',
    company: 'EduWorld',
    notes: 'Budget constraints this quarter, follow up in Q4',
    tags: ['Education', 'SMB'],
    stage: 'Lost',
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-07-30')
  },
  {
    id: '5',
    name: 'Alex Wong',
    email: 'alex@fintech.co',
    linkedin: 'linkedin.com/in/alexwong',
    company: 'FinTech Solutions',
    notes: 'Scheduled demo for next Tuesday with technical team',
    tags: ['Technical', 'Finance', 'High Priority'],
    stage: 'Contacted',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-08-13')
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    leadId: '1',
    type: 'email',
    content: 'Sent initial outreach email introducing our product',
    timestamp: new Date('2023-08-15T10:30:00'),
    followUpDate: new Date('2023-08-18T10:30:00')
  },
  {
    id: '2',
    leadId: '2',
    type: 'call',
    content: 'Discussed upgrade options and pricing, seems very interested',
    timestamp: new Date('2023-08-14T14:00:00'),
    followUpDate: new Date('2023-08-17T14:00:00')
  },
  {
    id: '3',
    leadId: '2',
    type: 'email',
    content: 'Sent follow-up email with pricing PDF and case studies',
    timestamp: new Date('2023-08-14T16:30:00')
  },
  {
    id: '4',
    leadId: '3',
    type: 'call',
    content: 'Final call to confirm implementation schedule',
    timestamp: new Date('2023-08-12T11:00:00')
  },
  {
    id: '5',
    leadId: '3',
    type: 'email',
    content: 'Sent welcome email with onboarding details and next steps',
    timestamp: new Date('2023-08-12T13:45:00')
  },
  {
    id: '6',
    leadId: '4',
    type: 'linkedin',
    content: 'Connected on LinkedIn and discussed potential solutions',
    timestamp: new Date('2023-07-25T09:15:00')
  },
  {
    id: '7',
    leadId: '4',
    type: 'email',
    content: 'Received email about budget constraints, agreed to reconnect in Q4',
    timestamp: new Date('2023-07-30T15:20:00'),
    followUpDate: new Date('2023-10-01T09:00:00')
  },
  {
    id: '8',
    leadId: '5',
    type: 'email',
    content: 'Initial outreach with company overview and customer testimonials',
    timestamp: new Date('2023-08-05T08:30:00')
  },
  {
    id: '9',
    leadId: '5',
    type: 'call',
    content: 'Discussed technical requirements and integration points',
    timestamp: new Date('2023-08-10T13:00:00')
  },
  {
    id: '10',
    leadId: '5',
    type: 'email',
    content: 'Scheduled demo for next Tuesday, sent calendar invite',
    timestamp: new Date('2023-08-13T10:45:00'),
    followUpDate: new Date('2023-08-22T14:00:00')
  }
];

export const createLead = (leadData: Partial<Lead>): Lead => {
  const now = new Date();
  return {
    id: generateId(),
    name: '',
    email: '',
    linkedin: '',
    company: '',
    notes: '',
    tags: [],
    stage: 'New',
    createdAt: now,
    updatedAt: now,
    ...leadData
  };
};

export const createConversation = (conversationData: Partial<Conversation>): Conversation => {
  return {
    id: generateId(),
    leadId: '',
    type: 'email',
    content: '',
    timestamp: new Date(),
    ...conversationData
  };
};