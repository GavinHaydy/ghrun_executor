// 接口文件夹
import type {IEnvInfo} from "@/types/envType.ts";
import type {IBodyType} from "@/types/targets/bodyType.ts";
import type {ICookies} from "@/types/targets/cookieType.ts";

export interface ITargetFolder {
    created_user_id: string;
    key: string
    method: string;
    name: string;
    parent_id: string;
    recent_user_id: string;
    sort: number;
    source: number;
    target_id: string;
    target_type: string;
    team_id: string;
    type_sort: number;
    url: string;
    version: number;
}
// 接口对象
export interface ITargetList {
    targets: ITargetFolder[];
    total: number;
}

// 列表搜索
export interface ITargetSearch {
    plan_id?: number
    source: number
    team_id: string
}

// request TODO
export interface ITargetRequest {
    assert: string[],
    auth: ITargetRequest,
    body: IBodyType,
    cookie: ICookies,
    description: string,
}

// save
export interface ITargetSave {
    check_result_expectID: string,
    create_dtime: number,
    env_info: IEnvInfo,
    expects: string[],
    is_changed: number,
    id_check_result: number,
    is_example: number,
    id_locked: number,
    is_mock_open: number,
    method: string,
    mock: string,
    mock_path: string,
    mock_url: string,
    name: string,
    parent_id: string,
    request: ITargetRequest
}