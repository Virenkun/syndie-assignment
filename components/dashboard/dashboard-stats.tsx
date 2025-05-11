"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"
import { mockLeads, mockConversations } from "@/lib/mock-data"

export function DashboardStats() {
  // Calculate stats from mock data
  const totalLeads = mockLeads.length
  const totalConversations = mockConversations.length
  const convertedLeads = mockLeads.filter((lead) => lead.stage === "Converted").length
  const atRiskLeads = mockLeads.filter((lead) => {
    const lastConversation = mockConversations
      .filter((conv) => conv.leadId === lead.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]

    if (!lastConversation) return false

    const daysSinceLastContact = Math.floor(
      (new Date().getTime() - new Date(lastConversation.timestamp).getTime()) / (1000 * 60 * 60 * 24),
    )

    return daysSinceLastContact > 14 && lead.stage !== "Converted" && lead.stage !== "Lost"
  }).length

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversations</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalConversations}</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Converted</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{convertedLeads}</div>
          <p className="text-xs text-muted-foreground">
            {((convertedLeads / totalLeads) * 100).toFixed(1)}% conversion rate
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{atRiskLeads}</div>
          <p className="text-xs text-muted-foreground">{atRiskLeads} leads need attention</p>
        </CardContent>
      </Card>
    </>
  )
}
