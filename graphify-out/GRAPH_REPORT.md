# Graph Report - Fiammata Academy  (2026-09-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 218 nodes · 404 edges · 23 communities (11 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d55f1d2e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- framer-motion
- react
- package.json
- App.tsx
- compilerOptions
- compilerOptions
- devDependencies
- Navbar.tsx
- run_graphify.py
- dependencies
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
10. `Navbar()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useToast()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/ToastContext.tsx
- `ProfileSettings()` --calls--> `useToast()`  [EXTRACTED]
  src/pages/ProfileSettings.tsx → src/context/ToastContext.tsx
- `RequestMentorship()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/RequestMentorship.tsx → src/context/AuthContext.tsx
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `PitPassBanner()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/PitPassBanner.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (23 total, 12 thin omitted)

### Community 0 - "framer-motion"
Cohesion: 0.10
Nodes (22): framer-motion, MagneticButton(), MagneticButtonProps, items, repeatedItems, MentorCard(), MentorCardProps, ScrollRevealText() (+14 more)

### Community 1 - "react"
Cohesion: 0.14
Nodes (21): react, react-router-dom, @supabase/supabase-js, AuthContext, AuthContextType, Toast, ToastContext, ToastContextType (+13 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (24): name, private, scripts, build, dev, graph, lint, preview (+16 more)

### Community 3 - "App.tsx"
Cohesion: 0.13
Nodes (13): ProtectedRoute(), PageTransition(), PitPassBanner(), Preloader(), AuthProvider(), useAuth(), AskExpert(), AuthPortal() (+5 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+3 more)

### Community 7 - "Navbar.tsx"
Cohesion: 0.24
Nodes (3): Navbar(), TextRoll(), MainLayout()

### Community 8 - "run_graphify.py"
Cohesion: 0.29
Nodes (5): os, pathlib, Fiammata Academy - Graphify Knowledge Graph Runner Extracts AST symbols, builds…, subprocess, sys

### Community 9 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js

### Community 10 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

## Knowledge Gaps
- **90 isolated node(s):** `MentorCardProps`, `TiltCardProps`, `MagneticButtonProps`, `Toast`, `ToastContextType` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 117 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `framer-motion`, `package.json`, `App.tsx`, `Navbar.tsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `framer-motion` to `react`, `package.json`, `App.tsx`, `Navbar.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react` to `framer-motion`, `package.json`, `App.tsx`, `Navbar.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `MentorCardProps`, `TiltCardProps`, `MagneticButtonProps` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `framer-motion` be split into smaller, more focused modules?**
  _Cohesion score 0.09957325746799431 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.1411764705882353 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._