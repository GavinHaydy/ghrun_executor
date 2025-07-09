import axios, {type AxiosRequestConfig} from "axios";
import {message} from "antd";
import {store} from "@/store";
import type {IApiResponse} from "@/types/commonType.ts";

const service = axios.create({
    timeout: 5000
});

// request
service.interceptors.request.use(
    config=> {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers.Authorization = token;
        }
        if (config.method === 'post' || config.method === 'put') {
            if (!config.headers["Content-Type"]) {
                config.headers["Content-Type"] = 'application/json';
            }
        }
        if (config.method === 'get' && config.data && config.url){
            const queryString = new URLSearchParams(config.data).toString();
            config.url += config.url.includes('?') ? `&${queryString}` : `?${queryString}`
        }
        return config;
    },
    error => Promise.reject(error)
);

// response
service.interceptors.response.use(

    response => {
        if (response.data?.em?.toLowerCase().includes('token') || response.data["em"] === 'must login'){
            localStorage.clear()
            message.error(response.data["et"]).then(() => {
                setTimeout(() =>{location.replace('/')},1000)
            })
        }
        return response
    }
)

// 核心封装函数: 返回 IApiResponse<T>
export function typedRequest<T = unknown>(config: AxiosRequestConfig): Promise<IApiResponse<T>> {
    return service(config).then(response => response.data)

}

export const Method = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
} as const;
export default typedRequest;
