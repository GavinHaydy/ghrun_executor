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

export interface IBasic{
    username: string,
    password: string
}

export interface IDigest{
    algorithm: string,
    cnonce: string,
    nc: string,
    nonce: string,
    opaque: string,
    password: string,
    qop: string,
    realm: string,
    username: string
}