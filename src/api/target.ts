import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const TARGET_LIST = `${PREFIX}target/list`
const TARGET_SAVE = `${PREFIX}target/save`
const TARGET_DETAIL = `${PREFIX}target/detail`

export const ServiceTargetList = (data = {}) => {
  return request(
      TARGET_LIST,
      Method.GET,
      data
  )
}

export const ServiceTargetSave = (data = {}) => {
  return request(
      TARGET_SAVE,
      Method.POST,
      data
  )
}

export const ServiceTargetDetail = (data = {}) => {
  return request(
      TARGET_DETAIL,
      Method.GET,
      data
  )
}