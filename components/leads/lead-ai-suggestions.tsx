"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { mockLeads, mockConversations } from "@/lib/mock-data"
import { RefreshCw } from "lucide-react"

interface LeadAISuggestionsProps {
  leadId: string
}

export function LeadAISuggestions({ leadId }: LeadAISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const generateSuggestions = () => {
    setIsLoading(true)

    // Find the lead and its conversations
    const lead = mockLeads.find((l) => l.id === leadId)
    const leadConversations = mockConversations
      .filter((c) => c.leadId === leadId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Mock AI suggestion generation based on lead data
    setTimeout(() => {
      const newSuggestions: string[] = []

      if (!lead) {
        setSuggestions(["Lead not found"])
        setIsLoading(false)
        return
      }

      // Generate suggestions based on lead stage
      if (lead.stage === "New") {
        newSuggestions.push("Send an introductory email to establish initial contact")
        newSuggestions.push("Research their company on LinkedIn to find common connections")
        newSuggestions.push("Prepare a personalized value proposition based on their industry")
      } else if (lead.stage === "Contacted") {
        if (leadConversations.length === 0) {
          newSuggestions.push("Follow up on your initial outreach")
        } else {
          const lastContact = new Date(leadConversations[0].timestamp)
          const daysSinceLastContact = Math.floor(
            (new Date().getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24),
          )

          if (daysSinceLastContact > 7) {
            newSuggestions.push(
              `It's been ${daysSinceLastContact} days since your last contact. Send a follow-up email.`,
            )
          }

          newSuggestions.push("Schedule a discovery call to understand their needs better")
          newSuggestions.push("Share a relevant case study from their industry")
        }
      } else if (lead.stage === "Converted") {
        newSuggestions.push("Send a thank you message for their business")
        newSuggestions.push("Schedule an onboarding call to ensure smooth implementation")
        newSuggestions.push("Ask for a referral to similar companies in their network")
      } else if (lead.stage === "Lost") {
        newSuggestions.push("Send a check-in email after 3 months to see if their situation has changed")
        newSuggestions.push("Share new product features that might address their previous concerns")
        newSuggestions.push("Request feedback on why they chose not to proceed")
      }

      // Add tag-based suggestions
      if (lead.tags.includes("High Priority")) {
        newSuggestions.push("Escalate to senior sales rep for special attention")
      }

      if (lead.tags.includes("Decision Maker")) {
        newSuggestions.push("Prepare ROI analysis to support their decision-making process")
      }

      if (lead.tags.includes("Technical")) {
        newSuggestions.push("Schedule a technical demo with your product specialist")
      }

      // Randomly select 3 suggestions if we have more than 3
      if (newSuggestions.length > 3) {
        const randomSuggestions: string[] = []
        const indices = new Set<number>()

        while (indices.size < 3) {
          indices.add(Math.floor(Math.random() * newSuggestions.length))
        }

        indices.forEach((index) => {
          randomSuggestions.push(newSuggestions[index])
        })

        setSuggestions(randomSuggestions)
      } else {
        setSuggestions(newSuggestions)
      }

      setIsLoading(false)
    }, 1000) // Simulate API delay
  }

  useEffect(() => {
    generateSuggestions()
  }, [leadId])

  return (
    <div className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </>
      ) : (
        <>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-2 text-primary">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={generateSuggestions}>
            <RefreshCw className="h-3 w-3 mr-2" />
            Regenerate suggestions
          </Button>
        </>
      )}
    </div>
  )
}
