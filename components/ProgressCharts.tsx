"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ProgressChartsProps {
  data: Array<{
    date: string
    minutes: number
    sessions: number
  }>
}

export function ProgressCharts({ data }: ProgressChartsProps) {
  // Format data for charts
  const chartData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-sm">No activity data available</p>
          <p className="text-xs">Start learning to see your progress chart</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Learning Time Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Learning Time (Minutes)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number) => [`${value} minutes`, "Learning Time"]}
            />
            <Line type="monotone" dataKey="minutes" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sessions Count Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Sessions</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number) => [`${value} sessions`, "Sessions"]}
            />
            <Bar dataKey="sessions" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
