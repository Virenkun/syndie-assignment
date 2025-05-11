import { prisma } from "@/lib/prisma";
import type { Lead, Conversation, Prisma } from "@prisma/client";

// Lead service functions
export async function getLeads(): Promise<Lead[]> {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getLeadById(id: number): Promise<Lead | null> {
  return prisma.lead.findUnique({ where: { id } });
}

export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "updatedAt">
): Promise<Lead> {
  return prisma.lead.create({ data });
}

export async function updateLead(
  id: number,
  data: Partial<Omit<Lead, "id" | "createdAt" | "updatedAt">>
): Promise<Lead> {
  return prisma.lead.update({ where: { id }, data });
}

export async function deleteLead(id: number): Promise<Lead> {
  return prisma.lead.delete({ where: { id } });
}

// Conversation service functions
export async function getConversations(filters?: {
  leadId?: number;
  type?: string;
}): Promise<Conversation[]> {
  const where: Prisma.ConversationWhereInput = {};

  if (filters?.leadId) {
    where.leadId = filters.leadId;
  }

  if (filters?.type) {
    where.type = filters.type;
  }

  return prisma.conversation.findMany({
    where,
    orderBy: { timestamp: "desc" },
    include: {
      lead: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getConversationById(
  id: number
): Promise<(Conversation & { lead: { name: string } }) | null> {
  return prisma.conversation.findUnique({
    where: { id },
    include: {
      lead: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function createConversation(
  data: Omit<Conversation, "id" | "createdAt" | "updatedAt">
): Promise<Conversation> {
  return prisma.conversation.create({
    data,
    include: {
      lead: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function updateConversation(
  id: number,
  data: Partial<Omit<Conversation, "id" | "createdAt" | "updatedAt">>
): Promise<Conversation & { lead: { name: string } }> {
  return prisma.conversation.update({
    where: { id },
    data,
    include: {
      lead: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function deleteConversation(id: number): Promise<Conversation> {
  return prisma.conversation.delete({ where: { id } });
}

// Helper function to format conversation for API response
export function formatConversation(
  conversation: Conversation & { lead: { name: string } }
) {
  return {
    id: String(conversation.id),
    leadId: String(conversation.leadId),
    type: conversation.type,
    content: conversation.content,
    timestamp: conversation.timestamp.toISOString(),
    followUpDate: conversation.followUpDate
      ? conversation.followUpDate.toISOString()
      : undefined,
    leadName: conversation.lead.name,
  };
}
