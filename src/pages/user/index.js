import React,{useEffect} from "react";
import {Button, Form, Input} from "antd";
import '../user/user.css'
import API from "../../api";

const Index = () => {
    // onClick={()=>handleClick('add')} 这个语法代码函数传值然后return出来
    const handleClick = () => {

    }
    // form表单中 onFinish属性的回调函数，作用是submit按钮点击可以将表单中的值传递到回调函数中。
    const handleFinish = (e) => {
        console.log(e)
    }
    const getTableData = async () => {
        try {
            const { data: products } = await API.products.list({
                sort: 'price',
                order: 'desc'
            });
            console.log('获取的产品列表:', products);
            return products;
        } catch (error) {
            console.log('获取产品列表失败:', error);
            throw error;
        }
    }

    useEffect(() => {
        //调用后端接口获取用户数据
        getTableData();
    }, []);
    return (
        <div>
            <div className='user'>
                <div className='flex-box space-between'>
                    <Button type="primary" onClick={()=>handleClick('add')}>+新增</Button>
                    <Form layout='inline' onFinish={handleFinish}>
                        <Form.Item name='keyword'>
                            <Input placeholder='请输入用户名'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary'>搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Index;