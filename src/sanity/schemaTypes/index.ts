// src/sanity/schemaTypes/index.ts  (grouped by where each type appears on the site)
import type { SchemaTypeDefinition } from "sanity";

// Shared building blocks
import { link, imageWithAlt, sectionHeader } from "./objects";
import { seo } from "./seo";

// Site-wide: settings, navigation, footer, prefooter, page heroes
import { siteSettings } from "./global";
import { siteLayout } from "./layout";

// Pages
import { homePage } from "./pages/homePage";
import { aboutPage } from "./pages/aboutPage";
import { servicesPage } from "./pages/servicesPage";
import { service } from "./documents/service";
import { workPage } from "./pages/workPage";
import { caseStudy } from "./work";
import { blogPage } from "./pages/blogPage";
import { post } from "./documents/blog";
import { contactPage } from "./pages/contactPage";
import { thankYouPage } from "./pages/thanksPage";
import { legalPage } from "./legal";

export const schemaTypes: SchemaTypeDefinition[] = [
  // shared objects
  link,
  imageWithAlt,
  sectionHeader,
  seo,

  // site-wide
  siteSettings,
  siteLayout,

  // home
  homePage,

  // services
  servicesPage,
  service,

  // about
  aboutPage,

  // work
  workPage,
  caseStudy,

  // blog
  blogPage,
  post,

  // contact
  contactPage,
  thankYouPage,

  // legal
  legalPage,
];

// If your sanity.config.ts expects the old shape:
export const schema = { types: schemaTypes };
