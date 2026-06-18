# CodeFlow Visualizer (Multi-Language Execution & Data Visualizer)

CodeFlow Visualizer is a production-grade, interactive code execution workspace that performs fully animated, line-by-line simulation dry runs of **C++ and Python** code. The application displays memory state structures, active stack frames, and variables inside a high-fidelity blackboard panel, complemented by dynamic flowcharts and AI explanations.

Built with **React 19**, **TypeScript 5.9**, **Zustand 5**, **Express**, **MongoDB/Mongoose**, and a hybrid execution engine (local offline execution + remote Wandbox sandbox fallback).

---

## Key Features

- **Multi-Language Support**: Complete compilation, execution, and trace visualization for both C++ and Python.
- **Monaco Code Editor**: Advanced editing workspace with syntax highlighting, autocomplete, auto-save drafts, and live sync.
- **Blackboard Visualization**: Step-by-step code animation rendering 1D Arrays, 2D Matrices, Deques, Stacks/Queues, HashMaps, Binary Trees, and Graphs.
- **Playback Controls**: Scrub, step-forward, step-back, pause, autoplay, and configure visual trace speeds.
- **Mermaid Flowchart Generator**: Converts code control flow structures dynamically into interactive Mermaid graphs.
- **Saved Visualizations**: Persistently save algorithm visualizer states, code, console inputs, speed preferences, and problem metadata.
- **Premium Developer Dashboard**: Search, sort (by Name, Date Created, Last Modified), edit titles/descriptions, clone (duplicate), and safely delete saved workspaces.
- **AI-Powered Diagnostics**: Integrated line-by-step teacher explanations and flowchart node metadata powered by **Groq Llama 3.3**.

---

## Tech Stack & Dependencies

### Frontend
- **Core**: React 19 + TypeScript 5.9 + Vite 7
- **Styling**: TailwindCSS 4 (PostCSS)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **State**: Decoupled Zustand state management (`executionStore`) and WebSocket routing (`TraceEngineClient`)
- **Animations**: Framer Motion 12
- **Auth**: Firebase Auth (GitHub provider integration)

### Backend
- **Core**: Node.js + Express + WebSocket (`ws`)
- **Database**: MongoDB + Mongoose (handling `User` and `Visualization` schemas)
- **AI Service**: Groq SDK (`llama-3.3-70b-versatile` for code traces and mapping generation) with local heuristic fallbacks (`HeuristicComplexityService`)
- **Auth**: Firebase Admin SDK (token verification middleware)
- **Hybrid Sandbox Execution**: Multi-tier local system compilation (using local `python` & `g++`) with a remote Wandbox fallback.

---

## Directory & Folder Structure

```markdown
├── backend/
│   ├── src/
│   │   ├── config/             # Database (Mongoose) & Firebase connection
│   │   ├── controllers/        # WebSocket execution messages router
│   │   ├── engine/             # Custom C++ & Python AST Interpreters
│   │   ├── middleware/         # Firebase Admin Auth validator
│   │   ├── models/             # User and Visualization MongoDB Schemas
│   │   ├── routes/             # REST endpoints (Problems, Saved Visualizations)
│   │   ├── services/           # Tracing, hybrid compiler, and Groq AI utilities
│   │   ├── types/              # Type signatures for execution flows
│   │   ├── websocket/          # WebSocket setup and connection listener
│   │   └── server.ts           # Main entry point
│   ├── .env                    # PORT, MONGODB_URI, GROQ_API_KEY
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Global widgets, Dialogs, and Navbar
│   │   ├── config/             # Firebase configuration
│   │   ├── data/               # Curated DSA problems mapping (200 problems)
│   │   ├── features/           # Feature modules
│   │   │   └── visualizer/
│   │   │       ├── components/
│   │   │       │   ├── panels/ # Canvas, Whiteboard, and Code panels
│   │   │       │   ├── renderers/ # Decoupled data structure renderers
│   │   │       │   └── RendererRegistry.tsx # Registry for all renderers
│   │   │       └── services/   # TraceEngineClient network layer
│   │   ├── pages/              # Primary routes (Home, CuratedSheet, Dashboard, Workspace)
│   │   ├── store/              # Zustand stores (authStore, executionStore, visualizationStore)
│   │   ├── App.tsx             # Route definitions
│   │   └── main.tsx
│   ├── .env                    # VITE_API_URL, Firebase credentials
│   └── package.json
│
├── tests/                      # Unified project test suite
│   ├── e2e/                    # Problem loading, execution, & trace validations
│   └── unit/                   # Interpreter and compiler engine tests
```

---

## Running Tests

CodeFlow includes a comprehensive automated validation suite to test execution engines and verify that all 200 curated DSA problems trace correctly.

Run the tests inside the `backend` directory:

```bash
cd backend

# 1. Run Python interpreter unit tests
npm run test:python

# 2. Run E2E problem validation tests (using fast AST tracer)
# This checks that all problems in data/problems load, trace, and yield valid visuals
$env:SKIP_COMPILER="true"; npm run test:e2e
```

---

## Environment Variables Configuration

To run the application, configure the following `.env` files:

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeflow
GROQ_API_KEY=gsk_... # Active Groq SDK key
FIREBASE_PROJECT_ID=codeflow-91a31
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
# Firebase web configuration
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## Setup & Run Locally

### 1. Database
Ensure MongoDB is running locally:
```bash
mongod
```

### 2. Backend Server
Navigate to the `backend` folder, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend App
Navigate to the `frontend` folder, install dependencies, and start the Vite server:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```
- Open `http://localhost:5173` to start visualizing!
- Log in to access the **Curated Sheet** progress sync and check the **Developer Dashboard** to load/duplicate/manage your saved workspaces.
