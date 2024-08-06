// 项目入口文件
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { store } from "@/store";
import { Provider } from "react-redux";

import App from "./App.tsx";

import { ConfigProvider } from "antd";
// 引入Ant Design中文语言包
import zhCN from "antd/locale/zh_CN";
import enUS from 'antd/locale/en_US';

// 全局样式
import "./common/styles/global.scss"; 
import "./common/fonts/font.css";  // 引入字体
import "./common/iocnfont/iconfont.css"; // 引入图标

// import store from "./store/index";
// import { Provider } from "react-redux";

// 正式上线前，一定不要忘记关掉Mock.js！！！直接注释掉import './mock'
// import './mock'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);
