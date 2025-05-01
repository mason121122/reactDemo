import React, {useEffect, useState} from "react";
import {Button, Form, Input, Table, Tag, Popconfirm, Modal,InputNumber} from "antd";
import '../user/user.css'
import API from "../../api";

const Index = () => {
    // 请求参数
    const [listData, setListData] = useState({
        commodityName: ''
    });
    // 新增和编辑状态:0新增、1编辑
    const [modalType, setModalType] = useState(0);

    // 是否打开弹窗状态
    const [isModalOpen, setIsModalOpen] = useState(false);


    // 请求返回
    const [tableData, setTableData] = useState([])
    // 新增、编辑点击事件，onClick={()=>handleClick('add')} 这个语法代码函数传值然后return出来
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen);
        if (type === 'add') {
            setModalType(0);
        } else if (type === 'edit') {
            setModalType(1);
        }
    }
    // form表单中 onFinish属性的回调函数，作用是submit按钮点击可以将表单中的值传递到回调函数中。
    const handleFinish = (e) => {
        setListData({
            name: e.name
        })
        console.log(e)
    }
    const deleteUser = async (rowData) => {
    }

    // 弹窗确定
    const handleOk = () => {
        setIsModalOpen(false);
    };
    // 弹窗取消
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // 创建form示例
    const [form] = Form.useForm();

    const getTableData = async () => {
        try {
            const {data: products} = await API.products.list({
                sort: 'price',
                order: 'desc'
            });
            console.log('获取的产品列表:', products);
            setTableData(products.data)
            // return products;
        } catch (error) {
            console.log('获取产品列表失败:', error);
            throw error;
        }
    }
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'commodityName',
        }, {
            title: '今日销量',
            dataIndex: 'TodaySales'
        }, {
            title: '本月销量',
            dataIndex: 'monthSales'
        }, {
            title: '库存预警',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color;
                        let displayText;
                        switch (tag) {
                            case '充足':
                                color = 'green';
                                displayText = '充足';
                                break;
                            case '正常':
                                color = 'geekblue';
                                displayText = '正常';
                                break;
                            case '紧张':
                                color = 'volcano';
                                displayText = '紧张';
                                break;
                            default:
                                color = 'gray';
                                displayText = '未知状态';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {displayText.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: '操作',
            render: (rowData) => {
                return (
                    <div className='flex-box'>
                        <Button style={{marginRight: '5px'}} onClick={() => handleClick(rowData)}>编辑</Button>
                        <Popconfirm
                            title="确认删除"
                            description="是否确认删除?"
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button danger onClick={() => deleteUser('edit', rowData)}>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    useEffect(() => {
        //调用后端接口获取用户数据
        getTableData();
    }, []);

    return (
        <div>
            <div className='user'>
                <div className='flex-box space-between'>
                    <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                    <Form layout='inline' onFinish={handleFinish}>
                        <Form.Item name='keyword'>
                            <Input placeholder='请输入用户名'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary'>搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table columns={columns} dataSource={tableData} rowKey={'id'}></Table>
                <Modal
                    title={modalType ? '编辑' : '新增'}
                    open={isModalOpen}
                    onOk={handleOk}
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
                    >
                        <Form.Item
                            label={'商品名称'}
                            name={'commodityName'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品名称'
                                }
                            ]}
                        >
                            <Input placeholder={'请输入商品名称'}></Input>
                        </Form.Item>

                        <Form.Item
                            label={'今日销量'}
                            name={'TodaySales'}
                            rules={[
                                {
                                    required: true,//是否必填
                                    message: '请输入今日销量'
                                },
                                {
                                    type: 'number',// 输入类型
                                    message:'请输入数字'
                                }
                            ]}
                        >
                            <InputNumber placeholder={'请输入今日销量'}></InputNumber>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default Index;