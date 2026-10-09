# Graph Report - сайт  (2026-10-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1934 nodes · 4970 edges · 113 communities (87 shown, 26 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 431 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f0f48a99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lib/render-report.mjs
- verify-claim.mjs
- 23-37d2b8abcc93d9da.js
- fd9d1056-c48301b5d5dc1e0a.js
- framework-f66176bb897dc684.js
- scripts/render-report.mjs
- extract-claims.mjs
- workspace-resolver.mjs
- sanitizers/index.mjs
- l
- f
- vercel.mjs
- g
- ow
- im
- gates/index.mjs
- i
- t
- support-topics.mjs
- oG
- V
- lib/reconcile-candidates.mjs
- throttle.mjs
- _
- investigation-brief.mjs
- nb
- nl
- r
- scripts/deep-dive.mjs
- collect-signals.mjs
- citations.mjs
- iu
- n
- route-normalize.mjs
- n3
- lZ
- polyfills-78c92fac7aa8fdd8.js
- compilerOptions
- gate-investigations.mjs
- withRouteShapeWarnings
- PageHero
- collect-sub-agent-outputs.mjs
- merge-signals.mjs
- q
- playwright
- prepare-investigation-brief.mjs
- app/page.tsx
- layout.tsx
- oS
- lineOf
- n
- cb
- o
- scanners/index.mjs
- react
- d
- r
- hard-gates.mjs
- uncached-route.mjs
- count-correct.mjs
- ref_node_fs
- scanner-driven.mjs
- select-candidates.mjs
- util.mjs
- audit.js
- build-minutes-fanout.mjs
- docs-library.json
- next
- Header.tsx
- package.json
- framework-support.mjs
- cache-components-suspense-dedupe.mjs
- edge-heavy-import.mjs
- turbo-force-bypass.mjs
- use-cache-date-stamp.mjs
- partners/page.tsx
- detect_framework
- detect_framework
- queries.mjs
- unoptimized-image.mjs
- t
- Y
- external-api-slow.mjs
- platform-bot-protection.mjs
- platform-fluid-compute.mjs
- usage-spike-triage.mjs
- dependencies
- devDependencies
- isr-overrevalidation.mjs
- observability-events-attribution.mjs
- headers-in-page.mjs
- region-pin-in-config.mjs
- scripts
- next.config.js
- page-442f057f0ae1c0c5.js
- r
- c
- i
- counter-mid.js

