import { defineConfig, envField } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
import cloudflare from "@astrojs/cloudflare";

// An empty prefix loads everything, including variables set in Cloudflare's build settings
const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const PUBLIC_SANITY_PROJECT_ID = (
  env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID
)?.trim();
const PUBLIC_SANITY_DATASET = (
  env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET
)?.trim();

if (!PUBLIC_SANITY_PROJECT_ID) {
  throw new Error(
    "PUBLIC_SANITY_PROJECT_ID is not set. Add it under the Worker's Build variables."
  );
}

export default defineConfig({
  site: "https://cedareaststudios.com",
  trailingSlash: "never",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET || "production",
      studioBasePath: "/studio",
      useCdn: false,
    }),
    react(),
    sitemap({ filter: (page) => !page.includes("/studio", "/thank-you") }),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});
