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

// Pages
import {
  hero,
  servicesIntro,
  process,
  portfolio,
  testimonials,
  news,
} from "./home";
import { about, philosophy, founder, techStack } from "./about";
import { servicesSection, service, pricing, faq } from "./services";
import { caseStudy } from "./work";
import { post } from "./blog";
import { contact } from "./contact";
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
  navigation,
  prefooter,
  footer,
  pageHero,

  // home
  hero,
  servicesIntro,
  process,
  portfolio,
  testimonials,
  news,

  // about
  about,
  philosophy,
  techStack,
  founder,

  // services
  servicesSection,
  service,
  pricing,
  faq,

  // work
  caseStudy,

  // blog
  post,

  // contact
  contact,
  thankYou,

  // legal
  legalPage,
];

// If your sanity.config.ts expects the old shape:
export const schema = { types: schemaTypes };
