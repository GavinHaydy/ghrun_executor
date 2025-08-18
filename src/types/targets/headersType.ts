export interface IHeader {
    description: string;
    field_type: string;
    id: string;
    is_checked: number
    key: string;
    not_null: number;
    type: string;
    value: string;
}
export interface IHeaders {
    parameter: IHeader;
}