"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { mockLeads } from "@/lib/mock-data"

export function LeadsByStage() {
  // Calculate lead counts by stage
  const stageCounts = mockLeads.reduce(
    (acc, lead) => {
      acc[lead.stage] = (acc[lead.stage] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = [
    { name: "New", value: stageCounts["New"] || 0 },
    { name: "Contacted", value: stageCounts["Contacted"] || 0 },
    { name: "Converted", value: stageCounts["Converted"] || 0 },
    { name: "Lost", value: stageCounts["Lost"] || 0 },
  ]

  const COLORS = ["#0ea5e9", "#f59e0b", "#10b981", "#ef4444"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
