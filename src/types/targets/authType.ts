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

// aws auth
interface IAwsv4 {
    accessKey: string,
    addAuthDataToQuery: number,
    region: string,
    secretKey: string,
    service: string,
    sessionToken: string
}

// edge auth
interface IEdge{
    accessToken: string,
    baseURi: string,
    clientSecret: string,
    clientToken: string,
    nonce: string,
    timestamp: string
}

// hawk
interface IHawk{
    algorithm: string,
    app: string,
    authId: string,
    authKey: string,
    delegation: string,
    extraData: string,
    includePayloadHash: number,
    nonce: string,
    timestamp: string
    user: string
}

// ntlm
interface INtlm {
    disableRetryRequest: number
    domain: string,
    password: string,
    username: string,
    workstation: string
}

// oauth1
interface IOAuth1 {
    addEmptyParamsToSign: number,
    addParamsToHeader: number,
    callback: string,
    consumerKey: string,
    consumerSecret: string,
    includeBodyHash: number,
    nonce: string,
    realm: string,
    signatureMethod: string,
    timestamp: string,
    token: string,
    tokenSecret: string,
    verifier: string,
    version: string
}

export interface IRequestAuth {
    awsv4: IAwsv4,
    basic: IBasic,
    bearer: IBearer,
    bidirectional: IBidirectional,
    digest: IDigest,
    edgest: IEdge,
    hawk: IHawk,
    kv: IPrivateKV,
    ntlm: INtlm,
    oauth1: IOAuth1,
    type: string
}