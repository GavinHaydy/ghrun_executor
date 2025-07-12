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