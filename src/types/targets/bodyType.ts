export interface IBodyParameter{
    description: string
    field_type: string
    fileBase64?: string
    id: string
    is_checked: number
    key: string
    not_null: number
    type: string
    value: string
}
export interface IBodyType{
    mode: string
    parameter: IBodyParameter
    raw: string
}