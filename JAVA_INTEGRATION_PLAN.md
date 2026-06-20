# CodeFlow Java Integration Architecture Audit

This document audits and plans the integration of Java into the CodeFlow codebase, ensuring alignment with the patterns established for C++ and Python.

---

## 1. Frontend Architecture

### Language Selector
* **Location**: Found in `frontend/src/features/visualizer/components/LanguageSelector.tsx` and managed by the zustand store `frontend/src/store/languageStore.ts`.
* **Details**: Resolves selection events and syncs with local storage. We register Java as a standard member of the `LanguageType` enum ('cpp' | 'python' | 'java').

### Monaco Editor Configuration
* **Location**: Found in `frontend/src/features/visualizer/components/CodeEditor.tsx`.
* **Details**: Dynamically switches editor language syntax highlighting mode to `language="java"` when Java is selected. Uses Monaco's built-in Java syntax rules.

### Problem Loading
* **Location**: Managed by `frontend/src/pages/ProblemWorkspace.tsx`.
* **Details**: Dynamically queries the selected problem definition file (e.g. `frontend/src/data/problems/arrays-hashing/two-sum.ts`) and retrieves the `languages.java.starterCode` string. Fallbacks to default template code if a specific problem does not specify a Java starter.

### Workspace State & Draft Handling
* **Location**: Managed in `ProblemWorkspace.tsx` and database user preference tables.
* **Details**: Drafts are serialized to `localStorage` under keys of format `codeflow_saved_code_${problemId}_java`. They are also synced to MongoDB drafts under the `selectedLanguage` key.

### Run Code & Trace Requests
* **Location**: Controlled by `frontend/src/store/executionStore.ts` via WebSocket messages.
* **Details**:
  * `RUN_CODE` requests send `{ code, input, language: 'java' }`.
  * `EXECUTE` (Trace) requests send the same bundle over WS to trigger the debugging step recorder.

---

## 2. Backend Architecture

### Compiler Abstraction
* **Location**: `backend/src/services/compiler.service.ts`
* **Details**: Contains the `CompilerService` class with an `execute` function. It attempts local execution via `javac` + `java`, and falls back to Wandbox using the `openjdk-jdk-22+36` compiler payload, ensuring reliability in sandbox-limited environments.

### Execution Providers
* **Local Provider**: Spawns `javac` inside a temp folder, compiles `Main.java`, and then spawns `java Main`.
* **Remote Fallback**: POSTs to Wandbox API `https://wandbox.org/api/compile.json` with the compiler `openjdk-jdk-22+36`.

### Trace Pipeline
* **Location**: `backend/src/engine/languages/java/executor.ts` and `backend/src/engine/languages/java/trace_runner_java.py`.
* **Details**: Utilizes the Java Debug Wire Protocol (JDWP) via raw socket connection on a dynamically bound port. The python script step-executes the JVM, queries class metadata, parses frame variables, dereferences heap objects, and outputs traces matching CodeFlow's standard trace format.

### Complexity Engine
* **Location**: `backend/src/services/heuristicComplexity.service.ts`
* **Details**: Performs syntax matches on Java collection classes (e.g., `ArrayList`, `HashMap`, `HashSet`, `TreeMap`, `LinkedList`) and loop markers to estimate big-O run time and memory space complexities.

### Explanation Engine
* **Location**: `backend/src/services/ai.service.ts`
* **Details**: Instructs the LLM via prompt design to understand Java grammar, identifying loops (`for (int i = 0; i < n; i++)`), containers (`ArrayList`, `HashMap`), and returning step-by-step explanations.

---

## 3. Data Layer

### Problem Schema
* **Location**: Type definitions in `frontend/src/types/index.ts` and `ProblemDefinition` objects in `frontend/src/data/problems/**/*.ts`.
* **Details**: Problem schema represents language assets under a dictionary of `languages`:
  ```ts
  languages: {
      cpp: { starterCode: string };
      python: { starterCode: string };
      java: { starterCode: string };
  }
  ```

### Language Mappings
* **Location**: `backend/src/engine/language.registry.ts` and `frontend/src/types/language.ts`.
* **Details**: Stores extension maps, label mappings, and validation flags centrally.

### User Preferences
* **Location**: MongoDB user schemas in `backend/src/models/User.ts`.
* **Details**: Integrates `preferredLanguage: { type: String, enum: ['cpp', 'python', 'java'] }` for profile persistence.

---

## 4. Testing Suite

### Unit Tests
* **Java Compiler**: Verifies compilation and execution via `tests/unit/java_compiler.test.ts`.
* **Java Validator**: Verifies syntax checking, loop warning, and brace balancing via `tests/unit/java_validator.test.ts`.
* **Java Tracing**: Verifies JDWP step extraction and fallback modes via `tests/unit/java_trace.test.ts`.

### E2E / Verification Tests
* **Java Workspace Runner**: Compiles and verifies the solution outputs for all supported Java problems via `tests/e2e/verify_java_problems.e2e.test.ts`.
