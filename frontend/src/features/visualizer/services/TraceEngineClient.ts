import { WS_URL } from '../../../config/api';

export class TraceEngineClient {
    private static instance: TraceEngineClient | null = null;
    private ws: WebSocket | null = null;

    private constructor() {}

    public static getInstance(): TraceEngineClient {
        if (!TraceEngineClient.instance) {
            TraceEngineClient.instance = new TraceEngineClient();
        }
        return TraceEngineClient.instance;
    }

    public connect(
        onMessage: (msg: any) => void,
        onOpen: () => void,
        onClose: () => void,
        onError: (err: any) => void
    ) {
        if (this.ws) return;

        try {
            this.ws = new WebSocket(WS_URL);

            this.ws.onopen = () => {
                onOpen();
            };

            this.ws.onclose = () => {
                this.ws = null;
                onClose();
            };

            this.ws.onerror = (err) => {
                onError(err);
            };

            this.ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    onMessage(msg);
                } catch (e) {
                    console.error('Failed to parse WebSocket message:', e);
                }
            };
        } catch (error) {
            onError(error);
        }
    }

    public send(type: string, payload: any) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected');
            return;
        }
        this.ws.send(JSON.stringify({ type, payload }));
    }

    public disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    public isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }
}
export default TraceEngineClient;
