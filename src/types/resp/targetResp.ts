// import type {ITargetRequest, ITargetSave} from "@/types/targetType.ts";
//
import type {ITargetRequest} from "@/types/targetType.ts";
import type {ISqlDetail} from "@/types/targets/sqlType.ts";
import type {ITcpDetail} from "@/types/targets/tcpType.ts";
import type {IWebsocketDetail} from "@/types/targets/wsType.ts";
import type {IMqttDetail} from "@/types/targets/mqttType.ts";
import type {IDubboDetail} from "@/types/targets/dubboType.ts";
import type {IEnvInfo} from "@/types/envType.ts";
import type {ICookie} from "@/types/targets/cookieType.ts";
import type {IHeaders} from "@/types/targets/headersType.ts";
import type {IAssert} from "@/types/targets/assertType.ts";

export interface IRespAPIDetail {
    target_id: string;                     // 目标ID
    parent_id: string;                     // 父级ID
    target_type: string;                   // 目标类型
    team_id: string;                       // 团队ID
    name: string;                          // 名称
    method: string;                        // HTTP方法
    url: string;                           // 请求URL
    sort: number;                          // 排序
    type_sort: number;                     // 类型排序
    request: ITargetRequest;                 // 请求详情
    version: number;                       // 版本号
    description: string;                   // 描述
    created_time_sec: number;              // 创建时间（秒）
    updated_time_sec: number;              // 更新时间（秒）
    variable: IRespKVVariable[];           // 全局变量
    configuration: IRespConfiguration;     // 场景配置
    global_variable: IRespGlobalVariable;  // 全局变量组
    sql_detail: ISqlDetail;            // MySQL 数据库详情
    tcp_detail: ITcpDetail;            // TCP 详情
    websocket_detail: IWebsocketDetail;// WebSocket 详情
    mqtt_detail: IMqttDetail;          // MQTT 详情
    dubbo_detail: IDubboDetail;        // Dubbo 详情
    env_info: IEnvInfo;                // 环境信息
}

export interface IRespKVVariable{
    key: string,
    value: string;
}

export interface IRespGlobalVariable {
    cookie: ICookie,
    header:  IHeaders,
    variable: IRespVarForm,
    assert: IAssert[]
}

export interface IRespVarForm {
    is_checked: number;          // 对应 int64
    type: string;
    fileBase64: string[];
    key: string;
    value: string | number | boolean | object | null;                  // Go 中的 interface{} => any
    not_null: number;
    description: string;
    field_type: string;
}

export interface IRespConfiguration {
    parameterizedFile: IParameterizedFile;
    scene_variable: IRespGlobalVariable;
    variable: IRespKVVariable[];
}

export interface IParameterizedFile {
    paths: IFileList[];
    real_paths: string[];
    variable_names: IVariableNames;
}

export interface IFileList {
    is_checked?: number;
    path?: string;
}

export interface IVariableNames {
    var_map_list?: Record<string, string[]>;
    index?: number;
}