import request, {Method} from "@/utils/request.ts";
import {PREFIX} from "@/api/global.ts";

const API_USER_SETTING_GET = `${PREFIX}setting/get`
const API_USER_SETTING_SET = `${PREFIX}setting/set`


// 获取用户配置
export const getUserSettingService = () => {
    return request(
        API_USER_SETTING_GET,
        Method.GET,
    )
}

// 设置用户配置
export const setUserSettingService = (data = {}) => {
    return request(
        API_USER_SETTING_SET,
        Method.POST,
        data
    )
}