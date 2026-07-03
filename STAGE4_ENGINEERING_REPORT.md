# CodeFlow Stage 4 Refinement — Engineering Report

This report outlines the structural, architectural, and component-level refinements implemented during the Stage 4 Production-Grade Refinement Pass. All changes prioritize runtime correctness, visual responsiveness, state synchronicity, and socratic tutor masters.

---

## 1. Dashboard Synchronization Architectural Fix

### Current Issue
Previously, dashboard statistics (Total Solved, Category progress, Heatmap data, and Streaks) became out-of-sync or remained stale unless a manual page refresh occurred. This was caused by the dashboard retrieving metrics from local React states and raw `localStorage` reads while progress modifications bypassed the learning store state.

### Implementation
- **Unified Store Dispatching**: Configured `useLearningStore` with actions `fetchDashboardStats` and `fetchLearningProfile`.
- **Completion Event Subscriptions**: Updated `progressStore.ts` (`toggleCompletion`, `markAsSolved`) to trigger `fetchLearningProfile()` and `fetchDashboardStats()` synchronously upon completing backend sync operations.
- **Trace Event Re-fetching**: Hooked `recordTraceEvent` and `completeRevision` inside `learningStore.ts` to automatically query and refresh active user profiles and heatmap statistics.
- **State-Driven Presentation**: Refactored `Dashboard.tsx` to read `realHeatmapData`, `currentStreak`, and `maxStreak` directly from the Zustand store. Removed all redundant local React states and local fetch handlers.

---

## 2. Proper Recursion Tree Visualization (Interactive Call Stack)

### Current Issue
The debugger engines populated the execution frame call stack (`t.stack`) during interpretation, but the C++ and Python serialization adapters discarded these frames. Consequently, the frontend was unable to render active recursion nodes.

### Implementation
- **Trace Adapter Extension**: Updated `CppTraceAdapter` and `PythonTraceAdapter` in `trace.adapter.ts` to preserve and forward the `stack` array. Added the `stack` attribute to the `TraceStep` interface in `trace.types.ts`.
- **Dynamic Tree Reconstruction**: Developed `RecursionTreeVisualizer.tsx` to process execution steps from `0` to `currentStepIndex` on each playback frame. It maps the call history to a dynamic, interactive tree.
  - **Unique Node Keys**: Node identities are generated using the unique path signature (e.g. `root->fib(3)->fib(2)`) to allow multiple calls to the same function signatures to occupy distinct tree nodes.
  - **Cache Hit Matching**: Scans prior nodes in the call sequence to detect subproblem matches. If an identical signature was solved earlier, it marks the current node as a cache hit, graying it out and rendering a "Cache Hit ⚡" badge instead of expanding its subtree.
  - **Visual Connectors**: Integrated a pure CSS flex organizational tree layout. It uses absolute positioning for horizontal and vertical connection lines, avoiding DOM measurement calculations and ensuring responsive rendering.
- **Tab Integration**: Integrated a tab selector in `ProblemWorkspace.tsx` that appears automatically when the trace contains recursion steps, enabling seamless switching between the standard visualizer canvas and the recursion tree.

---

## 3. Dynamic Programming Visualization (Tabulation & Tabular Dependencies)

### Implementation
- **2D Grid Dependency Vectors**: Integrated a dynamic SVG overlay in `MatrixRenderer.tsx`. For tables matching DP targets (e.g., `dp`, `memo`, `table`), the visualizer draws pulsing arrows pointing from top `(r-1, c)`, left `(r, c-1)`, and diagonal `(r-1, c-1)` cell centers to the active computing cell `(r, c)`.
- **Cell Center Offset Adjustments**: Arrow coordinates are computed dynamically (`32 + index * 46` px center offset). Vectors are shortened by `22px` so that arrowheads rest precisely on cell borders.
- **1D Array Dependency Curves**: Updated `ArrayRenderer.tsx` to detect 1D DP arrays. It draws curved SVG paths from `i-1` and `i-2` index centers to the active index pointer (`i`/`curr`), illustrating tabulation dependencies.

---

## 4. Swap Animation Correctness & Pointer Separation

### Current Issue
During array swaps, cells frequently jittered or jumped far left. This resulted from a browser conflict between keyframe animations and standard `transform` transitions. Furthermore, backward swaps (e.g., swapping a right index with a left index) reversed the translation directions.

### Implementation
- **Transition Overrides**: Updated `renderers.css` to define strict transition property overrides for `.av-swap-left` and `.av-swap-right`. This disables transition effects on `transform` properties during active keyframe animations.
- **Ordered Index Translations**: Updated `ArrayRenderer.tsx` to sort swap indexes before computing left/right cell positions. This ensures that the left cell always translates forward and the right cell always translates backward, regardless of the order they appear in `swapIndices`.
- **Interfering Arrow Suppression**: Suppressed standard comparison arrow render overlays when swap animations are executing.

---

## 5. Review & Rating Moderation System

### Implementation
- **Written Review Validation**: Upgraded `TraceRatingModal.tsx` to prompt users for a written comment of at least 25 words. Implemented a real-time word counter that blocks submissions until the review text is valid.
- **Backend Spam & Profanity Filtering**: Added spam and profanity moderation inside the `submitTraceRating` controller in `feedback.controller.ts`. It screens for:
  - Blacklisted terms (offensive English and Hindi words).
  - Repeated character patterns (e.g., "aaaaa" or "nice nice nice").
  - Repeated word ratios (duplicate word density exceeding 60%).
  - E-commerce / sales keyword matches (e.g., "cheap", "make money").
- **Testimonial Integration**: Genuine reviews (passing filters) are automatically duplicated into the `Feedback` schema with `approved: true` to populate the landing page's "Loved by Engineers" section. Spam/profane reviews are saved with `approved: false` for admin moderation.

---

## 6. AI Mock Interview References Purge

### Implementation
- **Prompt Chip Removal**: Removed the "Request AI Interview" chip and its click handler from `AiTutorWidget.tsx`.
- **System Prompts Cleanup**: Removed mock interview instructions from the AI Tutor system prompt inside `ai.service.ts`, focusing the LLM strictly on dry-runs, socratic hints, and time/space complexity analysis.

---

## 7. Sidebar State & Scroll Position Persistence

### Implementation
- **Sidebar Selections Persistence**: Refactored `CuratedSheetDrawerContent` to save and restore search queries, category selections, and difficulty filters using `localStorage`.
- **Scroll Offset Persistence**: Attached a `ref` and scroll handler to the drawer container, storing and restoring the `scrollTop` offset whenever categories or active problem sets update.
- **Last-Opened Problem Recovery**: Configured the workspace mount handler to save the active problem ID in local storage and restore it on page refresh, preserving the workspace context.
