import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const API_TEAM_LIST = `${PREFIX}team/list`
const API_TEAM_MEMBERS = `${PREFIX}team/members`


// 获取团队列表
export const ServiceTeamList = () => {
  return request(
      API_TEAM_LIST,
      Method.GET
  )
}

// 获取团队成员列表
export const ServiceTeamMembers = (data = {}) => {
    return request(
        API_TEAM_MEMBERS,
        Method.GET,
        data
    )
}