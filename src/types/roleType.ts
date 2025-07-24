// 团队角色列表
export interface IRole {
    is_default: number
    level: number
    name: string
    role_id: string
    role_type: number
    att?: {
        is_update_permission: boolean
    }
}
export interface IRoleList {
    role: IRole
    usable_roles: IRole[]
}