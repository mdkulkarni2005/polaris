import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

const sentryOptions = {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: "junior-software-engineer",
  project: "polaris",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: true,
    treeshake: { removeDebugLogging: true },
  },
};

// Use Sentry build plugin only when explicitly enabled (ENABLE_SENTRY_SOURCEMAP_UPLOAD=1 and SENTRY_AUTH_TOKEN set).
// By default build succeeds without upload; set both to enable source map upload. Runtime Sentry is unchanged.
const useSentryBuild =
  process.env.ENABLE_SENTRY_SOURCEMAP_UPLOAD === "1" && process.env.SENTRY_AUTH_TOKEN;
export default useSentryBuild ? withSentryConfig(nextConfig, sentryOptions) : nextConfig;
