export interface IWebsocketDetail {
    /** WebSocket 地址 */
    url: string;
    /** 发送的消息内容 */
    send_message: string;
    /** 消息类型 */
    message_type: string;
    /** WebSocket 请求头 */
    ws_header: IWsQuery[];
    /** WebSocket 参数 */
    ws_param: IWsQuery[];
    /** WebSocket 事件 */
    ws_event: IWsQuery[];
    /** WebSocket 配置信息 */
    ws_config: IWsConfig;
}

export interface IWsConfig {
    /** 连接类型：1-长连接，2-短连接 */
    connect_type: number;
    /** 是否自动发送消息：0-非自动，1-自动 */
    is_auto_send: number;
    /** 连接持续时长（秒） */
    connect_duration_time: number;
    /** 发送消息间隔时长（毫秒） */
    send_msg_duration_time: number;
    /** 连接超时时间（毫秒） */
    connect_timeout_time: number;
    /** 重连次数 */
    retry_num: number;
    /** 重连间隔时间（毫秒） */
    retry_interval: number;
}

export interface IWsQuery {
    /** 是否选中（1选中，-1未选） */
    is_checked: number;
    /** 变量名 */
    var: string;
}