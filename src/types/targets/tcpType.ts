export interface ITcpDetail {
    /** TCP 连接地址 */
    url: string;
    /** 消息类型 */
    message_type: string;
    /** 要发送的消息内容 */
    send_message: string;
    /** TCP 配置信息 */
    tcp_config: ITcpConfig;
}

export interface ITcpConfig {
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
