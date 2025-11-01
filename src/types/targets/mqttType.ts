export interface IMqttDetail {
    /** 订阅主题 */
    topic: string;
    /** 要发送的消息内容 */
    send_message: string;
    /** 通用配置 */
    common_config: ICommonConfig;
    /** 高级配置 */
    higher_config: IHigherConfig;
    /** 遗愿配置 */
    will_config: IWillConfig;
}

export interface ICommonConfig {
    /** 客户端名称 */
    client_name: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 是否开启加密 */
    is_encrypt: boolean;
    /** 认证文件 */
    auth_file: IAuthFile;
}

export interface IHigherConfig {
    /** 连接超时时间（秒） */
    connect_timeout_time: number;
    /** 保持连接时长（秒） */
    keep_alive_time: number;
    /** 是否开启自动重连（true-开启，false-关闭） */
    is_auto_retry: boolean;
    /** 重连次数 */
    retry_num: number;
    /** 重连间隔时间（秒） */
    retry_interval: number;
    /** MQTT 版本号 */
    mqtt_version: string;
    /** 会话过期时间（秒） */
    dialogue_timeout: number;
    /** 是否保留消息 */
    is_save_message: boolean;
    /** 服务质量: 0-至多一次，1-至少一次，2-确保只有一次 */
    service_quality: number;
    /** 发送消息间隔时间（秒） */
    send_msg_interval_time: number;
}

export interface IWillConfig {
    /** 遗愿主题 */
    will_topic: string;
    /** 是否开启遗愿 */
    is_open_will: boolean;
    /** 服务质量: 0-至多一次，1-至少一次，2-确保只有一次 */
    service_quality: number;
}

export interface IAuthFile {
    /** 文件名 */
    file_name: string;
    /** 文件路径 */
    file_path: string;
}
