import axios, {type AxiosResponse} from "axios";
import {message} from "antd";
import Cookies, {clearAllCookies} from "@/utils/cookie.ts";
// import type {IApiResponse} from "@/types/commonType.ts";

const service = axios.create({
    timeout: 5000
});

// // 统一响应体
interface ApiResponse<T = never> {
    code: number;
    data: T;
    em: string;
    et: string;
}

// request
service.interceptors.request.use(
    config => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = token;
        }
        if (config.method === 'post' || config.method === 'put') {
            if (!config.headers["Content-Type"]) {
                config.headers["Content-Type"] = 'application/json';
            }
        }
        if (config.method === 'get' && config.data && config.url) {
            const queryString = new URLSearchParams(config.data).toString();
            config.url += config.url.includes('?') ? `&${queryString}` : `?${queryString}`
        }
        return config;
    },
    error => Promise.reject(error)
);

// response
// service.interceptors.response.use(
//     response => {
//         const res: ApiResponse = response.data;
//         const em = res.em?.toLowerCase();
//         if (em.toLowerCase().includes('token') || em === 'must login') {
//             localStorage.clear()
//             message.error(response.data["et"]).then(() => {
//                 setTimeout(() => {
//                     location.replace('/')
//                 }, 1000)
//             })
//         }
//         return res
//     },
//     (error) => {
//         message.error('网络请求失败');
//         return Promise.reject(error);
//     }
// )
service.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const {em} = response.data;
        if (em.toLowerCase().includes('token') || em === 'must login') {
            localStorage.clear()
            message.error(response.data["et"]).then(() => {
                setTimeout(() => {
                    clearAllCookies()
                    location.replace(`/exe/login`)
                }, 1000)
            })
        }
        return response
    },
    error => error.response
    //     (error) => {
//         message.error('网络请求失败');
//         return Promise.reject(error);
//     }
);


export const request = async (url: string, method: string, data?: object, headers?: Record<string, string>) => {
    const res = await service({
        url,
        method,
        data,
        headers
    });
    return res.data;
}

export const Method = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
} as const;
export default request;
