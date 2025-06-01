import React,{useEffect} from "react";
import {Row, Col, Card} from "antd";
import "./home.css";
import API from '../../api';

const Home = () => {
    const userImage = require("../../assets/images/user.png");
    // 异步请求方法
    const fetchProducts = async () => {
        // try {
        //     const { data: products } = await API.products.list({
        //         sort: 'price',
        //         order: 'desc'
        //     });
        //     console.log('获取的产品列表:', products);
        //     return products;
        // } catch (error) {
        //     console.log('获取产品列表失败:', error);
        //     throw error;
        // }
    }
    // 异步请求回调方法
    const handleProductData = (products) => {
        console.log('接收到的产品列表:', products);
        // 这里可以进行其他操作，比如更新组件状态
    };

    useEffect(() => {
        // 在useEffect中调用异步方法
        fetchProducts()
            .then((products) => {
                console.log('成功:', products);
            })
            .catch((error) => {
                console.error('失败:', error.message);
                // 这里可以根据错误类型进行不同的提示处理
                if (error.response && error.response.status === 404) {
                    console.log('未找到产品列表');
                } else if (error.response && error.response.status === 500) {
                    console.log('服务器内部错误');
                } else {
                    console.log('请求发生未知错误');
                }
            });
    }, []);
    return (
        <div>
            <Row className="home">
                <Col span={8}>
                    <Card
                        hoverable
                    >
                        <div className="user">
                            <img src={userImage}></img>
                            <div className="userInfo">
                                <p className="name">Admin</p>
                                <p className="access">超级管理员</p>
                            </div>
                        </div>
                        <div className="login-info">
                            <p>上次登陆时间：<span>2025-1-1</span></p>
                            <p>上次登陆地点：<span>武汉</span></p>
                        </div>
                    </Card>

                </Col>
                <Col span={16}></Col>
            </Row>
        </div>
    )
}

export default Home;