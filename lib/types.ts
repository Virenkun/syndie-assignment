export type Lead = {
  id: string
  name: string
  email: string
  linkedin: string
  company: string
  notes: string
  tags: string[]
  stage: "New" | "Contacted" | "Converted" | "Lost"
  createdAt: string
  updatedAt: string
}

export type Conversation = {
  id: string
  leadId: string
  type: "email" | "call" | "linkedin" | "in_person"
  content: string
  timestamp: string
  followUpDate?: string
}

export type AISuggestion = {
  leadId: string
  suggestionText: string
  generatedAt: string
}
