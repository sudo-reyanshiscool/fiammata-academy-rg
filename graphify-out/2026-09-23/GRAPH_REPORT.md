# Graph Report - Fiammata Academy  (2026-09-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 217 nodes · 403 edges · 23 communities (11 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `02158fe2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- package.json
- react-router-dom
- compilerOptions
- compilerOptions
- Home.tsx
- framer-motion
- devDependencies
- FindMentor.tsx
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
- `ProfileSettings()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/ProfileSettings.tsx → src/context/AuthContext.tsx
- `RequestMentorship()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/RequestMentorship.tsx → src/context/AuthContext.tsx
- `Navbar()` --calls--> `useToast()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/ToastContext.tsx
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  src/App.tsx → src/context/AuthContext.tsx
- `Navbar()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/Navbar.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (23 total, 12 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.12
Nodes (25): react, @supabase/supabase-js, PageTransition(), Preloader(), AuthContext, AuthContextType, AuthProvider(), Toast (+17 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (31): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js, name (+23 more)

### Community 2 - "react-router-dom"
Cohesion: 0.19
Nodes (11): react-router-dom, ProtectedRoute(), PitPassBanner(), useAuth(), mentors, AskExpert(), MentorDashboard(), MentorProfile() (+3 more)

### Community 3 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "Home.tsx"
Cohesion: 0.15
Nodes (10): MagneticButton(), MagneticButtonProps, items, repeatedItems, ScrollRevealText(), containerVariants, Home(), itemVariants (+2 more)

### Community 6 - "framer-motion"
Cohesion: 0.19
Nodes (5): framer-motion, Navbar(), TextRoll(), MainLayout(), AuthPortal()

### Community 7 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+3 more)

### Community 8 - "FindMentor.tsx"
Cohesion: 0.22
Nodes (8): MentorCard(), MentorCardProps, TiltCard(), TiltCardProps, Mentor, CATEGORIES, COMMON_CHALLENGES, FindMentor()

### Community 9 - "run_graphify.py"
Cohesion: 0.29
Nodes (5): os, pathlib, Fiammata Academy - Graphify Knowledge Graph Runner Extracts AST symbols, builds…, subprocess, sys

### Community 10 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

## Knowledge Gaps
- **90 isolated node(s):** `Toast`, `ToastContextType`, `ToastType`, `MagneticButtonProps`, `MentorCardProps` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `react-router-dom`, `Home.tsx`, `framer-motion`, `FindMentor.tsx`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `framer-motion` to `App.tsx`, `package.json`, `react-router-dom`, `Home.tsx`, `FindMentor.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react-router-dom` to `App.tsx`, `package.json`, `Home.tsx`, `framer-motion`, `FindMentor.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `Toast`, `ToastContextType`, `ToastType` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12181616832779624 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._