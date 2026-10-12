// localStorage падает в приватном режиме и при запрете cookies —
// оборачиваем, чтобы компоненты не крашились (Vercel: client-localstorage-schema).
export function lsGet(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}

export function lsSet(k: string, v: string): void {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore: private mode / quota */
  }
}

export function lsDel(k: string): void {
  try {
    localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
}
