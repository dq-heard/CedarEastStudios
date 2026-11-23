// sanity.cli.ts (project root)
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "pe87spa2", // same value as PUBLIC_SANITY_PROJECT_ID
    dataset: "production",
  },
});
