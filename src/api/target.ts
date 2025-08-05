import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const TARGET_LIST = `${PREFIX}target/list`

export const ServiceTargetList = (data = {}) => {
  return request(
      TARGET_LIST,
      Method.GET,
      data
  )
}