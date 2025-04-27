import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
    HomeOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ComponentAside from "../components/componentAside";
import ComponentHeader from "../components/componentHeader";
import '../index.css';

const { Header, Sider, Content } = Layout;

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <ComponentAside/>

            <Layout>
                <ComponentHeader/>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;