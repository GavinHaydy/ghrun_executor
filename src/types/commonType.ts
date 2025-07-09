export interface IApiResponse<T = object> {
    em: string;
    et: string;
    data: T;
    code: number;
}