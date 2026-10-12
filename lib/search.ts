// Общий поиск по сайту: нормализация, ранжирование, подсветка.
// Используют HeaderSearch (выпадашка) и SearchClient (страница /search).

export type SearchItem = { title: string; url: string; tag: string; text: string };
export type Scored = { item: SearchItem; score: number };

/** Нижний регистр + ё→е + схлопывание пробелов. Длина не меняется. */
export function norm(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[\s\u00a0]+/g, " ")
    .trim();
}

function wordsOf(t: string): string[] {
  return norm(t).split(/[^a-zа-я0-9]+/).filter(Boolean);
}

/** Длина общего префикса двух слов. */
function commonPrefix(a: string, b: string): number {
  let n = 0;
  const m = Math.min(a.length, b.length);
  while (n < m && a[n] === b[n]) n++;
  return n;
}

/**
 * Связь слова запроса со словами поля:
 * 3 — точное, 2 — префикс (в любую сторону), 1 — общая основа ≥4 букв (падежи: новость/новости),
 * 0 — нет связи.
 */
function rel(field: string[], w: string): 0 | 1 | 2 | 3 {
  if (field.includes(w)) return 3;
  if (field.some((t) => t.startsWith(w) || w.startsWith(t))) return 2;
  if (field.some((t) => commonPrefix(t, w) >= 4)) return 1;
  return 0;
}

type Pre = { item: SearchItem; title: string; titleW: string[]; tagW: string[]; text: string; textW: string[] };

/** Очки одного слова запроса. 0 — слово нигде не встретилось. */
function wordScore(p: Pre, w: string): number {
  let s = 0;
  const rt = rel(p.titleW, w);
  if (rt === 3) s += 10;
  else if (rt === 2) s += 7;
  else if (rt === 1) s += 5;
  else if (p.title.includes(w)) s += 4;
  const rg = rel(p.tagW, w);
  if (rg === 3) s += 4;
  else if (rg >= 1) s += 2;
  const rx = rel(p.textW, w);
  if (rx >= 1) s += 2;
  else if (p.text.includes(w)) s += 1;
  return s;
}

export function scoreItem(item: SearchItem, words: string[]): number {
  if (words.length === 0) return -1;
  const p: Pre = {
    item,
    title: norm(item.title),
    titleW: wordsOf(item.title),
    tagW: wordsOf(item.tag),
    text: norm(item.text),
    textW: wordsOf(item.text),
  };
  let score = 0;
  for (const w of words) {
    const ws = wordScore(p, w);
    if (ws === 0) return 0; // AND: каждое слово должно встретиться
    score += ws;
  }
  if (p.title === words.join(" ")) score += 20; // точное совпадение заголовка
  return score;
}

/** Поиск с ранжированием. Возвращает не более limit, лучшие первые. */
export function searchAll(index: SearchItem[], query: string, limit = 60): Scored[] {
  const words = norm(query).split(" ").filter((w) => w.length >= 2);
  if (words.length === 0) return [];
  return index
    .map((item) => ({ item, score: scoreItem(item, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Слова запроса для подсветки (нормализованные, длина ≥2). */
export function queryWords(query: string): string[] {
  return norm(query).split(" ").filter((w) => w.length >= 2);
}

/** Позиции вхождений слов в заголовке (индексы годятся для исходной строки: ё→е длину не меняет). */
export function findRanges(title: string, words: string[]): Array<[number, number]> {
  const folded = norm(title);
  const ranges: Array<[number, number]> = [];
  for (const w of words) {
    let from = 0;
    for (;;) {
      const i = folded.indexOf(w, from);
      if (i < 0) break;
      ranges.push([i, i + w.length]);
      from = i + w.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Array<[number, number]> = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}
