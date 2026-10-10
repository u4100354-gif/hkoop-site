# CONTEXT.md — контекст проекта «Новый сайт ХКООП»

Перенеси этот файл в новый чат (мне или другой нейронке) + ветку `skills-only` из репозитория.
Без секретов: пароли только в `db/README.md` и `.env.local` (не коммитить, не вставлять в чат).

## Что это

Новый сайт Союза «Хабаровское краевое объединение организаций профсоюзов» (ХКООП).
Старый сайт habprof.ru (Joomla 3.10, EOL) не трогаем. Разработка локально, демо на GitHub Pages.

## Стек

- Next.js 14 App Router + React 18 + TypeScript, CSS без фреймворков (`app/globals.css`, токены в `:root`)
- MariaDB (MySQL-совместимая), доступ через `lib/db.ts` (mysql2 pool, серверные компоненты)
- Локально: http://localhost:3100 (dev), phpMyAdmin http://127.0.0.1:8081, БД `hkoop`
- Прод-слепок: https://u4100354-gif.github.io/ (статика из `.next-export`, деплой `bash /tmp/deploy.sh`)
- Репозиторий: `u4100354-gif/hkoop-site`, ветки: `main` (исходники), `gh-pages`-аналог `u4100354-gif.github.io:main` (статика), `skills-only` (скиллы + граф)

## Команды

```bash
npm run dev -- -p 3100        # разработка
npx tsc --noEmit              # проверка перед сборкой (обязательно)
STATIC_EXPORT=1 npm run build  # экспорт в .next-export (dev в .next не трогает)
bash /tmp/deploy.sh           # сборка + пуш статики на Pages
```

## Структура кода

- `app/` — страницы: `/`, `/news`, `/news/[id]`, `/docs`, `/about`, `/activity`, `/honor`, `/honor/[id]`, `/partners`, `/organizations`, `/events`, `/contacts`, `/search`
- `components/` — Header (+HeaderSearch), Footer, Slider (Apple-style), ConsultForm, NewsFilter, DocsFilter, PartnersStrip, Counter, ScrollFx, ViProvider, CookieBanner, PageHero, SearchClient
- `lib/db.ts` — пул MySQL + `q()` + `parseTags()`
- `data/*.json` — исходные сиды (сайт читает БД, не их)
- `db/` — schema.sql, seed*.sql, fix_*.sql, README (доступы)
- `public/` — images/*, docs/*.pdf, search-index.json (генерируется `scripts/gen-search-index.mjs`)
- `docs/` — ПАМЯТКА-РАЗРАБОТКИ.md, ИНСТРУКЦИЯ-ПРЕСС-СЛУЖБЕ.md
- `AGENTS.md` — правила (вайб-кодинг, стоп-лист, процесс), `DESIGN.md` — дизайн-система

## БД `hkoop` (таблицы, строк на 09.10.2026)

- news(211): id, title, date, category (novosti/molodezh/ohrana-truda/mezhdunarodnoe/podderzhka), tags TEXT-JSON, excerpt, old_url, image
- documents(91): id, title, type (plan/soglashenie/program/policy/document), year, file_old, file_local, old_url
- partners(13): id, name, url, logo
- honor(7): id, fio, title, year, photo, text (полные биографии)
- events(3): id, title, date, type, old_url
- site_settings(11): org/short/address/phone/fax/email/hours/stats_note/social_vk/social_tg/social_max

## Схемка: граф знаний проекта (graphify)

- Построен `graphify . --code-only` (без API-ключа; полный с PDF/картинками требует GEMINI/ANTHROPIC/OPENAI-ключ)
- Ветка `skills-only`: `graphify-out/graph.json` (1934 узла, 4970 рёбер, 113 сообществ), `GRAPH_REPORT.md`, `manifest.json`
- Обновление после правок: `graphify update .` (код — бесплатно), отчёт: `graphify cluster-only .`
- Скилл: `.agents/skills/graphify/` (вопросы по архитектуре — сначала как graphify-запрос)
- Состав: код приложения (app/components/lib/scripts) + шум из node_modules/.next-export (игнора у graphify нет)
- Хабы: layout/Header/Slider/фильтры, lib/db.ts — центр связей данных

## Решения (не менять молча)

- Дизайн: тёмно-синий + серое меню как оригинал, Apple-приёмы (слайдер кроссфейд+Ken Burns), новый логотип сохранён
- Все правки сначала на localhost, на Pages только по команде «обнови сайт»
- Контент правит пресс-служба (потом своя админка, пока phpMyAdmin + инструкция)
- Форма консультации шлёт на тестовую почту u4100354@gmail.com (mailto-заглушка)
- Статистика «в цифрах» — ориентиры (~22/~19/~100 тыс.), точные цифры запрошены у руководства
- Подпись «* Ориентировочно…» убрана с главной (10.10.2026); цифры остаются ориентирами до ответа руководства
- EN+CN версии, тёмная тема, Метрика (новый счётчик), ежедневные бэкапы — запланировано, не сделано
- Каталог организаций: на старом сайте грузится скриптом, нужен список от аппарата

## Известные грабли

- Dev-сервер + сборка делят `.next` → экспорт только в `.next-export` (уже в next.config.js)
- После рестарта dev-сервера во вкладке жёсткая перезагрузка (Cmd+Shift+R), иначе 404 чанков
- Кириллица в именах файлов URL-кодируется; даты на старом сайте текстом («15 сентября»)
