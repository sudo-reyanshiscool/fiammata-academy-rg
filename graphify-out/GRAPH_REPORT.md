# Graph Report - Fiammata Academy  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 246 nodes · 473 edges · 23 communities (11 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ff6fe6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Home.tsx
- AuthContext.tsx
- package.json
- App.tsx
- react
- compilerOptions
- RequestMentorship.tsx
- compilerOptions
- devDependencies
- run_graphify.py
- .oxlintrc.json
- tsconfig.json
- vercel.json
- 20260920000000_create_requests.sql
- graphify_build
- graphify_cluster
- graphify_export
- graphify_extract
- graphify_report
- json
- networkx

## God Nodes (most connected - your core abstractions)
1. `react` - 37 edges
2. `framer-motion` - 25 edges
3. `useAuth()` - 21 edges
4. `react-router-dom` - 20 edges
5. `useToast()` - 19 edges
6. `compilerOptions` - 18 edges
7. `compilerOptions` - 15 edges
8. `cn()` - 13 edges
9. `supabase` - 10 edges
10. `mentors` - 8 edges

## Surprising Connections (you probably didn't know these)
- `BorderBeam()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/BorderBeam.tsx → src/lib/utils.ts
- `StatusPill()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/StatusPill.tsx → src/lib/utils.ts
- `Navbar()` --calls--> `useToast()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/ToastContext.tsx
- `Login()` --calls--> `useToast()`  [EXTRACTED]
  src/pages/Login.tsx → src/context/ToastContext.tsx
- `RequestMentorship()` --calls--> `useToast()`  [EXTRACTED]
  src/pages/RequestMentorship.tsx → src/context/ToastContext.tsx

## Import Cycles
- None detected.

## Communities (23 total, 12 thin omitted)

### Community 0 - "Home.tsx"
Cohesion: 0.09
Nodes (24): items, repeatedItems, ScrollRevealText(), ScrollTelemetryStroke(), ScrollTelemetryStrokeProps, BorderBeam(), BorderBeamProps, ASTEROID_PRESETS (+16 more)

### Community 1 - "AuthContext.tsx"
Cohesion: 0.15
Nodes (20): react-router-dom, @supabase/supabase-js, AuthContext, AuthContextType, AuthProvider(), Toast, ToastContext, ToastContextType (+12 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js, name (+20 more)

### Community 3 - "App.tsx"
Cohesion: 0.11
Nodes (17): react-dom, App(), ProtectedRoute(), PageTransition(), PitPassBanner(), Preloader(), useAuth(), src_index (+9 more)

### Community 4 - "react"
Cohesion: 0.13
Nodes (9): framer-motion, react, MagneticButton(), MagneticButtonProps, Navbar(), TextRoll(), TiltCardProps, Onboarding() (+1 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 6 - "RequestMentorship.tsx"
Cohesion: 0.23
Nodes (9): MentorCard(), MentorCardProps, Mentor, mentors, CATEGORIES, COMMON_CHALLENGES, FindMentor(), MentorshipRequest (+1 more)

### Community 7 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 8 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+3 more)

### Community 9 - "run_graphify.py"
Cohesion: 0.29
Nodes (5): os, pathlib, Fiammata Academy - Graphify Knowledge Graph Runner Extracts AST symbols, builds…, subprocess, sys

### Community 10 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

## Knowledge Gaps
- **101 isolated node(s):** `BorderBeamProps`, `NumberTickerProps`, `SpotlightCardProps`, `StatusPillProps`, `ScrollTelemetryStrokeProps` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 130 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Home.tsx`, `AuthContext.tsx`, `package.json`, `App.tsx`, `RequestMentorship.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `react` to `Home.tsx`, `AuthContext.tsx`, `package.json`, `App.tsx`, `RequestMentorship.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `BorderBeamProps`, `NumberTickerProps`, `SpotlightCardProps` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0915915915915916 - nodes in this community are weakly interconnected._
- **Should `AuthContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14717741935483872 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._