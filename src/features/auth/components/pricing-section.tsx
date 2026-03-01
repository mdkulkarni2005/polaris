import { CheckIcon, Sparkles, Zap, Building2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "Get started and build your first projects.",
    price: "$0",
    period: "forever",
    features: [
      "3 AI-built projects",
      "Import 1 GitHub repo",
      "In-browser editor",
      "Community support",
    ],
    cta: "Get started",
    highlighted: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    description: "For developers who ship often.",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited projects",
      "Unlimited GitHub imports",
      "Priority model access",
      "Export to private repos",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Team",
    description: "For teams and organizations.",
    price: "$49",
    period: "per seat / month",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "SSO & admin controls",
      "Usage analytics",
      "Dedicated support",
    ],
    cta: "Contact sales",
    highlighted: false,
    icon: Building2,
  },
];

export function PricingSection() {
  return (
    <section
      className="mt-20 w-full"
      aria-labelledby="pricing-heading"
    >
      <h2
        id="pricing-heading"
        className="text-center text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        Simple pricing
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
        Start free. Upgrade when you need more.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                plan.highlighted
                  ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                  : "border-border/80 bg-card/50 hover:border-border hover:bg-card/70"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                  Popular
                </span>
              )}
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-9 items-center justify-center rounded-lg ${
                    plan.highlighted ? "bg-violet-500/20 text-violet-400" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon className="size-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.name === "Team" ? (
                  <Button
                    variant="outline"
                    className="w-full border-border hover:bg-accent/50"
                    asChild
                  >
                    <a href="mailto:sales@polaris.dev">{plan.cta}</a>
                  </Button>
                ) : (
                  <SignUpButton>
                    <Button
                      className={
                        plan.highlighted
                          ? "w-full bg-violet-600 text-white hover:bg-violet-500"
                          : "w-full"
                      }
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </SignUpButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
