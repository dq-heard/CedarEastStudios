// "We [transform] ideas" -> 'We <span>transform</span> ideas'. Newlines -> <br>.
// Output is escaped first, so it's safe with Astro's set:html.
// Pass a class when the CSS targets one: highlight(text, "cta-highlight")
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(text?: string | null, className?: string): string {
  if (!text) return "";
  const open = className ? `<span class="${className}">` : "<span>";
  return esc(text)
    .replace(/\[([^\]]+)\]/g, `${open}$1</span>`)
    .replace(/\r?\n/g, "<br>");
}
