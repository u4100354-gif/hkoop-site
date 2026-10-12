# CONTEXT.md — контекст проекта «Новый сайт ХКООП» (обновлено 12.10.2026)

Перенеси этот файл в новый чат + ветку `skills-only` из репозитория.
Без секретов: пароли только в `db/README.md` и `.env.local` (не коммитить, не вставлять в чат).

## Что это

Новый сайт Союза «Хабаровское краевое объединение организаций профсоюзов» (ХКООП).
Старый habprof.ru (Joomla 3.10, EOL) не трогаем. Разработка локально, демо на GitHub Pages.

## Стек (после мержа for-mac, 12.10)

- Next.js 16 App Router + React 19 + TypeScript, `poweredByHeader: false`
- Шрифт Manrope через next/font (кириллица+латиница); VI-режим — Arial
- CSS без фреймворков (`app/globals.css`, токены в `:root`), Turbopack dev
- MariaDB, доступ через `lib/db.ts` (mysql2 pool, только SELECT у юзера сайта; миграции через root)
- Локально: http://localhost:3100 (dev), phpMyAdmin http://127.0.0.1:8081, БД `hkoop`
- Прод-слепок: https://u4100354-gif.github.io/ (статика из `.next-export`, деплой вручную из папки)
- Репозиторий `u4100354-gif/hkoop-site`, ветки: `main` (всё), `skills-only` (скиллы+правила+граф для переноса), корень `u4100354-gif.github.io:main` (голая статика)

## Команды

```bash
export PATH="/opt/homebrew/bin:$PATH"   # node/mysql живут в brew
npm run dev -- -p 3100
npx tsc --noEmit                        # обязательно перед сборкой
STATIC_EXPORT=1 npm run build           # экспорт в .next-export (dev в .next не трогает!)
node scripts/gen-search-index.mjs       # индекс поиска в public/search-index.json
```

## Структура кода

- `app/` — `/`, `/news`, `/news/[id]` (await params!), `/docs`, `/about`, `/activity`, `/honor`, `/honor/[id]`, `/partners`, `/organizations`, `/events`, `/contacts`, `/search` (клиент + JSON-индекс), `/policy`, `not-found.tsx`, `icon.svg`
- `components/` — Header (+HeaderSearch), Footer (VI-кнопка + иконки тут), Slider (пауза на ховере!), ConsultForm (mailto), NewsFilter, DocsFilter, PartnersStrip, Counter (анимация 0→end, SSR сразу итог), ScrollFx (reveal + failsafe), ViProvider (3 размера/3 схемы/интервал/без картинок), CookieBanner, CookieSettings, MapGate, MetricsGate (consent-gate!), PageHero, SearchClient, Crumbs
- Админка пресс-службы: `npm run admin` → http://127.0.0.1:3101 (только локально!), пароль ADMIN_PASS в .env.local, код в scripts/admin/
- `lib/` — db.ts, url.ts (safeHref/safeImgSrc — применять ко всему из БД!), consent.ts (POLICY_VERSION), storage.ts
- `data/*.json` — сиды (сайт читает БД). `db/` — schema.sql, seed*.sql, fix_*.sql, README
- `public/` — images/*, docs/*.pdf (~240МБ!), search-index.json (310 записей)
- `docs/` — ПАМЯТКА-РАЗРАБОТКИ.md, ИНСТРУКЦИЯ-ПРЕСС-СЛУЖБЕ.md; `AGENTS.md` (+блок Next 16), `DESIGN.md`, `MAC-ПАМЯТКА.md`, `CLAUDE-AUDIT.md`

## БД `hkoop`

- news(211): id, title, date, category, tags TEXT-JSON, excerpt, old_url, image, body (полный текст со старого сайта, парсер scripts/parse-old-site.mjs)
- documents(91): id, title, type, year, file_old, file_local, old_url
- partners(13), honor(7, полные биографии), events(3), site_settings(11)
- Форма консультации = mailto на тестовую u4100354@gmail.com (заглушка, не backend)

## Схемка: граф знаний (graphify)

- `graphify . --code-only` (без ключа); полный с PDF/картинками требует API-ключ
- Ветка `skills-only`: graph.json (~1900 узлов), GRAPH_REPORT.md, manifest.json, CONTEXT.md, 23 скилла
- После правок: `graphify update .`, отчёт: `graphify cluster-only .`

## Решения (не менять молча)

- Дизайн: тёмно-синий + серое меню как оригинал; Manrope; редизайн-риф: VARIANCE 4 / MOTION 5 / DENSITY 4
- Все правки сначала на localhost, на Pages только по команде (пересборка + пуш out/)
- Форма — mailto-заглушка; статистика «в цифрах» — ориентиры (~22/~19/~100 тыс.), точных цифр нет
- EN+CN, тёмная тема, Метрика (новый счётчик), ежедневные бэкапы, своя админка — запланировано
- Каталог организаций: на старом сайте грузится скриптом, нужен список от аппарата
- Бэкапы: `~/site-backups/hkoop-ДАТА/` (db.sql + code.tgz), метка в `~/site-backups/LATEST`

## Открытые вопросы юзеру (на 12.10)

- Мобильный подвал: юзер хочет «в строчку», текущий вариант — 2 колонки (контакты сверху на всю ширину). Статус: спорно, ждёт оценки
- Поведение паузы слайдера на ховере: предложены 3 варианта, ответа нет
- Форма: просил центрирование — сделано (margin auto), ждёт проверки

## Грабли (все уже ловили)

- Dev и сборка делили `.next` → экспорт только в `.next-export`
- После рестарта dev — жёсткая перезагрузка вкладки (Cmd+Shift+R), иначе 404 чанков и «поломанный» вид
- В Next 16 `params` в страницах — только через `await params`, иначе 500
- Кириллица в путях/именах URL-кодируется; даты на старом сайте текстом
- Не коммитить: `.env.local`, пароли, `.claude/worktrees` (уже в .gitignore), graphify-out/cache
