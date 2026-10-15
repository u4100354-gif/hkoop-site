import { safeHref } from "./url";

const ALLOWED_TAGS = new Set(["p", "br", "b", "strong", "i", "em", "h2", "h3", "ul", "ol", "li", "a"]);

/** Removes scripts, embeds, event handlers and unsupported markup from stored news HTML. */
export function sanitizeNewsHtml(value: unknown): string {
  const source = String(value ?? "").slice(0, 100_000)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|svg|math|template|form)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");

  return source.replace(/<\/?([a-z][\w:-]*)\b([^>]*)>/gi, (tag, rawName: string, attrs: string) => {
    const name = rawName.toLowerCase();
    if (!ALLOWED_TAGS.has(name)) return "";
    if (name === "br") return "<br>";
    if (/^<\//.test(tag)) return `</${name}>`;
    if (name !== "a") return `<${name}>`;
    const match = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = safeHref(match?.[1] ?? match?.[2] ?? match?.[3]);
    return href ? `<a href="${href.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">` : "<a>";
  });
}
