"use client";

import * as Recharts from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Demo data: "velocity" over weeks (attractive upward trend)
const velocityData = [
  { week: "W1", builds: 12, files: 48 },
  { week: "W2", builds: 19, files: 76 },
  { week: "W3", builds: 28, files: 112 },
  { week: "W4", builds: 35, files: 140 },
  { week: "W5", builds: 52, files: 208 },
  { week: "W6", builds: 68, files: 272 },
];

// Demo data: frameworks Polaris supports (colorful bars)
const frameworksData = [
  { name: "Next.js", count: 94, fill: "#a78bfa" },
  { name: "React", count: 88, fill: "#38bdf8" },
  { name: "Vite", count: 72, fill: "#34d399" },
  { name: "Express", count: 65, fill: "#fbbf24" },
  { name: "FastAPI", count: 58, fill: "#f472b6" },
];

const velocityChartConfig = {
  builds: {
    label: "Projects",
    color: "#a78bfa",
  },
  files: {
    label: "Files",
    color: "#22d3ee",
  },
};

const frameworksChartConfig = {
  count: {
    label: "Usage",
    color: "#a78bfa",
  },
};

export function LandingCharts() {
  return (
    <section
      className="mt-20 rounded-2xl border border-border/80 bg-card/30 p-6 sm:p-8"
      aria-labelledby="charts-heading"
    >
      <h2
        id="charts-heading"
        className="text-center text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Build more, ship faster
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
        Polaris helps you go from idea to production in one flow. See the kind
        of output you can expect.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Area chart: growth trend */}
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <p className="mb-3 text-sm font-medium text-violet-300">
            Projects & files over time
          </p>
          <ChartContainer
            config={velocityChartConfig}
            className="h-[220px] w-full"
          >
            <Recharts.AreaChart
              data={velocityData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="fillBuilds"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillFiles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Recharts.CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(1 0 0 / 0.08)"
                vertical={false}
              />
              <Recharts.XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.65 0 0)" }}
              />
              <Recharts.YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.6 0 0)" }}
              />
              <Recharts.Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-border/50 bg-background/95 px-3 py-2 shadow-lg">
                      <p className="text-xs text-muted-foreground">
                        {payload[0].payload.week}
                      </p>
                      <p className="font-medium text-violet-400">
                        Projects: {payload[0].value}
                      </p>
                      <p className="text-sm text-cyan-400">
                        Files: {payload[1]?.value}
                      </p>
                    </div>
                  );
                }}
              />
              <Recharts.Area
                type="monotone"
                dataKey="builds"
                stroke="#a78bfa"
                strokeWidth={2}
                fill="url(#fillBuilds)"
              />
              <Recharts.Area
                type="monotone"
                dataKey="files"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#fillFiles)"
              />
            </Recharts.AreaChart>
          </ChartContainer>
        </div>

        {/* Bar chart: frameworks */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="mb-3 text-sm font-medium text-cyan-300">
            Frameworks Polaris supports
          </p>
          <ChartContainer
            config={frameworksChartConfig}
            className="h-[220px] w-full"
          >
            <Recharts.BarChart
              data={frameworksData}
              layout="vertical"
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <Recharts.CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(1 0 0 / 0.08)"
                horizontal={false}
              />
              <Recharts.XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.6 0 0)" }}
              />
              <Recharts.YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={72}
                tick={{ fill: "oklch(0.75 0 0)" }}
              />
              <Recharts.Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-border/50 bg-background/95 px-3 py-2 shadow-lg">
                      <p className="font-medium text-foreground">{d.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Usage: {d.count}%
                      </p>
                    </div>
                  );
                }}
              />
              <Recharts.Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {frameworksData.map((entry, index) => (
                  <Recharts.Cell key={entry.name} fill={entry.fill} />
                ))}
              </Recharts.Bar>
            </Recharts.BarChart>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
}
