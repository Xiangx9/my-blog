import { useNavigate } from 'react-router-dom'
import type { FormProps } from 'antd';
import { Button, Form, Input,message } from 'antd';

import './account.scss'
import { useTranslation } from "react-i18next";

import {posts } from "./api";

function Account() {
    const { t } = useTranslation();
    //创建路由钩子
    const navigate = useNavigate()

    type FieldType = {
        title?: string;
        content?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const user = JSON.parse(localStorage.getItem('user') as any);
        
        let pram={
            title:values.title,
            content:values.content,
            author_id:user._id,
            author_name:user.username
        }
         await posts(pram)
         message.success('发表成功');
        navigate('/home')
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="P-account at-item">
            <h1>{t("about.content")}</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="文章标题"
                    name="title"
                    rules={[{ required: true, message: '文章标题不能为空!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="文章内容"
                    name="content"
                    rules={[{ required: true, message: '文章内容不能为空!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Account