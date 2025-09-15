export interface IApiSetting{
    client_name: string,
    is_redirects: number,
    keep_alive: boolean,
    max_conn_per_host: number,
    max_conn_wait_timeout: number,
    max_idle_conn_duration: number,
    read_time_out: number,
    redirects_num: number,
    user_agent: boolean,
    write_time_out: number
}