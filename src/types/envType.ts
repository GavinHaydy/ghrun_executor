export interface IEnv {
  team_id: string;
  env_id: number;
  env_name: string;
}
export interface IEnvSearchByName {
    team_id: string;
    name: string;
}
// 服务列表
export interface IEnvService {
    key: number;
    service_id: number;
    team_id: string;
    env_id: number;
    service_name: string;
    content: string;
}
export interface IEvnServiceList {
    service_list: IEnvService[];
    total: number;
}
export interface IEnvServiceSearch {
    team_id: string;
    env_id: number;
    page: number;
    size: number;
}

// db 列表
export interface IEnvDB {
    key: number;
    charset: string;
    database_id: number;
    db_name: string;
    env_id: number;
    host: string;
    password: string;
    port: number;
    server_name: string;
    team_id: string;
    type: string;
    user: string;
}
export interface IEnvDBList {
    database_list: IEnvDB[];
    total: number;
}

// create server
export interface IEnvSaveServer {
    service_id?: number;
    team_id: string;
    env_id: number;
    server_name: string;
    content: string;
}