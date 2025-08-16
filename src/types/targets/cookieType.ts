export interface ICookie {
    description: string;
    field_type: string;
    fileBase64: string|null;
    id: string;
    is_checked: number
    key: string;
    not_null: number;
    type: string;
    value: string;
}
export interface ICookies {
    parameter: ICookie[];
}