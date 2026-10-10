// Согласие на cookies/метрику/карты (152-ФЗ): храним решение со сроком и
// версией политики, чтобы переспрашивать при смене текста.
import { lsGet, lsSet, lsDel } from "./storage";

export const CONSENT_KEY = "hkoop-consent";
export const POLICY_VERSION = "2026-10-10-v1";
const TTL_MS = 12 * 30 * 24 * 3600 * 1000; // ~12 мес.

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  try {
    const raw = lsGet(CONSENT_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as { value?: unknown; version?: unknown; date?: unknown };
    if ((o.value === "granted" || o.value === "denied") && o.version === POLICY_VERSION) {
      const t = Date.parse(String(o.date));
      if (!Number.isNaN(t) && Date.now() - t < TTL_MS) return o.value;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(v: ConsentValue): void {
  lsSet(CONSENT_KEY, JSON.stringify({ value: v, version: POLICY_VERSION, date: new Date().toISOString() }));
  window.dispatchEvent(new Event("hkoop-consent"));
}

export function clearConsent(): void {
  lsDel(CONSENT_KEY);
  window.dispatchEvent(new Event("hkoop-consent"));
}
