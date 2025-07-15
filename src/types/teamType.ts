// 列表字段
export interface ITeam {
    cnt: number
    created_time_sec: number
    created_user_id: string
    created_user_name: string
    name: string
    role_id: number
    sort: number
    team_id: string
    type: number
}
export interface ITeamList {
    teams: ITeam[]
}

// 成员信息
export interface ITeamMember {
    account: string;
    avatar: string;
    company_role_level: number;
    email: string;
    invite_user_id: string;
    invite_user_name: string;
    join_time_sec: number;
    mobile: string;
    nickname: string;
    role_id: number;
    team_role_name: string;
    user_id: string;
}
export interface ITeamMemberList {
    members: ITeamMember[]
    total: number
}