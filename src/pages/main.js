import React, {useState} from "react";
import {Outlet, useNavigate} from 'react-router-dom'

import {Button, Layout, Menu, theme} from 'antd';
import ComponentAside from "../components/componentAside";
import ComponentHeader from "../components/componentHeader";
import '../index.css';
import {useSelector} from 'react-redux'
import CommonTag from "../components/commonTag";


const {Header, Sider, Content} = Layout;

const Main = () => {
    // const [setCollapsed] = useState(false);
    // const navigate = useNavigate();


    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 获取展开的收起的状态
    const collapsed = useSelector(state => state.tab.isCollapsed);
    return (
        <Layout>
            <ComponentAside collapsed={collapsed}/>
            <Layout>
                <ComponentHeader collapsed={collapsed}/>
                <CommonTag/>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;