// 接口文件夹
import type {IEnvInfo} from "@/types/envType.ts";
import type {IBodyType} from "@/types/targets/bodyType.ts";
import type {IHeaders} from "@/types/targets/headersType.ts";
import type {IQuery} from "@/types/targets/queryType.ts";
import type {IRegex} from "@/types/targets/regexType.ts";
import type {ISqlDetail} from "@/types/targets/sqlType.ts";
import type {ITcpDetail} from "@/types/targets/tcpType.ts";
import type {IWebsocketDetail} from "@/types/targets/wsType.ts";
import type {IMqttDetail} from "@/types/targets/mqttType.ts";
import type {IDubboDetail} from "@/types/targets/dubboType.ts";
import type {IEvent} from "@/types/targets/eventType.ts";
import type {IAssert} from "@/types/targets/assertType.ts";
import type {ICookie} from "@/types/targets/cookieType.ts";
import type {IHttpApiSetup} from "@/types/targets/httpApiSetupType.ts";
import type {IAuth} from "@/types/targets/authType.ts";

export interface ITargetFolder {
    created_user_id: string;
    key: string
    method: string;
    name: string;
    parent_id: string;
    recent_user_id: string;
    sort: number;
    source: number;
    target_id: string;
    target_type: string;
    team_id: string;
    type_sort: number;
    url: string;
    version: number;
}
// 接口对象
export interface ITargetList {
    targets: ITargetFolder[];
    total: number;
}

// 列表搜索
export interface ITargetSearch {
    plan_id?: number
    source: number
    team_id: string
}




// request TODO
export interface ITargetRequest {
    pre_url: string,
    url: string
    method: string,
    description: string,
    auth: IAuth,
    body: IBodyType,
    header: IHeaders,
    query: IQuery,
    event: IEvent,
    cookie: ICookie,
    assert: IAssert[],
    regex: IRegex[],
    http_api_setup: IHttpApiSetup
}

// IResponse
export interface IResponseParameter {
    expect: object,
    parameter: string[],
    raw: string
}


// save payload
export interface ITargetSave {
    description: string,
    dubbo_detail: IDubboDetail,
    env_info: IEnvInfo,
    method: string,
    mqtt_detail: IMqttDetail,
    name: string,
    old_target_id: string,
    old_parent_id: string,
    parent_id: string,
    request: ITargetRequest,
    sort: number,
    source: number,
    source_id: string,
    sql_detail: ISqlDetail,
    target_id: string,
    target_type: string,
    tcp_detail: ITcpDetail,
    team_id: string,
    type_sort: number,
    url: string,
    version: number
    websocket_detail: IWebsocketDetail,
}