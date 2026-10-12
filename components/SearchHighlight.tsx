"use client";
import { findRanges } from "../lib/search";

/** Подсветка слов запроса в заголовке. */
export default function SearchHighlight({ text, words }: { text: string; words: string[] }) {
  const ranges = findRanges(text, words);
  if (ranges.length === 0) return <>{text}</>;
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  ranges.forEach(([s, e], k) => {
    if (s > pos) nodes.push(<span key={`t${k}`}>{text.slice(pos, s)}</span>);
    nodes.push(<mark key={`m${k}`}>{text.slice(s, e)}</mark>);
    pos = e;
  });
  if (pos < text.length) nodes.push(<span key="tail">{text.slice(pos)}</span>);
  return <>{nodes}</>;
}
