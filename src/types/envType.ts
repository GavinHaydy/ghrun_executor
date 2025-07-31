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