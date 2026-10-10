# Graph Report - hkoop-site  (2026-10-09)

## Corpus Check
- Large corpus: 389 files · ~507,338 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 158 nodes · 230 edges · 27 communities (9 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Shell and Search
- Info Pages
- Dependencies
- TypeScript Config
- Homepage and Partners
- Database Schema
- Documents Page
- Work Plan 2026
- Policy and Branding
- Next Config
- Partner Logos
- Main Banner
- Nesterova Honor Photo
- Skakun Honor Photo
- Sushko Honor Photo
- Vorona Honor Photo
- Yanchenko Honor Photo
- Prosecutor Emblem
- SPbUHSS Logo
- Krai Coat of Arms
- Rostrud Emblem
- RSPP Logo
- SFR Logo
- Solidarnost Logo
- Decorative Logo

## God Nodes (most connected - your core abstractions)
1. `PageHero()` - 19 edges
2. `q()` - 18 edges
3. `compilerOptions` - 16 edges
4. `react` - 12 edges
5. `next` - 7 edges
6. `RootLayout()` - 6 edges
7. `Home()` - 6 edges
8. `PartnersStrip()` - 6 edges
9. `parseTags()` - 6 edges
10. `NewsPage()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Инструкция пресс-службе` --references--> `План работы 2026`  [INFERRED]
  docs/ИНСТРУКЦИЯ-ПРЕСС-СЛУЖБЕ.md → public/docs/plan-raboty-2026.pdf
- `Памятка разработки` --references--> `Политика конфиденциальности`  [EXTRACTED]
  docs/ПАМЯТКА-РАЗРАБОТКИ.md → public/docs/politika.pdf
- `Памятка разработки` --references--> `Logo HKOOP`  [EXTRACTED]
  docs/ПАМЯТКА-РАЗРАБОТКИ.md → public/images/logo.png
- `About()` --calls--> `PageHero()`  [EXTRACTED]
  app/about/page.tsx → components/PageHero.tsx
- `Activity()` --calls--> `PageHero()`  [EXTRACTED]
  app/activity/page.tsx → components/PageHero.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Honor Book Entities** — public_images_honor_didukh, public_images_honor_nesterova, public_images_honor_vorona, public_images_honor_yanchenko [EXTRACTED 1.00]

## Communities (27 total, 18 thin omitted)

### Community 0 - "App Shell and Search"
Cohesion: 0.12
Nodes (18): metadata, RootLayout(), pages, Results(), SearchPage(), CookieBanner(), Footer(), Header() (+10 more)

### Community 1 - "Info Pages"
Cohesion: 0.16
Nodes (17): About(), Activity(), dirs, Contacts(), Events(), Honor(), catLabels, generateStaticParams() (+9 more)

### Community 2 - "Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, mysql2, next, react, react-dom, devDependencies, @types/node, @types/react (+13 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "Homepage and Partners"
Cohesion: 0.20
Nodes (11): catLabels, Home(), newsImages, typeLabels, Partners(), Counter(), Logo(), P (+3 more)

### Community 5 - "Database Schema"
Cohesion: 0.29
Nodes (6): documents, events, honor, news, partners, site_settings

### Community 6 - "Documents Page"
Cohesion: 0.47
Nodes (4): DocsPage(), D, DocsFilter(), typeLabels

### Community 7 - "Work Plan 2026"
Cohesion: 0.50
Nodes (4): DB README.md, Инструкция пресс-службе, План работы 2026, Photo: Didukh

### Community 8 - "Policy and Branding"
Cohesion: 0.50
Nodes (3): Памятка разработки, Политика конфиденциальности, Logo HKOOP

## Knowledge Gaps
- **24 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `typescript`, `DB README.md` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 83 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Shell and Search` to `Dependencies`, `Homepage and Partners`, `Documents Page`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell and Search` be split into smaller, more focused modules?**
  _Cohesion score 0.12413793103448276 - nodes in this community are weakly interconnected._
- **Why does `next` connect `App Shell and Search` to `Dependencies`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Why does `PageHero()` connect `Info Pages` to `Homepage and Partners`, `Documents Page`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._