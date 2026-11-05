// sanity.config.ts (At the root of your Astro project)
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes"; // Pointing to your schema folder

export default defineConfig({
  name: "default",
  title: "Cedar East Studios",

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
