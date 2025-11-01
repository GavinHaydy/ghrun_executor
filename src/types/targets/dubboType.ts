export interface IDubboDetail {
    /** 接口名称 */
    api_name: string;
    /** 函数名称 */
    function_name: string;
    /** Dubbo 协议 */
    dubbo_protocol: string;
    /** 参数列表 */
    dubbo_param: IDubboParam[];
    /** 断言列表 */
    dubbo_assert: IDubboAssert[];
    /** 提取规则 */
    dubbo_regex: IDubboRegex[];
    /** Dubbo 配置信息 */
    dubbo_config: IDubboConfig;
}

export interface IDubboConfig {
    /** 注册中心名称 */
    registration_center_name: string;
    /** 注册中心地址 */
    registration_center_address: string;
    /** 版本号 */
    version: string;
}

export interface IDubboAssert {
    /** 是否选中（1 选中，-1 未选） */
    is_checked: number;
    /** 响应类型 */
    response_type: number;
    /** 变量名 */
    var: string;
    /** 比较方式 */
    compare: string;
    /** 比较值 */
    val: string;
    /** 提取第几个值 */
    index: number;
}

export interface IDubboRegex {
    /** 是否选中（1 选中，-1 未选） */
    is_checked: number;
    /** 提取类型：0-正则，1-json */
    type: number;
    /** 变量名 */
    var: string;
    /** 表达式（正则或 JSONPath） */
    express: string;
    /** 提取值 */
    val: string;
    /** 提取第几个值 */
    index: number;
}

export interface IDubboParam {
    /** 是否选中（1 选中，-1 未选） */
    is_checked: number;
    /** 参数类型 */
    param_type: string;
    /** 变量名 */
    var: string;
    /** 参数值 */
    val: string;
}
