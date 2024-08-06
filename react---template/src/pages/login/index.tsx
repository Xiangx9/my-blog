import React from "react";
// import { useState } from "react";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Space } from "antd";
import imgLogo from "./logo.png";
import "./login.scss";
import { LoginType } from "@/typings/LoginType";
import { UserLogin, register } from "./api";

import { useNavigate } from "react-router-dom";

// 引入Redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "@/store/token/token";

function Login() {
  // const [Name, setNamee] = useState("");
  // const [Passwords, setPasswords] = useState("");
  // 去home页面
  // const navigate = useNavigate();
  // const goDetail = (Name,Password) => {
  //   navigate(`/?name=${Name}&Password=${Password}`);
  // };

  // 创建路由钩子
  const navigate = useNavigate();

  // 获取redux派发钩子
  const dispatch = useDispatch();
  // 获取store中的token
  const token = useSelector((state: any) => state.token);

  // 登录
  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    try {
      let param = {
        username: values.username,
        password: values.password,
      };
      const res = await UserLogin(param);
      console.log(res);
      if (res.message == "该用户未注册") {
        // 注册          
        Register(param);
        return;
      }
      dispatch(setToken(res.token));
      let user=JSON.stringify(res.user);
      localStorage.setItem("user", user);
      navigate(`/`);
    } catch (error) {
      console.log("登录", error);

    }
    // console.log("Success:", values);
  };

  const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // 注册
  const Register = async (param: LoginType) => {
    console.log("注册", param);
    let param1 = {
      username: param.username,
      password: param.password,
      email: param.username,
    }
    await register(param1)
    await onFinish(param);
  }
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="P-login Center">
          {/* <img src={imgLogo} alt="" className="logo" /> */}
          <div className="B-login">
            <div className="ipt-con">
              <Form.Item<LoginType>
                name="username"
                label="账号"
                rules={[{ required: true, message: "请输入账号!" }]}
              >
                <Input placeholder="请输入账号" />
              </Form.Item>
              <Form.Item<LoginType>
                name="password"
                label="密码"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <Form.Item<LoginType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
              >
                <Checkbox>记住</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 5, span: 10 }} >
                <Space>
                  <Button type="primary" htmlType="submit">
                    注册登录
                  </Button>
                  {/* <Button htmlType="button" onClick={register}>
                    注册
                  </Button> */}
                </Space>
              </Form.Item>
            </div>
            {/* <div className="ipt-con">
              <Input
                placeholder="账号"
                value={Name}
                onChange={(e) => {
                  setNamee(e.target.value);
                }}
              />
              <div className="ipt-con">
                <Input.Password
                  placeholder="密码"
                  value={Passwords}
                  onChange={(e) => {
                    setPasswords(e.target.value);
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
