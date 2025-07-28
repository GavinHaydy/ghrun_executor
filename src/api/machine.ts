import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const CHANGE_MACHINE_STATUS = `${PREFIX}machine/change_machine_on_off`

// 设备启停
export const changeMachineStatusService = (data = {}) =>{
    return request(
        CHANGE_MACHINE_STATUS,
        Method.POST,
        data
    )
}
