import {PREFIX} from "@/api/global.ts";
import request, {Method} from "@/utils/request.ts";

const API_ENV_LIST = `${PREFIX}env/get_env_list`;
const API_ENV_CREATE = `${PREFIX}env/create_env`;
const API_ENV_UPDATE = `${PREFIX}env/update_env`;
const API_ENV_DELETE = `${PREFIX}env/del_env`;
const API_ENV_COPY = `${PREFIX}env/copy_env`;

const API_ENV_SERVER_LIST = `${PREFIX}env/get_service_list`;
const API_ENV_SERVER_CREATE = `${PREFIX}env/save_env_service`;
const API_ENV_SERVER_DELETE = `${PREFIX}env/del_env_service`;

const API_ENV_DB_LIST = `${PREFIX}env/get_database_list`;
const API_ENV_DB_CREATE = `${PREFIX}env/save_env_database`;
const API_ENV_DB_DELETE = `${PREFIX}env/del_env_database`;

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

// 创建环境服务
export const ServiceCreateEnvServer = (data = {}) => {
  return request(
      API_ENV_SERVER_CREATE,
      Method.POST,
      data
  )
}

// 删除环境服务
export const ServiceDeleteEnvServer = (data = {}) => {
  return request(
      API_ENV_SERVER_DELETE,
      Method.POST,
      data
  )
}

// 删除环境
export const ServiceDeleteEnv = (data = {}) => {
  return request(
      API_ENV_DELETE,
      Method.POST,
      data
  )
}

// 克隆环境
export const ServiceCopyEnv = (data = {}) => {
  return request(
      API_ENV_COPY,
      Method.POST,
      data
  )
}

// 创建数据库
export const ServiceCreateDB = (data = {}) => {
  return request(
      API_ENV_DB_CREATE,
      Method.POST,
      data
  )
}

// 删除数据库
export const ServiceDeleteDB = (data = {}) => {
  return request(
      API_ENV_DB_DELETE,
      Method.POST,
      data
  )
}