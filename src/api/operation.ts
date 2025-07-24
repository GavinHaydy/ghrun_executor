import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const OPERATION_LIST = `${PREFIX}operation/list`

// 操作日志
export const getOperationListService = (data = {}) =>{
    return request(
        OPERATION_LIST,
        Method.GET,
        data
    )
}