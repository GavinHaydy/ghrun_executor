export interface ICookie {
    description: string;
    field_type: string;
    is_checked: number
    key: string;
    not_null: number;
    type: string;
    value: string;
}
export interface ICookies {
    parameter: ICookie[];
}