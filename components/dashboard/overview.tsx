"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
    converted: 4,
  },
  {
    name: "Feb",
    total: 18,
    converted: 6,
  },
  {
    name: "Mar",
    total: 24,
    converted: 9,
  },
  {
    name: "Apr",
    total: 32,
    converted: 12,
  },
  {
    name: "May",
    total: 28,
    converted: 10,
  },
  {
    name: "Jun",
    total: 36,
    converted: 15,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Total Leads" />
        <Bar dataKey="converted" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Converted" />
      </BarChart>
    </ResponsiveContainer>
  )
}
