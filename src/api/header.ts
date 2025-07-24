import request, {Method} from "@/utils/request.ts";

const GET_USER_INFO = '/management/api/permission/get_role_member_info'
const GET_TEAM_MEMBER_LIST = '/management/api/permission/get_team_company_members'
const InviteMember = '/management/api/permission/team_members_save'


// 获取当前用户信息
export const getUserInfo = (data = {}) => {
    return request(
        GET_USER_INFO,
        Method.POST,
        data
    )
}

//  获取当前团队和企业成员关系
export const getTeamCompanyMember = (data = {}) =>{
    return request(
        GET_TEAM_MEMBER_LIST,
        Method.POST,
        data
    )
}

// 邀请成员
export const ServiceInviteMember = (data = {}) => {
    return request(
        InviteMember,
        Method.POST,
        data
    )
}