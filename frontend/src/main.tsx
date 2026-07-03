import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

// Intercept fetch requests to add x-timezone-offset header
const originalFetch = window.fetch;
window.fetch = function (input, init) {
    const offset = new Date().getTimezoneOffset().toString();
    if (typeof input === 'string') {
        init = init || {};
        const headers = new Headers(init.headers || {});
        if (!headers.has('x-timezone-offset')) {
            headers.set('x-timezone-offset', offset);
        }
        init.headers = headers;
    } else if (input instanceof Request) {
        if (!input.headers.has('x-timezone-offset')) {
            try {
                input.headers.set('x-timezone-offset', offset);
            } catch (e) {
                init = init || {};
                const headers = new Headers(init.headers || input.headers);
                headers.set('x-timezone-offset', offset);
                init.headers = headers;
            }
        }
    }
    return originalFetch.call(this, input, init);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
