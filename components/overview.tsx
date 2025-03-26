"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1800,
    fraudulent: 45,
  },
  {
    name: "Feb",
    total: 1600,
    fraudulent: 32,
  },
  {
    name: "Mar",
    total: 1400,
    fraudulent: 28,
  },
  {
    name: "Apr",
    total: 1700,
    fraudulent: 34,
  },
  {
    name: "May",
    total: 1900,
    fraudulent: 38,
  },
  {
    name: "Jun",
    total: 2100,
    fraudulent: 42,
  },
  {
    name: "Jul",
    total: 2400,
    fraudulent: 48,
  },
  {
    name: "Aug",
    total: 2200,
    fraudulent: 44,
  },
  {
    name: "Sep",
    total: 2000,
    fraudulent: 40,
  },
  {
    name: "Oct",
    total: 2500,
    fraudulent: 50,
  },
  {
    name: "Nov",
    total: 2300,
    fraudulent: 46,
  },
  {
    name: "Dec",
    total: 2700,
    fraudulent: 54,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total Transactions" />
        <Bar dataKey="fraudulent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Fraudulent Transactions" />
      </BarChart>
    </ResponsiveContainer>
  )
}

