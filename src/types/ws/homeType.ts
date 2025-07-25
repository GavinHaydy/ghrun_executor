export interface IWSApiManageData {
    api_cite_count: number;
    api_total_count: number;
    api_debug: Record<string, number>; // 日期为 key
    api_add_count: Record<string, number>; // 日期为 key
}

export interface IWSSceneManageData {
    scene_cite_count: number;
    scene_total_count: number;
    scene_debug_count: Record<string, number>;
    scene_add_count: Record<string, number>;
}

export interface IWSTeamOverviewItem {
    team_name: string;
    auto_plan_total_num: number;
    auto_plan_exec_num: number;
    stress_plan_total_num: number;
    stress_plan_exec_num: number;
}

export interface IWSAutoPlanData {
    plan_num: number;
    report_num: number;
    case_total_num: number;
    case_exec_num: number;
    case_pass_num: number;
    cite_api_num: number;
    total_api_num: number;
    cite_scene_num: number;
    total_scene_num: number;
    case_pass_percent: number;
    case_not_test_and_pass_percent: number;
    lately_report_list: string[]; // 可进一步定义 report 类型
}

export interface IWSStressPlanData {
    plan_num: number;
    report_num: number;
    api_num: number;
    scene_num: number;
    cite_api_num: number;
    total_api_num: number;
    cite_scene_num: number;
    total_scene_num: number;
    timed_plan_num: number;
    normal_plan_num: number;
    lately_report_list: string[]; // 可进一步定义 report 类型
}

export interface IWSHomeData {
    team_name: string;
    api_manage_data: IWSApiManageData;
    scene_manage_data: IWSSceneManageData;
    case_add_seven_data: Record<string, number>; // 日期为 key
    team_overview: IWSTeamOverviewItem[];
    auto_plan_data: IWSAutoPlanData;
    stress_plan_data: IWSStressPlanData;
}
