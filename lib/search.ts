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

/** Очки одного слова запроса. 0 — слово нигде не встретилось. */
function wordScore(item: SearchItem, titleW: string[], title: string, tag: string, text: string, w: string): number {
  let s = 0;
  if (titleW.includes(w)) s += 10;
  else if (titleW.some((t) => t.startsWith(w))) s += 7;
  else if (title.includes(w)) s += 5;
  if (tag.includes(w)) s += 4;
  if (text.includes(w)) s += 2;
  return s;
}

export function scoreItem(item: SearchItem, words: string[]): number {
  if (words.length === 0) return -1;
  const title = norm(item.title);
  const titleW = wordsOf(item.title);
  const tag = norm(item.tag);
  const text = norm(item.text);
  let score = 0;
  for (const w of words) {
    const ws = wordScore(item, titleW, title, tag, text, w);
    if (ws === 0) return 0; // AND: каждое слово должно встретиться
    score += ws;
  }
  if (title === words.join(" ")) score += 20; // точное совпадение заголовка
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
