import React from "react";
import { Button, Form, Input } from "antd";

const UserSearchForm = ({ onSearch }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSearch(values);
    };

    return (
        <Form layout="inline" onFinish={handleFinish} form={form}>
            <Form.Item name="username">
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="phone">
                <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    搜索
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserSearchForm;