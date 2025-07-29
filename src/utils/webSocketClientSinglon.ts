// import {WebSocketClient} from "@/utils/wsClient.ts";
//
// const wsUrl = window.RUNTIME_ENV?.GR_WS_URL
// console.log('wsUrl', wsUrl)
// export const ws = new WebSocketClient({
//     url: `${wsUrl}/websocket/index`,
//     heartbeatInterval: 5000,
//     reconnectInterval: 5000,
// })
import {WebSocketClient} from "@/utils/wsClient.ts";

let ws: WebSocketClient | null = null;

export function getWebSocket() {
    if (!ws) {
        const url = `${window.RUNTIME_ENV?.GR_WS_URL}/websocket/index`;
        ws = new WebSocketClient({
            url,
            heartbeatInterval: 5000,
            reconnectInterval: 5000,
        });
    }
    return ws;
}