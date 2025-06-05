import React from "react";
import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;

const UserEditModal = React.forwardRef(({
                                            isModalOpen,
                                            handleOk,
                                            handleCancel,
                                            modalType,
                                            initialValues
                                        }, ref) => {
    const [form] = Form.useForm();

    // 表单提交时触发的函数，将表单数据传递给父组件
    const onFinish = (values) => {
        handleOk(values);
    };

    React.useImperativeHandle(ref, () => ({
        resetFields: () => {
            form.resetFields();
        }
    }));

    return (
        <Modal
            title={modalType ? '编辑' : '新增'}
            open={isModalOpen}
            // 点击确定按钮时提交表单
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText={"确定"}
            cancelText={'取消'}
        >
            <Form
                form={form}
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span: 18
                }}
                labelAlign="left"
                // 表单提交时调用 onFinish 函数
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item
                    label={'用户名'}
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名'
                        }
                    ]}
                >
                    <Input placeholder={'请输入用户名'} />
                </Form.Item>

                <Form.Item
                    label={'真实姓名'}
                    name='realName'
                    rules={[
                        {
                            required: true,
                            message: '请输入真实姓名'
                        }
                    ]}
                >
                    <Input placeholder={'请输入真实姓名'} />
                </Form.Item>
                <Form.Item
                    label={'邮箱'}
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱'
                        }
                    ]}
                >
                    <Input placeholder={'请输入邮箱'} />
                </Form.Item>

                <Form.Item
                    label={'手机号'}
                    name='phone'
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号'
                        }
                    ]}
                >
                    <Input placeholder={'请输入手机号'} />
                </Form.Item>

                <Form.Item
                    label={'状态'}
                    name='status'
                    rules={[
                        {
                            required: true,
                            message: '请选择状态'
                        }
                    ]}
                >
                    <Select placeholder="请选择状态">
                        <Option value="1">正常</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={'备注'}
                    name='remark'
                    rules={[
                        {
                            required: false,
                            message: '请输入备注'
                        }
                    ]}
                >
                    <Input placeholder={'请输入备注'} />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default UserEditModal;