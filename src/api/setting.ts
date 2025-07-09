import request, {Method} from "@/utils/request.ts";
import {PREFIX} from "@/api/global.ts";
import type {ISettings} from "@/types/settingType.ts";

const API_USER_SETTING = `${PREFIX}setting/get`

export const getUserSettingService = () => {
    return request<ISettings>({
        url: API_USER_SETTING,
        method: Method.GET,
    })
}