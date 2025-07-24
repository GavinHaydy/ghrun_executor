// src/utils/WebSocketClient.ts

type MessageHandler = (data: unknown) => void;

interface WebSocketOptions {
    url: string;
    reconnectInterval?: number;
    heartbeatInterval?: number;
    heartbeatData?: () => unknown; // 默认心跳内容（可选）
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

    private messageListeners: MessageHandler[] = [];
    private openListeners: (() => void)[] = [];
    private closeListeners: (() => void)[] = [];
    private errorListeners: ((e: Event) => void)[] = [];

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
            this.openListeners.forEach(cb => cb());
            if (this.heartbeatData) {
                this.startHeartbeat(this.heartbeatData);
            }
        };

        this.ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                this.messageListeners.forEach(cb => cb(parsed));
            } catch {
                this.messageListeners.forEach(cb => cb(event.data));
            }
        };

        this.ws.onclose = () => {
            this.closeListeners.forEach(cb => cb());
            this.stopHeartbeat();
            if (!this.isManuallyClosed) {
                this.reconnect();
            }
        };

        this.ws.onerror = (e) => {
            this.errorListeners.forEach(cb => cb(e));
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

    // ✅ 显式心跳控制
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

    // ✅ 事件注册器
    public onMessage(cb: MessageHandler) {
        this.messageListeners.push(cb);
    }

    public onOpen(cb: () => void) {
        this.openListeners.push(cb);
    }

    public onClose(cb: () => void) {
        this.closeListeners.push(cb);
    }

    public onError(cb: (e: Event) => void) {
        this.errorListeners.push(cb);
    }

    // ✅ 事件注销器（可选）
    public offMessage(cb: MessageHandler) {
        this.messageListeners = this.messageListeners.filter(fn => fn !== cb);
    }

    public offOpen(cb: () => void) {
        this.openListeners = this.openListeners.filter(fn => fn !== cb);
    }

    public offClose(cb: () => void) {
        this.closeListeners = this.closeListeners.filter(fn => fn !== cb);
    }

    public offError(cb: (e: Event) => void) {
        this.errorListeners = this.errorListeners.filter(fn => fn !== cb);
    }
}
