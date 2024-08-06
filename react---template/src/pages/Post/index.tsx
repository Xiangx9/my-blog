import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { GetPosts, UpdatePosts, DeletePosts } from "./api";
import { Button, theme, Avatar, Card, Form, Input, Modal, message } from "antd";
import { useState } from 'react';

interface Values {
  title?: string;
  _id?: string;
  content?: string;
}

const { Meta } = Card;




function List() {
  const user = JSON.parse(localStorage.getItem('user') as any);
  let pram = {
    id: user._id
  }

  let [PostsList, setPostsList] = useState<any>([]);//文章列表
  const getPostsList = async () => {
    const res = await GetPosts(pram);
    setPostsList(PostsList = res)
  }
  useEffect(() => {
    getPostsList()
  },[])

  const { t } = useTranslation();
  const location = useLocation();


  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Values>();
  const [open, setOpen] = useState(false);

  let [_id, setid] = useState("");
  const UpdatePost = (item: any) => {
    form.setFieldsValue(item);
    setid(_id = item._id)
    setOpen(true);
  }

  const onCreate = async (values: Values) => {
    console.log('Received values of form: ', values);
    let prams = {
      id: _id,
      title: values.title,
      content: values.content,
    }

    await UpdatePosts(prams)
    await getPostsList()
    setFormValues(values);
    setOpen(false);
  };

  const DeletePost = async (item: any) => {
    let prams = {
      id: item._id,
    }
    await DeletePosts(prams)
    message.success("删除成功");
    await getPostsList()

  }

  const listItems = PostsList.map((item: any) =>
    <Card
      hoverable
      style={{ minWidth: 500, backgroundColor: "rgba(4, 16, 10,0.5)" }}
    >
      <Avatar style={{ backgroundColor: "#f56a00", textAlign: "center" }} size="large">
        {item.author_name}
      </Avatar>
      <Meta style={{ margin: 20 }} title={`标题：${item.title}`} description={item.content} />
      <Button type="primary" danger style={{ margin: 20 }} onClick={() => {
        DeletePost(item)
      }}>{t("删除")}</Button>
      <Button type="primary" style={{ margin: 20 }} onClick={() => {
        UpdatePost(item)
      }}>{t("编辑")}</Button>
    </Card>

  );

  return (
    <>
      <div>{listItems}</div>
      <Modal
        open={open}
        title="修改文章"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: 'public' }}
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="content" label="内容"
          rules={[{ required: true, message: 'Please input the content of collection!' }]}>
          <Input.TextArea />
        </Form.Item>
      </Modal>
    </>

  )
}

export default List
