import request, {Method} from "@/utils/request.ts";
import {PREFIX} from "@/api/global.ts";

const API_USER_SETTING = `${PREFIX}setting/get`

export const getUserSettingService = () => {
    return request(
        API_USER_SETTING,
        Method.GET,
    )
}