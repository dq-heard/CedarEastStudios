// Page documents: one each, opened straight from the Pages folder.
export const pageTypes: string[] = [
  "homePage",
  "aboutPage",
  "servicesPage",
  "workPage",
  "blogPage",
  "contactPage",
  "thankYouPage",
];

// Every document type that only exists once.
export const singletonTypes: string[] = [
  "siteSettings",
  "siteLayout",
  ...pageTypes,
];
