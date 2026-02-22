import ky from "ky";
import { Octokit } from "octokit";
import { NonRetriableError } from "inngest";
import { convex } from "@/lib/convex-client";
import { inngest } from "@/inngest/client";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

interface ExportToGithubEvent {
  projectId: Id<"projects">;
  repoName: string;
  visibility: "public" | "private";
  description?: string;
  githubToken: string;
}

type FileWithUrl = Doc<"files"> & {
  storageUrl: string | null;
};

export const exportToGithub = inngest.createFunction(
  {
    id: "export-to-github",
    cancelOn: [
      {
        event: "github/export.cancel",
        if: "event.data.projectId == async.data.projectId",
      },
    ],
    onFailure: async ({ event, step }) => {
      const internalKey = process.env.POLARIS_CONVEX_INTERNAL_VALUE;
      if (!internalKey) return;

      const { projectId } = event.data.event.data as ExportToGithubEvent;

      await step.run("set-failed-status", async () => {
        await convex.mutation(api.system.updateExportStatus, {
          internalKey,
          projectId,
          status: "failed",
        });
      });
    },
  },
  { event: "github/export.repo" },
  async ({ event, step }) => {
    const { projectId, repoName, visibility, description, githubToken } =
      event.data as ExportToGithubEvent;

    const internalKey = process.env.POLARIS_CONVEX_INTERNAL_VALUE;
    if (!internalKey) {
      throw new NonRetriableError(
        "POLARIS_CONVEX_INTERNAL_VALUE is not configured",
      );
    }
    // Set status to exporting
    await step.run("set-exporting-status", async () => {
      await convex.mutation(api.system.updateExportStatus, {
        internalKey,
        projectId,
        status: "exporting",
      });
    });

    const octokit = new Octokit({ auth: githubToken });

    // Get authenticated user
    const { data: user } = await step.run(
      "get-authenticated-user",
      async () => {
        return await octokit.rest.users.getAuthenticated();
      },
    );
    // Create a new github repository with auto_init to have an initial commit
    const { data: repo } = await step.run("create-repo", async () => {
      return await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description: description || `Exported from Polaris`,
        private: visibility === "private",
        auto_init: true,
      });
    });

    // Wait for github to initialize the repo (auto_init is async on Github's side)
    await step.sleep("wait-for-repo-init", "3s");

    // Get the initial commit SHA (we need this as parent for our commit)
    const initialCommitSha = await step.run("get-initial-commit", async () => {
      const { data: ref } = await octokit.rest.git.getRef({
        owner: user.login,
        repo: repoName,
        ref: "heads/main",
      });
      return ref.object.sha;
    });

    // Fetch 
  },
);
