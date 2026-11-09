// src/sanity/schemaTypes/index.ts  (grouped by where each type appears on the site)
import type { SchemaTypeDefinition } from "sanity";

// Shared building blocks
import { link, imageWithAlt, sectionHeader } from "./objects";
import { seo } from "./seo";

// Site-wide: settings, navigation, footer, prefooter, page heroes
import {
  siteSettings,
  navigation,
  prefooter,
  footer,
  pageHero,
} from "./global";

import { siteLayout } from "./layout";

// Pages
import {
  hero,
  servicesIntro,
  process,
  portfolio,
  testimonials,
  news,
} from "./home";
import { homePage } from "./pages/homePage";
import { about, philosophy, founder, techStack } from "./about";
import { aboutPage } from "./pages/aboutPage";
import { servicesPage } from "./pages/servicesPage";
import { service } from "./documents/service";
import { caseStudy } from "./work";
import { workPage } from "./pages/workPage";
import { blogPage } from "./pages/blogPage";
import { post } from "./documents/blog";
import { contactPage } from "./pages/contactPage";
import { thankYou } from "./thanks";
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
  navigation,
  prefooter,
  footer,
  pageHero,

  // home
  homePage,
  hero,
  servicesIntro,
  process,
  portfolio,
  testimonials,
  news,

  // about
  aboutPage,
  about,
  philosophy,
  techStack,
  founder,

  // services
  servicesPage,
  // servicesSection,
  service,
  // pricing,
  // faq,

  // work
  workPage,
  caseStudy,

  // blog
  blogPage,
  post,

  // contact
  contactPage,
  thankYou,

  // legal
  legalPage,
];

// If your sanity.config.ts expects the old shape:
export const schema = { types: schemaTypes };
