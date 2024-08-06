import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, theme, Avatar, Card, Flex, Col, Row } from "antd";

import "./home.scss";

const { useToken } = theme;

import { useTranslation } from "react-i18next";
import { GetPosts } from "./api";

const { Meta } = Card;
// 获取文章列表
let [PostsList, setPostsList] = useState<any>([]);//文章列表

const getPostsList = async () => {
  const res = await GetPosts();
  setPostsList(PostsList = res)
}
getPostsList()

function Home() {
  useEffect(() => {
    getPostsList()
  },[])
  const { t } = useTranslation();

  // 创建路由钩子
  const navigate = useNavigate();

  // 获取Design Token
  const { token } = useToken();


  const listItems = PostsList.map((item: any) =>
    <Card
      hoverable
      style={{ width: 500,backgroundColor: "rgba(4, 16, 10,0.5)" }}
    >
      <Avatar style={{ backgroundColor: "#f56a00", textAlign: "center" }} size="large">
           {item.author_name}
      </Avatar>
      <Meta style={{ margin: 20 }} title={`标题：${item.title}`} description={item.content} />
    </Card>


  );

  return (
    <div className="P-home at-item" style={{ background: token.colorBgContainer }}>
      {listItems}
    </div>
  );
}

export default Home;
