# Graph Report - Fiammata Academy  (2026-09-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 219 nodes · 411 edges · 23 communities (11 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4a52d28b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-router-dom
- package.json
- App.tsx
- RequestMentorship.tsx
- compilerOptions
- framer-motion
- compilerOptions
- react
- devDependencies
- run_graphify.py
- .oxlintrc.json
- tsconfig.json
- vercel.json
- graphify_build
- graphify_cluster
- graphify_export
- graphify_extract
- graphify_report
- json
- networkx

## God Nodes (most connected - your core abstractions)
1. `react` - 29 edges
2. `framer-motion` - 22 edges
3. `react-router-dom` - 20 edges
4. `useToast()` - 19 edges
5. `compilerOptions` - 18 edges
6. `useAuth()` - 17 edges
7. `compilerOptions` - 15 edges
8. `supabase` - 10 edges
9. `mentors` - 8 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useToast()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/ToastContext.tsx
- `ProfileSettings()` --calls--> `useToast()`  [EXTRACTED]
  src/pages/ProfileSettings.tsx → src/context/ToastContext.tsx
- `RequestMentorship()` --calls--> `useToast()`  [EXTRACTED]
  src/pages/RequestMentorship.tsx → src/context/ToastContext.tsx
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `Navbar()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (23 total, 12 thin omitted)

### Community 0 - "react-router-dom"
Cohesion: 0.15
Nodes (19): react-router-dom, @supabase/supabase-js, AuthContext, AuthContextType, Toast, ToastContext, ToastContextType, ToastProvider() (+11 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js, name (+20 more)

### Community 2 - "App.tsx"
Cohesion: 0.12
Nodes (15): react-dom, App(), ProtectedRoute(), PageTransition(), Preloader(), AuthProvider(), useAuth(), src_index (+7 more)

### Community 3 - "RequestMentorship.tsx"
Cohesion: 0.18
Nodes (12): MentorCard(), MentorCardProps, TiltCard(), TiltCardProps, Mentor, mentors, CATEGORIES, COMMON_CHALLENGES (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "framer-motion"
Cohesion: 0.15
Nodes (13): framer-motion, MagneticButton(), MagneticButtonProps, items, Marquee(), repeatedItems, CharacterProps, ScrollRevealText() (+5 more)

### Community 6 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 7 - "react"
Cohesion: 0.22
Nodes (8): react, CommandPalette(), Footer(), Navbar(), PitPassBanner(), ScrollToTop(), TextRoll(), MainLayout()

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
- **90 isolated node(s):** `Toast`, `ToastContextType`, `ToastType`, `TiltCardProps`, `MagneticButtonProps` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 113 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `react-router-dom`, `package.json`, `App.tsx`, `RequestMentorship.tsx`, `framer-motion`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `framer-motion` to `react-router-dom`, `package.json`, `App.tsx`, `RequestMentorship.tsx`, `react`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react-router-dom` to `package.json`, `App.tsx`, `RequestMentorship.tsx`, `framer-motion`, `react`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `Toast`, `ToastContextType`, `ToastType` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._