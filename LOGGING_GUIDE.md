# CodeFlow Structured Logging & Observability Guide

CodeFlow implements a production-grade structured logging pipeline to audit system health, trace executor performance, record compiler failures, and capture frontend renderer crashes.

---

## 📂 Logs Directory Structure

All structured log files are outputted to the `logs` folder at the project root:

```markdown
├── logs/
│   └── codeflow.log      # Combined system audit log (JSON lines)
```

> [!NOTE]
> The `logs/` directory is automatically ignored in production builds via `.gitignore` to prevent leaking telemetry.

---

## 📊 Log Schema (JSON Format)

Each log event is written as a single line JSON object containing the following keys:

| Field | Type | Description |
| :--- | :--- | :--- |
| `timestamp` | `string` | ISO 8601 timestamp |
| `level` | `string` | Log severity level (`INFO` \| `WARN` \| `ERROR`) |
| `category` | `string` | Monitored component (`API` \| `COMPILER` \| `TRACE` \| `VISUALIZATION`) |
| `message` | `string` | Human-readable log event title |
| `details` | `object` | Contextual metadata (errors, request latency, step sizes) |

### Sample Log Entries

#### 1. API Latency Event
```json
{"timestamp":"2026-06-21T18:04:12.321Z","level":"INFO","category":"API","message":"POST /api/problems/contains-duplicate completed in 15ms"}
```

#### 2. Slow Endpoint Warn
```json
{"timestamp":"2026-06-21T18:04:15.543Z","level":"WARN","category":"API","message":"Slow endpoint detected: GET /api/dashboard took 1250ms"}
```

#### 3. Trace Success Event
```json
{"timestamp":"2026-06-21T18:04:18.987Z","level":"INFO","category":"TRACE","message":"Trace generation succeeded for cpp in 42ms","details":{"codeLength":350,"steps":15}}
```

#### 4. Client-side Renderer Crash Report
```json
{"timestamp":"2026-06-21T18:04:22.112Z","level":"ERROR","category":"VISUALIZATION","message":"[Client Event] Renderer Crash: Cannot read properties of undefined (reading 'length')","details":{"stack":"TypeError: Cannot read properties...\n at TreeRenderer...","componentStack":"\n in TreeRenderer\n in ErrorBoundary..."}}
```

---

## 🛠️ Usage in Backend Services

Import `LoggerService` from `../services/logger.service`:

```typescript
import { LoggerService } from './services/logger.service';

// 1. Log info events
LoggerService.info('COMPILER', 'Local compiler compile succeeded', { elapsedMs: 45 });

// 2. Log warnings
LoggerService.warn('TRACE', 'AI analysis took longer than 3 seconds, falling back to heuristics.');

// 3. Log errors
LoggerService.error('COMPILER', 'Wandbox compilation timeout', { error: err.stack });
```

---

## 🖥️ Client-side Error Boundary Reporting

If a React renderer encounters a rendering crash (e.g. malformed traces), it catches the crash via the local `ErrorBoundary` and reports it over the WebSocket using the `CLIENT_LOG` protocol:

```typescript
client.send('CLIENT_LOG', {
    category: 'VISUALIZATION',
    message: `Renderer Crash: ${error.message}`,
    details: {
        stack: error.stack,
        componentStack: errorInfo.componentStack
    }
});
```

This merges frontend rendering telemetry into the backend logs, allowing unified observation of frontend crashes.
