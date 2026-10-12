// Не даём данным из БД превратиться в XSS: разрешены только http(s) и
// site-relative пути. Всё остальное (javascript:, data:, //evil) — null.
export function safeHref(h: unknown): string | null {
  if (typeof h !== "string") return null;
  const v = h.trim();
  if (!v || v.length > 2000) return null;
  if (v.startsWith("/")) {
    // site-relative, но не protocol-relative //evil и не backslash-трюки
    return /^\/[^/\\]/.test(v) ? v : null;
  }
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

// Картинки — только из /images/ сайта: никаких внешних URL, data: и схем.
export function safeImgSrc(h: unknown): string | null {
  if (typeof h !== "string") return null;
  const v = h.trim();
  if (!v || v.length > 500) return null;
  if (!v.startsWith("/images/")) return null;
  if (v.includes("..") || v.includes("\\")) return null;
  return v;
}
