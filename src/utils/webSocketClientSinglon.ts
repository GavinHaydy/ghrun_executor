import {WebSocketClient} from "@/utils/wsClient.ts";

const wsUrl = window.RUNTIME_ENV?.GR_WS_URL
export const ws = new WebSocketClient({
    url: `${wsUrl}/websocket/index`,
    heartbeatInterval: 5000,
    reconnectInterval: 5000,
})