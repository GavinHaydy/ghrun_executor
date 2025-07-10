import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";
import type {ITeamList} from "@/types/teamType.ts";

const API_TEAM_LIST = `${PREFIX}team/list`


// 获取团队列表
export const ServiceTeamList = () => {
  return request<ITeamList>({
      url: API_TEAM_LIST,
      method: Method.GET
  })
}