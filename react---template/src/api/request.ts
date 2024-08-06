import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
// import qs from 'qs'

const request: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  // withCredentials: true, // 允许把cookie传递到后台
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  // 如果content-Type 是 "application/x-www-form-urlencoded" 需要对 data 进行字符转义
  // transformRequest: [
  //   (data, headers) => {
  //     return qs.stringify(data)
  //   }
  // ]
});

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据进行处理
    const { data, headers } = response;
    if (headers.authorization) {
      // 判断是否授权
      localStorage.setItem("Bear_Token", headers.authorization);
    } else {
      if (data?.token) {
        // 另一种情况token放在返回data中
        localStorage.setItem("Bear_Token", data.token);
      }
    }
    switch (data.status) {
      case 808:
        message.error("该用户已被冻结，请联系工作人员");
        break;
      case 504:
        message.error("网络超时");
        break;
      case 400:
        message.info(data.message);
        break;
      default:
        // message.info(data.message);
    }
    return response.data;
  },
  (error) => {
    const { response } = error;    
    if (response) {
      // message.error(error.message);
      message.error(response.data.message);
      return Promise.reject(error);
    } else {
      message.error("网络连接异常,请稍后再试!");
    }
  }
);
// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("Bear_Token");
    const { headers } = config;
    if (token && headers) headers.Authorization = `Bearer ${token}`; // 增加header作为判断，因改版本的headers定义不包含undefined会报错
    // 请求之前做些什么
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request as axios };
