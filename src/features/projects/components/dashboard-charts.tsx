"use client";

import * as Recharts from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Demo data for dashboard: activity trend
const activityData = [
  { day: "Mon", projects: 2, files: 12 },
  { day: "Tue", projects: 1, files: 8 },
  { day: "Wed", projects: 4, files: 24 },
  { day: "Thu", projects: 2, files: 14 },
  { day: "Fri", projects: 3, files: 18 },
  { day: "Sat", projects: 1, files: 6 },
  { day: "Sun", projects: 2, files: 10 },
];

const activityChartConfig = {
  projects: { label: "Projects", color: "#a78bfa" },
  files: { label: "Files", color: "#22d3ee" },
};

export function DashboardCharts() {
  return (
    <section
      className="rounded-xl border border-border/80 bg-card/40 p-4"
      aria-labelledby="dashboard-charts-heading"
    >
      <h2
        id="dashboard-charts-heading"
        className="text-sm font-semibold text-foreground mb-3"
      >
        Build momentum
      </h2>
      <ChartContainer
        config={activityChartConfig}
        className="h-[180px] w-full"
      >
        <Recharts.BarChart
          data={activityData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <Recharts.CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(1 0 0 / 0.06)"
            vertical={false}
          />
          <Recharts.XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
          />
          <Recharts.YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
          />
          <Recharts.Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload;
              return (
                <div className="rounded-lg border border-border/50 bg-background/95 px-2.5 py-1.5 shadow-lg text-xs">
                  <p className="font-medium text-foreground">{p.day}</p>
                  <p className="text-muted-foreground">Projects: {p.projects} · Files: {p.files}</p>
                </div>
              );
            }}
          />
          <Recharts.Bar
            dataKey="projects"
            fill="#a78bfa"
            radius={[4, 4, 0, 0]}
            name="Projects"
          />
          <Recharts.Bar
            dataKey="files"
            fill="#22d3ee"
            radius={[4, 4, 0, 0]}
            name="Files"
          />
        </Recharts.BarChart>
      </ChartContainer>
    </section>
  );
}
