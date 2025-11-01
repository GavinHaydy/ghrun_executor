export interface IBidirectional {
    ca_cert: string
    ca_cert_name: string
}

export interface IPrivateKV{
    key: string,
    value: string
}
export interface IAuth {
    type: string;
    kv: IKV;
    bearer: IBearer;
    basic: IBasic;
    digest: IDigest;
    hawk: IHawk;
    awsv4: IAwsV4;
    ntlm: INtlm;
    edgegrid: IEdgegrid;
    oauth1: IOauth1;
    bidirectional: ITLS;
}

/** 双向认证配置 (TLS) */
export interface ITLS {
    ca_cert: string;
    ca_cert_name: string;
}

/** Bearer Token 认证 */
export interface IBearer {
    key: string;
}

/** 键值对认证 */
export interface IKV {
    key: string;
    value: string;
}

/** Basic 认证 */
export interface IBasic {
    username: string;
    password: string;
}

/** Digest 认证 */
export interface IDigest {
    username: string;
    password: string;
    realm: string;
    nonce: string;
    algorithm: string;
    qop: string;
    nc: string;
    cnonce: string;
    opaque: string;
}

/** Hawk 认证 */
export interface IHawk {
    authId: string;
    authKey: string;
    algorithm: string;
    user: string;
    nonce: string;
    extraData: string;
    app: string;
    delegation: string;
    timestamp: string;
    includePayloadHash: number;
}

/** AWS V4 签名认证 */
export interface IAwsV4 {
    accessKey: string;
    secretKey: string;
    region: string;
    service: string;
    sessionToken: string;
    addAuthDataToQuery: number;
}

/** NTLM 认证 */
export interface INtlm {
    username: string;
    password: string;
    domain: string;
    workstation: string;
    disableRetryRequest: number;
}

/** EdgeGrid 认证 (Akamai) */
export interface IEdgegrid {
    accessToken: string;
    clientToken: string;
    clientSecret: string;
    nonce: string;
    timestamp: string;
    baseURi: string;
    headersToSign: string;
}

/** OAuth 1.0 认证 */
export interface IOauth1 {
    consumerKey: string;
    consumerSecret: string;
    signatureMethod: string;
    addEmptyParamsToSign: number;
    includeBodyHash: number;
    addParamsToHeader: number;
    realm: string;
    version: string;
    nonce: string;
    timestamp: string;
    verifier: string;
    callback: string;
    tokenSecret: string;
    token: string;
}
