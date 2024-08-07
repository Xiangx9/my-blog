import axios from "axios";
import { showMessage } from "./status"; // 引入状态码文件
import { ElMessage } from "element-plus"; // 引入el 提示框，这个项目里用什么组件库这里引什么
import tokenStore from "@/store/token.js";

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = "";

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      "Content-Type": "application/json;charset=UTF-8", // 传参方式json
      Authorization: `Bearer ${tokenStore().token}`, // 这里自定义配置，这里传的是token
    };
    return config;
  },
  (error) => {
    console.log("error");
    return Promise.reject(error);
  }
);

// 定义一个变量，用于标记 token 刷新的状态
let isRefreshing = false;
let refreshSubscribers = [];
//刷新token
function refreshToken() {
  // instance是当前request.js中已创建的axios实例
  return axios.post("/refreshtoken").then((res) => res.data);
}

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    return response;
  },
  (error) => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          // 发起刷新 token 的请求
          return refreshToken()
            .then((res) => {
              const newToken = res.data.token;
              tokenStore().token = newToken;
              // 刷新 token 完成后，重新发送之前失败的请求
              refreshSubscribers.forEach((subscriber) => subscriber(newToken));
              refreshSubscribers = [];
              
              return axios(originalRequest);
            })
            .catch((res) => {
              console.error("refreshtoken error =>", res);
              //去登录页
            })
            .finally(() => {
              isRefreshing = false;
            });
        } else {
          // 正在刷新 token，将当前请求加入队列，等待刷新完成后再重新发送
          return new Promise((resolve) => {
            refreshSubscribers.push((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axios(originalRequest));
            });
          });
        }
      }

      showMessage(response.status); // 传入响应码，匹配响应码对应信息
      ElMessage.warning(response.data.message);
      return Promise.reject(response.data);
    } else {
      ElMessage.warning("网络连接异常,请稍后再试!");
    }
  }
);

// 封装 GET POST 请求并导出
export function request(url = "", params = {}, type = "POST") {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise;
    if (type.toUpperCase() === "GET") {
      promise = axios({
        url,
        params,
      });
    } else if (type.toUpperCase() === "POST") {
      promise = axios({
        method: "POST",
        url,
        data: params,
      });
    } else if (type.toUpperCase() === "PUT") {
      promise = axios({
        method: "PUT",
        url,
        data: params,
      });
    } else if (type.toUpperCase() === "DELETE") {
      promise = axios({
        method: "delete",
        url,
        params,
      });
    }
    //处理返回
    promise
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
