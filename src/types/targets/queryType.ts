export interface IQuery {
    description: string
    field_type: string
    is_checked: number
    key: string
    not_null: number
    type: string
    value: string
}

export interface IQueryS {
    parameter: IQuery;
}