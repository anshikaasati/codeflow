import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Renderer error caught by ErrorBoundary:", error, errorInfo);
        
        // Report renderer crash to the backend if connected
        import('../services/TraceEngineClient').then(({ TraceEngineClient }) => {
            const client = TraceEngineClient.getInstance();
            if (client.isConnected()) {
                client.send('CLIENT_LOG', {
                    category: 'VISUALIZATION',
                    message: `Renderer Crash: ${error.message}`,
                    details: {
                        stack: error.stack,
                        componentStack: errorInfo.componentStack
                    }
                });
            }
        }).catch(e => {
            console.error("Failed to send client crash log to backend:", e);
        });
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 bg-red-950/10 rounded-2xl text-center w-full min-h-[150px]">
                    <span className="text-red-400 font-bold text-sm mb-2">Visualization Renderer Error</span>
                    <span className="text-[11px] text-slate-400 font-mono max-w-md break-words mb-4">
                        {this.state.error?.message || 'Unknown render failure'}
                    </span>
                    <button 
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-3 py-1.5 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 hover:bg-red-900/40 transition-colors"
                    >
                        Try Resetting
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
