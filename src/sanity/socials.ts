// One source for social platforms: the Studio dropdown, the label, and the
// FontAwesome class. Nobody types icon class names in Studio.

const SOCIALS: Record<string, { label: string; iconName: string }> = {
  twitter: { label: "Twitter / X", iconName: "fab fa-twitter" },
  linkedin: { label: "LinkedIn", iconName: "fab fa-linkedin-in" },
  instagram: { label: "Instagram", iconName: "fab fa-instagram" },
  facebook: { label: "Facebook", iconName: "fab fa-facebook-f" },
  dribbble: { label: "Dribbble", iconName: "fab fa-dribbble" },
  github: { label: "GitHub", iconName: "fab fa-github" },
  website: { label: "Website", iconName: "fas fa-arrow-up-right-from-square" },
};

// Older free-text entries ("X", "Twitter / X") still resolve
const ALIASES: Record<string, string> = {
  x: "twitter",
  twitterx: "twitter",
  site: "website",
  personalwebsite: "website",
  portfolio: "website",
};

// For schema files: options: { list: SOCIAL_PLATFORM_OPTIONS }
export const SOCIAL_PLATFORM_OPTIONS = Object.entries(SOCIALS).map(
  ([value, { label }]) => ({ title: label, value })
);

// Case-insensitive, so "LinkedIn" and "linkedin" both work
function lookup(platform?: string | null) {
  const key = (platform ?? "").toLowerCase().replace(/[^a-z]/g, "");
  return SOCIALS[ALIASES[key] ?? key];
}

export interface Social {
  _key: string;
  platform: string; // display label, e.g. "LinkedIn"
  url: string;
  iconName: string; // FontAwesome class
}

// Entries with an unknown platform or no URL are skipped
export function mapSocials(
  raw?:
    { _key?: string; platform?: string | null; url?: string | null }[] | null
): Social[] {
  return (raw ?? []).flatMap((social, index) => {
    const known = lookup(social.platform);
    if (!known || !social.url) return [];
    return [
      {
        _key: social._key ?? String(index),
        platform: known.label,
        url: social.url,
        iconName: known.iconName,
      },
    ];
  });
}
