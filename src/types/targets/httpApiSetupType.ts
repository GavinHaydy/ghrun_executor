export interface IHttpApiSetup {
    /** 是否跟随重定向：0=是，1=否 */
    is_redirects: number;
    /** 重定向次数（>=1，默认3） */
    redirects_num: number;
    /** 读取超时时间（毫秒或秒，视实现而定） */
    read_time_out: number;
    /** 写入超时时间 */
    write_time_out: number;
    /** 客户端名称 */
    client_name: string;
    /** 是否保持连接 */
    keep_alive: boolean;
    /** 最大空闲连接时长 */
    max_idle_conn_duration: number;
    /** 每个主机的最大连接数 */
    max_conn_per_host: number;
    /** 是否启用 User-Agent */
    user_agent: boolean;
    /** 最大连接等待超时时间 */
    max_conn_wait_timeout: number;
}