## God Nodes (most connected - your core abstractions)
1. `i()` - 59 edges
2. `_` - 46 edges
3. `f()` - 45 edges
4. `verifyClaim()` - 42 edges
5. `oD()` - 42 edges
6. `renderReport()` - 33 edges
7. `iu()` - 33 edges
8. `extractClaims()` - 31 edges
9. `V` - 30 edges
10. `nb()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `About()` --calls--> `PageHero()`  [EXTRACTED]
  app/about/page.tsx → components/PageHero.tsx
- `Activity()` --calls--> `PageHero()`  [EXTRACTED]
  app/activity/page.tsx → components/PageHero.tsx
- `Events()` --calls--> `q()`  [EXTRACTED]
  app/events/page.tsx → lib/db.ts
- `Honor()` --calls--> `q()`  [EXTRACTED]
  app/honor/page.tsx → lib/db.ts
- `Orgs()` --calls--> `PageHero()`  [EXTRACTED]
  app/organizations/page.tsx → components/PageHero.tsx

## Import Cycles
- None detected.

## Communities (113 total, 26 thin omitted)

### Community 0 - "lib/render-report.mjs"
Cohesion: 0.05
Nodes (85): buildBudgetSummary(), buildChatPreview(), buildExactChatMessage(), buildOptions(), buildPrintCheck(), buildQuestionPayload(), buildQuestionText(), renderBudgetSummaryMarkdown() (+77 more)

### Community 1 - "verify-claim.mjs"
Cohesion: 0.06
Nodes (85): findRecContradictions(), asArray(), buildScriptHasMigrationSideEffect(), cacheInvalidationFileCache, cacheLifeNeedsContentFreshnessProof(), cleanHeaderValue(), compilePattern(), configContainsTag() (+77 more)

### Community 2 - "23-37d2b8abcc93d9da.js"
Cohesion: 0.07
Nodes (48): a(), b(), c(), d(), f(), g, h, l() (+40 more)

### Community 3 - "fd9d1056-c48301b5d5dc1e0a.js"
Cohesion: 0.05
Nodes (73): aj(), am(), ed(), eJ(), eo(), eR(), eX(), eZ() (+65 more)

### Community 4 - "framework-f66176bb897dc684.js"
Cohesion: 0.06
Nodes (50): ar(), lG(), rH(), a1(), ac(), ag(), aL(), am() (+42 more)

### Community 5 - "scripts/render-report.mjs"
Cohesion: 0.08
Nodes (57): affectedFiles(), appliesAlsoEntry(), cacheLifeIntent(), dedupEditTarget(), dedupeRecommendations(), dedupIntent(), firstAffectedFile(), fixShape() (+49 more)

### Community 6 - "extract-claims.mjs"
Cohesion: 0.09
Nodes (54): asArray(), cacheRecommendationFiles(), extractClaims(), isCacheCandidate(), mentionsAuthSensitiveParallelization(), mentionsCachedNotFoundOr404(), mentionsCacheLifeCdnHeaderClaim(), mentionsCacheLifetimeChange() (+46 more)

### Community 7 - "workspace-resolver.mjs"
Cohesion: 0.07
Nodes (54): buildPackageLookup(), buildResolver(), DEFAULT_RESOLVE_OPTIONS, detectMonorepoRoot(), escapeRegExp(), expandParts(), expandResolvedSpecifier(), expandPureBarrel() (+46 more)

### Community 8 - "sanitizers/index.mjs"
Cohesion: 0.06
Nodes (35): computeImpactLabel(), cwvIssue(), formatCwvIssue(), formatInteger(), joinEnglish(), parseSigNumber(), round1(), round2() (+27 more)

### Community 9 - "l"
Cohesion: 0.12
Nodes (41): A(), a2(), a3(), a4(), ap(), b(), C(), h() (+33 more)

### Community 10 - "f"
Cohesion: 0.12
Nodes (34): rQ(), rW(), eK(), eo(), es(), et(), eu(), ew() (+26 more)

### Community 11 - "vercel.mjs"
Cohesion: 0.12
Nodes (28): isDailyQuotaExceeded(), aggregateServicesByName(), baselineStack(), categorizeError(), checkObservabilityPlusConfiguration(), classifyObservabilityPlusConfiguration(), detectNextCacheComponents(), detectStack() (+20 more)

### Community 12 - "g"
Cohesion: 0.11
Nodes (31): aa(), ak(), ao(), aS(), at(), au(), aw(), g() (+23 more)

### Community 13 - "ow"
Cohesion: 0.13
Nodes (30): a8(), ab(), af(), ah(), aj(), aN(), aQ(), aU() (+22 more)

### Community 14 - "im"
Cohesion: 0.10
Nodes (29): a1(), a2(), a3(), a6(), a9(), aB(), aH(), aQ() (+21 more)

### Community 15 - "gates/index.mjs"
Cohesion: 0.12
Nodes (21): extractColdStarts(), gate(), metadata, DEFAULT_MAX_CODE_CANDIDATES, GATE_VERSION, gates, MAX_CODE_CANDIDATES, metadata (+13 more)

### Community 16 - "i"
Cohesion: 0.15
Nodes (28): a4(), a5(), a7(), cf(), co(), cx(), e1(), e2() (+20 more)

### Community 17 - "t"
Cohesion: 0.12
Nodes (28): av(), e6(), ew(), ic(), id(), ih(), iQ(), n() (+20 more)

### Community 18 - "support-topics.mjs"
Cohesion: 0.13
Nodes (26): citationApplies(), HERE, KNOWN_CANDIDATE_KINDS, loadSupportTopics(), matchesCandidateKind(), matchesCandidateMetrics(), matchesCandidateRoutePatterns(), matchesFrameworks() (+18 more)

### Community 19 - "oG"
Cohesion: 0.14
Nodes (27): ag(), al(), eb(), iN(), ir(), lc(), ld(), lf() (+19 more)

### Community 21 - "lib/reconcile-candidates.mjs"
Cohesion: 0.26
Nodes (24): arrayAt(), deploymentRegressionDecision(), dropWithObservation(), formatInteger(), formatMs(), formatPct(), isrOverrevalidationDecision(), numberAt() (+16 more)

### Community 22 - "throttle.mjs"
Cohesion: 0.12
Nodes (12): getMetricSemaphore, getMetricThrottle(), isRateLimited(), parsePositiveIntEnv(), resolveConcurrency(), resolveRateLimit(), retryOnRateLimit(), Semaphore (+4 more)

### Community 23 - "_"
Cohesion: 0.17
Nodes (18): _, c, ea(), ec(), ef(), ei(), es(), eu() (+10 more)

### Community 24 - "investigation-brief.mjs"
Cohesion: 0.19
Nodes (23): absoluteBriefPath(), briefRoots(), buildBrief(), cachePolicyGuidance(), capBriefFiles(), closestAncestorLayoutFiles(), isCatchAllPlaceholder(), isDynamicPlaceholder() (+15 more)

### Community 25 - "nb"
Cohesion: 0.17
Nodes (24): ae(), ci(), em(), ep(), eQ(), ev(), ey(), ia() (+16 more)

### Community 26 - "nl"
Cohesion: 0.12
Nodes (23): nk(), nw(), ea(), eb(), ee(), eh(), ei(), en() (+15 more)

### Community 27 - "r"
Cohesion: 0.12
Nodes (24): u8(), a5(), a6(), a7(), l6(), r(), lk(), lw() (+16 more)

### Community 28 - "scripts/deep-dive.mjs"
Cohesion: 0.15
Nodes (18): escapeODataString(), mergeIntoEvidence(), odataEq(), SCANNER_KINDS, simplify(), SPEC_GENERATORS, specsForCandidate(), TIME_WINDOW (+10 more)

### Community 29 - "collect-signals.mjs"
Cohesion: 0.19
Nodes (22): checkAuth(), checkCliVersion(), getContract(), getMetricsSchema(), getProjectConfig(), getUsage(), hasObservabilityPlus(), inferPlan() (+14 more)

### Community 30 - "citations.mjs"
Cohesion: 0.17
Nodes (19): compareVersion(), HERE, isKnownUrl(), LIBRARY_PATH, libraryForStack(), loadLibrary(), lookupSkillRule(), lookupUrl() (+11 more)

### Community 31 - "iu"
Cohesion: 0.20
Nodes (21): aC(), an(), ap(), ax(), az(), cu(), eg(), h() (+13 more)

### Community 32 - "n"
Cohesion: 0.14
Nodes (21): aA(), ad(), aE(), ak(), aR(), aS(), aT(), aw() (+13 more)

### Community 33 - "route-normalize.mjs"
Cohesion: 0.21
Nodes (18): candidateKey(), canonicalizeBranchPrefix(), canonicalizeRoute(), decodeSegmentToken(), dedupeCandidates(), firstRouteSegment(), isBase64FlagState(), isDynamicPlaceholder() (+10 more)

### Community 34 - "n3"
Cohesion: 0.27
Nodes (18): ai(), iz(), ll(), lr(), n0(), n1(), n2(), n3() (+10 more)

### Community 35 - "lZ"
Cohesion: 0.15
Nodes (19): ca(), cl(), eh(), l0(), ln(), lZ(), ne(), nn() (+11 more)

### Community 36 - "polyfills-78c92fac7aa8fdd8.js"
Cohesion: 0.19
Nodes (13): e(), Fl(), a(), Il(), jl(), kl(), _l(), Ml() (+5 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "gate-investigations.mjs"
Cohesion: 0.20
Nodes (14): applyAuthDisqualifier(), AUTH_ROUTE_REGEX, isAuthRoute(), CandidateContractError, candidateLabel(), nonEmptyString(), VALID_SCOPES, validateCandidate() (+6 more)

### Community 39 - "withRouteShapeWarnings"
Cohesion: 0.18
Nodes (15): byRoute(), gate(), metadata, ratioOverThreshold(), round2(), sumRows(), extractErrors(), extractFromStatusRows() (+7 more)

### Community 40 - "PageHero"
Cohesion: 0.18
Nodes (12): About(), metadata, Activity(), dirs, metadata, Events(), metadata, Honor() (+4 more)

### Community 41 - "collect-sub-agent-outputs.mjs"
Cohesion: 0.24
Nodes (16): collectInputFiles(), escapeRegExp(), extractFenceBlocks(), extractJsonValue(), findBalancedJsonSpans(), inferCandidateRefFromFile(), isRecordObject(), log() (+8 more)

### Community 42 - "merge-signals.mjs"
Cohesion: 0.23
Nodes (16): annotateCodebaseScan(), annotateFinding(), assertObject(), bestRouteSummary(), buildRouteMetricIndex(), exists(), formatRouteSignal(), hasTraffic() (+8 more)

### Community 43 - "q"
Cohesion: 0.23
Nodes (13): generateMetadata(), generateStaticParams(), HonorDetail(), catLabels, generateMetadata(), generateStaticParams(), NewsDetail(), metadata (+5 more)

### Community 44 - "playwright"
Cohesion: 0.12
Nodes (9): playwright, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium } (+1 more)

### Community 45 - "prepare-investigation-brief.mjs"
Cohesion: 0.24
Nodes (15): citationSubset(), inferFrameworkPlaybook(), inferPlaybook(), candidateRefFor(), buildFanoutPlan(), buildManifest(), candidateFamilyKey(), HERE (+7 more)

### Community 46 - "app/page.tsx"
Cohesion: 0.19
Nodes (11): Contacts(), metadata, catFallback, catLabels, Home(), newsImages, typeLabels, ConsultForm() (+3 more)

### Community 47 - "layout.tsx"
Cohesion: 0.22
Nodes (9): metadata, RootLayout(), CookieBanner(), Footer(), revealVisible(), ScrollFx(), Scheme, SCHEME_LABEL (+1 more)

### Community 48 - "oS"
Cohesion: 0.23
Nodes (15): na(), nf(), oC(), oE(), oF(), oI(), oN(), oO() (+7 more)

### Community 49 - "lineOf"
Cohesion: 0.20
Nodes (10): isApplicable(), metadata, scan(), metadata, scan(), metadata, scan(), metadata (+2 more)

### Community 50 - "n"
Cohesion: 0.23
Nodes (10): d(), i(), l(), n(), u(), s(), r(), s() (+2 more)

### Community 51 - "cb"
Cohesion: 0.22
Nodes (14): cb(), cg(), ch(), ck(), cm(), cp(), cS(), cv() (+6 more)

### Community 52 - "o"
Cohesion: 0.25
Nodes (7): a(), i(), i(), o(), a(), s(), u()

### Community 53 - "scanners/index.mjs"
Cohesion: 0.20
Nodes (7): isApplicable(), metadata, scan(), isApplicable(), metadata, scan(), metadata

### Community 54 - "react"
Cohesion: 0.20
Nodes (9): DocsPage(), metadata, D, DocsFilter(), typeLabels, catFallback, catLabels, N (+1 more)

### Community 57 - "hard-gates.mjs"
Cohesion: 0.33
Nodes (9): applyHardGates(), FLAGS_ENDPOINT, flagsEndpointReason(), isFlagsEndpointCandidate(), isWorkflowRuntimeEndpointCandidate(), normalizeRoute(), VERCEL_FLAGS_PACKAGES, WORKFLOW_ENDPOINT_PREFIXES (+1 more)

### Community 58 - "uncached-route.mjs"
Cohesion: 0.24
Nodes (8): Candidate, CandidateScope, GateMetadata, Signals, extractCacheHitRates(), extractMethodShares(), gate(), metadata

### Community 59 - "count-correct.mjs"
Cohesion: 0.27
Nodes (8): apply(), COUNT_CLAIM_TYPES, metadata, rewriteCount(), apply(), metadata, STRIP_DIRECTIVES, escapeRegex()

### Community 60 - "ref_node_fs"
Cohesion: 0.27
Nodes (7): formatBytes(), metadata, scan(), shouldSkip(), SKIP_EXTENSIONS, SKIP_PATH_PREFIXES, walk()

### Community 61 - "scanner-driven.mjs"
Cohesion: 0.36
Nodes (8): candidateForGroup(), gate(), groupFindings(), metadata, observedCacheHitRate(), questionFor(), SCANNER_GATES, uniqueStrings()

### Community 62 - "select-candidates.mjs"
Cohesion: 0.36
Nodes (8): candidateIdentity(), DEFAULT_KIND_CAPS, DIVERSITY_ELIGIBILITY, durationMsFromSignal(), isDiversityEligible(), numberFromEvidence(), numberFromSignal(), selectLaunchCandidates()

### Community 63 - "util.mjs"
Cohesion: 0.33
Nodes (6): apply(), metadata, apply(), metadata, MODE_PATTERNS, extractRoute()

### Community 64 - "audit.js"
Cohesion: 0.22
Nodes (6): mysql2, { chromium }, fs, PAGES, WIDTHS, idx

### Community 65 - "build-minutes-fanout.mjs"
Cohesion: 0.29
Nodes (6): gate(), metadata, unique(), gate(), metadata, sumRows()

### Community 66 - "docs-library.json"
Cohesion: 0.25
Nodes (7): applicableFrameworksSyntax, lastVerified, ruleSkillRefs, $schema, schemaVersion, urls, version

### Community 67 - "next"
Cohesion: 0.39
Nodes (6): metadata, SearchPage(), Item, Results(), SearchClient(), next

### Community 68 - "Header.tsx"
Cohesion: 0.32
Nodes (4): Header(), nav, HeaderSearch(), pages

### Community 69 - "package.json"
Cohesion: 0.25
Nodes (7): name, private, version, react-dom, @types/node, @types/react, typescript

### Community 70 - "framework-support.mjs"
Cohesion: 0.43
Nodes (6): classifyFrameworkSupport(), CORE_SUPPORTED_FRAMEWORKS, frameworkLabel(), LABELS, LIMITED_FRAMEWORKS, normalizeFramework()

### Community 71 - "cache-components-suspense-dedupe.mjs"
Cohesion: 0.48
Nodes (6): countMatches(), findRepeated(), metadata, record(), scan(), truncate()

### Community 72 - "edge-heavy-import.mjs"
Cohesion: 0.48
Nodes (6): extractSpecifiers(), HEAVY_PATTERNS, isEdgeRuntimeFile(), isMiddleware(), metadata, scan()

### Community 73 - "turbo-force-bypass.mjs"
Cohesion: 0.48
Nodes (6): detectBuildCacheDisabled(), lineOfMatch(), metadata, safeScripts(), scan(), truncate()

### Community 74 - "use-cache-date-stamp.mjs"
Cohesion: 0.48
Nodes (6): classifySubtype(), collectRanges(), findMatchingParen(), isInsideAnyRange(), metadata, scan()

### Community 75 - "partners/page.tsx"
Cohesion: 0.43
Nodes (5): metadata, Partners(), Logo(), P, PartnersStrip()

### Community 78 - "queries.mjs"
Cohesion: 0.53
Nodes (5): defaultNormalize(), normalizeColdStart(), normalizerFor(), QUERIES, normalizeSummary()

### Community 79 - "unoptimized-image.mjs"
Cohesion: 0.53
Nodes (5): isJsxLike(), isNextConfig(), metadata, scan(), snippet()

### Community 80 - "t"
Cohesion: 0.33
Nodes (4): t(), ee(), h(), a()

### Community 82 - "external-api-slow.mjs"
Cohesion: 0.60
Nodes (4): extractCallCounts(), extractExternalApis(), gate(), metadata

### Community 83 - "platform-bot-protection.mjs"
Cohesion: 0.60
Nodes (4): computeBotShare(), gate(), metadata, totalRequestsFromSignals()

### Community 84 - "platform-fluid-compute.mjs"
Cohesion: 0.60
Nodes (4): extractHighColdRoutes(), extractSlowHotRoutes(), gate(), metadata

### Community 85 - "usage-spike-triage.mjs"
Cohesion: 0.60
Nodes (4): aggregateSkuStats(), dayTotal(), gate(), metadata

### Community 86 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, mysql2, next, react, react-dom

### Community 87 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, playwright, @types/node, @types/react, typescript

### Community 88 - "isr-overrevalidation.mjs"
Cohesion: 0.67
Nodes (3): extractRows(), gate(), metadata

### Community 89 - "observability-events-attribution.mjs"
Cohesion: 0.67
Nodes (3): gate(), metadata, sumBilled()

### Community 90 - "headers-in-page.mjs"
Cohesion: 0.67
Nodes (3): isApplicable(), metadata, scan()

### Community 91 - "region-pin-in-config.mjs"
Cohesion: 0.67
Nodes (3): metadata, parseRegionList(), scan()

### Community 92 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, start

## Knowledge Gaps
- **4 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `typescript`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 319 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `el()` connect `fd9d1056-c48301b5d5dc1e0a.js` to `audit.js`, `t`, `im`, `_`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `_` (e.g. with `T()` and `t()`) actually correct?**
  _`_` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `lib/render-report.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.050883898709985664 - nodes in this community are weakly interconnected._
- **Why does `_` connect `_` to `23-37d2b8abcc93d9da.js`, `fd9d1056-c48301b5d5dc1e0a.js`, `t`, `Y`, `o`, `V`, `d`, `r`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `f()` (e.g. with `s()` and `w()`) actually correct?**
  _`f()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `verify-claim.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.05854049719326383 - nodes in this community are weakly interconnected._