import {WebSocketClient} from "@/utils/wsClient.ts";

export const ws = new WebSocketClient({
    url: 'ws://localhost:58887/websocket/index',
    heartbeatInterval: 5000,
    reconnectInterval: 5000,
})