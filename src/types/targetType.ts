// 接口文件夹
export interface ITargetFolder {
    created_user_id: string;
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