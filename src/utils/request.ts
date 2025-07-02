import axios from "axios";
import {message} from "antd";
import {store} from "@/store";

const service = axios.create({
    timeout: 5000
});

// request
service.interceptors.request.use(
    function (config) {
        const state = store.getState();
        const token = state.user.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.method === 'post' || config.method === 'put') {
            if (!config.headers["Content-Type"]) {
                config.headers["Content-Type"] = 'application/json';
            }
        }
        if (config.method === 'get' && config.data) {
            config.params = config.data;
            delete config.data;
        }
        return config;
    },
    error => Promise.reject(error)
);

// response
service.interceptors.response.use(
    function (response) {
        if (response.data?.em?.toLowerCase().includes('token') || response.data?.em === 'must login') {
            localStorage.clear();
            message.error(response.data?.et || "登录失效").then(() => {
                setTimeout(() => location.replace('/'), 1000);
            });
        }
        return response.data;
    },
    function (error) {
        void message.error(error.message || "网络异常，请稍后再试");
        return Promise.reject(error);
    }
);

export const Method = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
} as const;
export default service;
