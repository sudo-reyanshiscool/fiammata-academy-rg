# Graph Report - Fiammata Academy  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 238 nodes · 461 edges · 24 communities (11 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ff6fe6c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- framer-motion
- AuthContext.tsx
- package.json
- App.tsx
- compilerOptions
- compilerOptions
- RequestMentorship.tsx
- react
- devDependencies
- run_graphify.py
- .oxlintrc.json
- Marquee.tsx
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
1. `react` - 35 edges
2. `framer-motion` - 24 edges
3. `useAuth()` - 21 edges
4. `react-router-dom` - 20 edges
5. `useToast()` - 19 edges
6. `compilerOptions` - 18 edges
7. `compilerOptions` - 15 edges
8. `cn()` - 11 edges
9. `supabase` - 10 edges
10. `mentors` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `PitPassBanner()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/PitPassBanner.tsx → src/context/AuthContext.tsx
- `Navbar()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/AuthContext.tsx
- `AskExpert()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/AskExpert.tsx → src/context/AuthContext.tsx
- `MentorDashboard()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/MentorDashboard.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (24 total, 13 thin omitted)

### Community 0 - "framer-motion"
Cohesion: 0.09
Nodes (26): framer-motion, MagneticButton(), MagneticButtonProps, MentorCard(), MentorCardProps, ScrollRevealText(), TelemetryBar(), TiltCardProps (+18 more)

### Community 1 - "AuthContext.tsx"
Cohesion: 0.13
Nodes (24): react-router-dom, @supabase/supabase-js, ProtectedRoute(), PitPassBanner(), AuthContext, AuthContextType, useAuth(), Toast (+16 more)

### Community 2 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js, name (+20 more)

### Community 3 - "App.tsx"
Cohesion: 0.12
Nodes (12): react-dom, App(), PageTransition(), Preloader(), AuthProvider(), src_index, MainLayout(), AskExpert() (+4 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "RequestMentorship.tsx"
Cohesion: 0.25
Nodes (6): mentors, MentorDashboard(), MentorProfile(), MyRequests(), MentorshipRequest, requestRepository

### Community 7 - "react"
Cohesion: 0.24
Nodes (3): react, Navbar(), TextRoll()

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
- **97 isolated node(s):** `MagneticButtonProps`, `TiltCardProps`, `MentorCardProps`, `BorderBeamProps`, `MeteorsProps` (+92 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 125 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `framer-motion`, `AuthContext.tsx`, `package.json`, `App.tsx`, `RequestMentorship.tsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `framer-motion` to `AuthContext.tsx`, `package.json`, `App.tsx`, `RequestMentorship.tsx`, `react`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `AuthContext.tsx` to `framer-motion`, `package.json`, `App.tsx`, `RequestMentorship.tsx`, `react`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `MagneticButtonProps`, `TiltCardProps`, `MentorCardProps` to the rest of the system?**
  _97 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `framer-motion` be split into smaller, more focused modules?**
  _Cohesion score 0.09390243902439024 - nodes in this community are weakly interconnected._
- **Should `AuthContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13363363363363365 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._