// src/utils/WebSocketClient.ts

export interface IWSResponse<T = unknown> {
    code: number;
    data: T;
    em: string;
    et: string;
    route_url: string;
}

type MessageHandler<T = unknown> = (data: IWSResponse<T>) => void;

interface WebSocketOptions {
    url: string;
    reconnectInterval?: number;
    heartbeatInterval?: number;
    heartbeatData?: () => unknown;
}

export class WebSocketClient {
    private ws: WebSocket | null = null;
    private url: string;
    private reconnectInterval: number;
    private heartbeatInterval: number;
    private heartbeatData?: () => unknown;

    private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private sendTimestamps: Record<string, number> = {};
    private isManuallyClosed = false;

    // 全局监听器（可选）
    private globalListeners: MessageHandler[] = [];

    // 路由分发监听器
    private routeListeners: Map<string, Set<MessageHandler>> = new Map();

    constructor(options: WebSocketOptions) {
        this.url = options.url;
        this.reconnectInterval = options.reconnectInterval || 5000;
        this.heartbeatInterval = options.heartbeatInterval || 10000;
        this.heartbeatData = options.heartbeatData;
        this.connect();
    }

    private connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            if (this.heartbeatData) this.startHeartbeat(this.heartbeatData);
        };

        this.ws.onmessage = (event) => {
            let parsed: IWSResponse;

            try {
                parsed = JSON.parse(event.data);
            } catch {
                console.warn('Invalid WS message:', event.data);
                return;
            }

            // 按 route_url 分发
            const route = parsed.route_url;
            if (route && this.routeListeners.has(route)) {
                this.routeListeners.get(route)!.forEach(cb => cb(parsed));
            }

            // 全局监听器也执行
            this.globalListeners.forEach(cb => cb(parsed));
        };

        this.ws.onclose = () => {
            this.stopHeartbeat();
            if (!this.isManuallyClosed) this.reconnect();
        };

        this.ws.onerror = () => {
            this.ws?.close(); // 触发重连
        };
    }

    private reconnect() {
        if (this.reconnectTimer) return;
        this.reconnectTimer = setTimeout(() => {
            this.connect();
            this.reconnectTimer = null;
        }, this.reconnectInterval);
    }

    public startHeartbeat(fn: () => unknown) {
        this.stopHeartbeat();
        this.heartbeatTimer = setInterval(() => {
            const data = fn();
            if (data) this.send(data);
        }, this.heartbeatInterval);
    }

    public stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    public send(data: unknown) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const payload = typeof data === 'string' ? data : JSON.stringify(data);
            this.ws.send(payload);
        }
    }

    public throttledSend(key: string, data: unknown, interval = 1000): void {
        const now = Date.now();
        const last = this.sendTimestamps[key] || 0;

        if (now - last < interval) {
            console.warn(`[WS] '${key}' send skipped (interval: ${interval}ms)`);
            return;
        }

        this.sendTimestamps[key] = now;
        this.send(data);
    }

    public close() {
        this.isManuallyClosed = true;
        this.stopHeartbeat();
        this.ws?.close();
    }

    public isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }

    // ✅ 按 route_url 注册订阅
    public subscribe<T=unknown>(route: string, handler: MessageHandler<T>) {
        if (!this.routeListeners.has(route)) {
            this.routeListeners.set(route, new Set());
        }
        this.routeListeners.get(route)!.add(handler as MessageHandler);
    }

    public unsubscribe<T=unknown>(route: string, handler: MessageHandler<T>) {
        if (this.routeListeners.has(route)) {
            this.routeListeners.get(route)!.delete(handler as MessageHandler);
            if (this.routeListeners.get(route)!.size === 0) {
                this.routeListeners.delete(route);
            }
        }
    }

    // ✅ 可选的全局订阅
    public onMessage(cb: MessageHandler) {
        this.globalListeners.push(cb);
    }

    public offMessage(cb: MessageHandler) {
        this.globalListeners = this.globalListeners.filter(fn => fn !== cb);
    }
}
