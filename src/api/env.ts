import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const API_ENV_LIST = `${PREFIX}env/get_env_list`;
const API_ENV_CREATE = `${PREFIX}env/create_env`;
const API_ENV_SERVER_LIST = `${PREFIX}env/get_service_list`;
const API_ENV_UPDATE = `${PREFIX}env/update_env`;
const API_ENV_DB_LIST = `${PREFIX}env/get_database_list`;

// 环境列表
export const ServiceEnvList = (data = {}) => {
  return request(
    API_ENV_LIST,
    Method.POST,
    data,
  );
};

// 新增环境
export const ServiceCreateEnv = (data = {}) => {
  return request(
      API_ENV_CREATE,
      Method.POST,
      data
  )
}

// 获取环境服务列表
export const ServiceEnvServerList = (data = {}) => {
  return request(
      API_ENV_SERVER_LIST,
      Method.POST,
      data
  )
}

// 更新环境
export const ServiceUpdateEnv = (data = {}) => {
  return request(
      API_ENV_UPDATE,
      Method.POST,
      data
  )
}

// 获取数据库列表
export const ServiceEnvDBList = (data = {}) => {
  return request(
      API_ENV_DB_LIST,
      Method.POST,
      data
  )
}