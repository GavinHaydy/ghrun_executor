interface ISetting {
    current_team_id: string;
}

export interface IUserInfo {
    id: number;
    email: string;
    mobile: string;
    nickname: string;
    avatar: string;
    role_id: string;
    account: string;
    role_name: string;
    user_id: string;
    company_id: string;
    company_role_id: string;
    company_role_name: string;
}

export interface ISettings {
    settings: ISetting;
    user_info: IUserInfo;
}
