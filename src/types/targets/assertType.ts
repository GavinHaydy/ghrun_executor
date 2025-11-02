export interface IAssert{
    // id为了表格删除
    id?: string,
    compare: string
    is_checked: number
    index?: number // 暂时没用
    response_type: number
    val: string
    var: string
}