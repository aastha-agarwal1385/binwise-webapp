"use client"

import {
  Leaf,
  MapPin,
  Recycle,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const barData = [
  { name: "Mon", plastic: 42, wet: 28, dry: 18 },
  { name: "Tue", plastic: 35, wet: 32, dry: 22 },
  { name: "Wed", plastic: 48, wet: 24, dry: 14 },
  { name: "Thu", plastic: 30, wet: 38, dry: 20 },
  { name: "Fri", plastic: 55, wet: 20, dry: 16 },
  { name: "Sat", plastic: 22, wet: 15, dry: 12 },
  { name: "Sun", plastic: 18, wet: 12, dry: 10 },
]

const pieData = [
  { name: "Plastic", value: 45, color: "oklch(0.52 0.14 155)" },
  { name: "Wet Waste", value: 30, color: "oklch(0.72 0.10 155)" },
  { name: "Dry Waste", value: 15, color: "oklch(0.82 0.08 155)" },
  { name: "E-Waste", value: 10, color: "oklch(0.45 0.10 155)" },
]

const hotspots = [
  { zone: "Block A - Canteen", severity: "High", score: 34 },
  { zone: "Block C - Labs", severity: "Medium", score: 62 },
  { zone: "Main Gate Area", severity: "High", score: 28 },
  { zone: "Library Building", severity: "Low", score: 85 },
]

export function DashboardSection() {
  return (
    <section id="dashboard" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <BarChart3 className="size-3.5" />
            Live Dashboard
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Campus Cleanliness Dashboard</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            Real-time metrics on waste collection, cleanliness scores, and
            environmental impact across the campus.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Leaf,
              label: "Cleanliness Score",
              value: "87",
              unit: "/100",
              trend: "+4.2%",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: MapPin,
              label: "Active Hotspots",
              value: "12",
              unit: " zones",
              trend: "-2 this week",
              color: "bg-amber-100 text-amber-700",
            },
            {
              icon: Recycle,
              label: "Waste Recycled",
              value: "3.8",
              unit: " tons",
              trend: "+12% this month",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: TrendingUp,
              label: "Reports Filed",
              value: "1,247",
              unit: "",
              trend: "+86 today",
              color: "bg-primary/10 text-primary",
            },
          ].map((stat) => (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-display text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="size-3" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Bar chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Waste Collection</CardTitle>
              <CardDescription>
                Breakdown of waste types collected over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barGap={2}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.90 0.02 155)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "oklch(0.50 0.02 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.50 0.02 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(1 0 0)",
                        border: "1px solid oklch(0.90 0.02 155)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="plastic"
                      fill="oklch(0.52 0.14 155)"
                      radius={[4, 4, 0, 0]}
                      name="Plastic"
                    />
                    <Bar
                      dataKey="wet"
                      fill="oklch(0.72 0.10 155)"
                      radius={[4, 4, 0, 0]}
                      name="Wet"
                    />
                    <Bar
                      dataKey="dry"
                      fill="oklch(0.82 0.08 155)"
                      radius={[4, 4, 0, 0]}
                      name="Dry"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                {[
                  { label: "Plastic", color: "bg-primary" },
                  { label: "Wet Waste", color: "bg-chart-3" },
                  { label: "Dry Waste", color: "bg-chart-5" },
                ].map((legend) => (
                  <div key={legend.label} className="flex items-center gap-2">
                    <div
                      className={`size-3 rounded-full ${legend.color}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {legend.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card>
            <CardHeader>
              <CardTitle>Waste Composition</CardTitle>
              <CardDescription>Overall waste type distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "oklch(1 0 0)",
                        border: "1px solid oklch(0.90 0.02 155)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-2">
                {pieData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hotspots */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Waste Hotspot Zones</CardTitle>
            <CardDescription>
              Areas with high waste accumulation that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotspots.map((spot) => (
                <div
                  key={spot.zone}
                  className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {spot.zone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cleanliness: {spot.score}/100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={spot.score} className="h-2 w-32" />
                    <Badge
                      variant="outline"
                      className={
                        spot.severity === "High"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : spot.severity === "Medium"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-primary/20 bg-primary/5 text-primary"
                      }
                    >
                      {spot.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
