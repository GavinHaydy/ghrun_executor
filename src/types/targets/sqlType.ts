export interface ISqlDetail {
    /** SQL 语句 */
    sql_string: string;
    /** 断言列表 */
    assert: ISqlAssert[];
    /** 关联提取 */
    regex: ISqlRegex[];
    /** 使用的数据库信息 */
    sql_database_info: ISqlDatabaseInfo;
}

export interface ISqlAssert {
    /** 是否选中（1选中，-1未选） */
    is_checked: number;
    /** 字段名 */
    field: string;
    /** 比较方式 */
    compare: string;
    /** 比较值 */
    val: string;
    /** 断言时提取第几个值 */
    index: number;
}

export interface ISqlRegex {
    /** 是否选中（1选中，-1未选） */
    is_checked: number;
    /** 变量名 */
    var: string;
    /** 字段名 */
    field: string;
    /** 提取第几个值 */
    index: number;
}

export interface ISqlDatabaseInfo {
    /** 数据库类型 */
    type: string;
    /** 服务名称 */
    server_name: string;
    /** 主机地址 */
    host: string;
    /** 用户名 */
    user: string;
    /** 密码 */
    password: string;
    /** 端口 */
    port: number;
    /** 数据库名 */
    db_name: string;
    /** 字符集 */
    charset: string;
}
