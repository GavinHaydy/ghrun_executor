export interface IApiResponse<T = object> {
    em: string;
    et: string;
    data: T;
    code: number;
}
export interface ILabelAndValue {
    label: string;
    value: string;
}

export interface ITeamCompanyUserInfo {
    key: string;
    account: string;
    avatar: string;
    company_role_id: string;
    company_role_name: string;
    email: string;
    invite_user_id: string;
    invite_user_name: string;
    is_operable_company_role: boolean;
    is_operable_remove_member: boolean;
    is_operable_team_role: boolean;
    is_transfer_super_team: boolean;
    join_time_sec: number;
    mobile: string;
    nickname: string;
    status: number;
    team_role_id: string;
    team_role_name: string;
    user_id: string;
}

export interface ITeamCompanyMemberList {
    create_user_id: string;
    members: ITeamCompanyUserInfo[];
    total: number;
}
export interface ISearch{
    keyword?: string;
    page?: number;
    size?: number;
    team_id: string;
}

export interface IInviteMember {
    user_id: string;
    team_role_id: string;
}
export interface IInviteMemberList {
    team_id: string;
    members: IInviteMember[];

}

export interface IParameter{
    id: string, // id 为表单操作索引
    description?: string
    field_type?: string
    fileBase64?: string[]
    is_checked?: number
    key?: string
    not_null?: number
    type?: string
    value?: string
}