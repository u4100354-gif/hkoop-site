# Независимый аудит для Claude Code

Скопируй блок ниже целиком и вставь Клоду одним сообщением.
Пути абсолютные — читай файлы только прямым обращением (Read), маски и Glob не используем.

---

Ты — независимый тестировщик. Проект: новый сайт ХКООП (Next.js 14 App Router + MariaDB), локально /Users/ura/сайт, dev http://localhost:3100. Старый habprof.ru не трогаем.

Прочитай ПРЯМО СЕЙЧАС каждый файл из списка через Read (все пути точные, относительные заменить нечем):

Каркас и стили:
- /Users/ura/сайт/app/layout.tsx
- /Users/ura/сайт/app/globals.css
- /Users/ura/сайт/app/page.tsx
- /Users/ura/сайт/next.config.js
- /Users/ura/сайт/package.json
- /Users/ura/сайт/lib/db.ts

Страницы:
- /Users/ura/сайт/app/news/page.tsx
- /Users/ura/сайт/app/news/[id]/page.tsx
- /Users/ura/сайт/app/docs/page.tsx
- /Users/ura/сайт/app/about/page.tsx
- /Users/ura/сайт/app/activity/page.tsx
- /Users/ura/сайт/app/honor/page.tsx
- /Users/ura/сайт/app/honor/[id]/page.tsx
- /Users/ura/сайт/app/partners/page.tsx
- /Users/ura/сайт/app/organizations/page.tsx
- /Users/ura/сайт/app/events/page.tsx
- /Users/ura/сайт/app/contacts/page.tsx
- /Users/ura/сайт/app/search/page.tsx

Компоненты:
- /Users/ura/сайт/components/Header.tsx
- /Users/ura/сайт/components/HeaderSearch.tsx
- /Users/ura/сайт/components/Footer.tsx
- /Users/ura/сайт/components/Slider.tsx
- /Users/ura/сайт/components/NewsFilter.tsx
- /Users/ura/сайт/components/DocsFilter.tsx
- /Users/ura/сайт/components/PartnersStrip.tsx
- /Users/ura/сайт/components/ConsultForm.tsx
- /Users/ura/сайт/components/Counter.tsx
- /Users/ura/сайт/components/ScrollFx.tsx
- /Users/ura/сайт/components/ViProvider.tsx
- /Users/ura/сайт/components/CookieBanner.tsx
- /Users/ura/сайт/components/PageHero.tsx
- /Users/ura/сайт/components/SearchClient.tsx

Данные и БД (читай первые 30 строк каждого, целиком не надо):
- /Users/ura/сайт/data/news.json
- /Users/ura/сайт/data/documents.json
- /Users/ura/сайт/data/partners.json
- /Users/ura/сайт/data/honor.json
- /Users/ura/сайт/data/events.json
- /Users/ura/сайт/data/contacts.json
- /Users/ura/сайт/db/schema.sql
- /Users/ura/сайт/db/README.md

Правила проекта:
- /Users/ura/сайт/AGENTS.md
- /Users/ura/сайт/DESIGN.md
- /Users/ura/сайт/CONTEXT.md

НЕ ЧИТАЙ: /Users/ura/сайт/db/phpmyadmin/* (чужой вендор), node_modules, .next, .next-export, public/images, public/docs (бинарники).

Задача: строгий аудит как независимый тестировщик. Проверь minimum 10 проблем: безопасность (XSS через excerpt/тексты из БД, SQL-инъекции, секреты), баги вёрстки и логики, доступность (a11y, версия для слабовидящих, тап-таргеты, контраст), SEO (title/description/h1/alt), производительность (картинки без размеров, тяжёлые PDF в public/docs ~240МБ, лишние клиентские компоненты), соответствие AGENTS.md/DESIGN.md (стоп-лист, отступы, состояния loading/empty/error).

Формат ответа: нумерованный список, каждый пункт — файл:строка, что не так, насколько критично (критично/важно/мелочь), как исправить в 1-2 строках. Воду не лей. Ничего не правь, только отчёт.

---
