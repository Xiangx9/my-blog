import axios from "axios";
import { useRouter } from 'vue-router'
import { showMessage } from "./status"; // 引入状态码文件
import { ElMessage } from "element-plus"; // 引入el 提示框，这个项目里用什么组件库这里引什么
import tokenStore from "@/store/token";
import { refreshToken, isRefreshRequest } from "./refreshtoken.js";

const router = useRouter()

let token = tokenStore().token || "";
let refreshTokens = tokenStore().refreshToken || "";
console.log("token", token);
console.log("refreshTokens", refreshTokens);

 
const service = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
 //http request 拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 配置请求头
//     if (token) {
//       config.headers = {
//         //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
//         "Content-Type": "application/json;charset=UTF-8", // 传参方式json
//         Authorization: `Bearer ${token}`, // 这里自定义配置，这里传的是token
//       };
//     }
//     return config;
//   },
//   (error) => {
//     console.log("error");
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
service.interceptors.response.use(async (res) => {
  if (res.headers.authorization) {
    const token = res.headers.authorization.replace("Bearer ", "");
    tokenStore().token = token
    service.default.headers.Authorization = `Bearer ${token}`;
  }
  if (res.headers.refreshtoken) {
    const refreshtoken = res.headers.refreshtoken.replace("Bearer ", "");
    setRefreshToken(refreshtoken);
  }
  if (res.data.code == 401 && !isRefreshRequest(res.config)) {
    const isSuccess = await refreshToken();
    if (isSuccess) {
      res.config.headers.Authorization = `Bearer ${getToken()}`;
      const resp = await service.request(res.config);
      return resp;
    } else {
      // 到登录页
      return res.data;
    }
  }
  return res.data;
});
 
export default service;