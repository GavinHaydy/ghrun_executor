export interface IBidirectional {
    ca_cert: string
    ca_cert_name: string
}

export interface IPrivateKV{
    key: string,
    value: string
}

export interface IAuth{
    kv: IPrivateKV
}

export interface IBearer{
    key: string
}