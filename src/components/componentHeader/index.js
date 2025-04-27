import React from "react";
import './index.css';
import * as Icon from '@ant-design/icons';
import {Button, Avatar, Badge, Space, Dropdown} from "antd";
import {Header} from "antd/es/layout/layout";
// import {MenuFoldOutlined} from "@ant-design/icons";


const ComponentHeader = () => {

    const items = [
        {
            type: 'divider',
        },
        {
            key: '2',
            label: '个人中心',
            icon: <Icon.UserOutlined/>,
            extra: '⌘P',
        },
        {
            key: '4',
            label: '设置',
            icon: <Icon.SettingOutlined/>,
            extra: '⌘S',
        },
        {
            key: '3',
            label: '退出',
            icon: <Icon.PoweroffOutlined style={{color: 'red'}}/>,
            extra: '⌘B',
        }
    ];


    return (
        // <Header style={{padding: 0, background: colorBgContainer}}>
        <Header className="header-container">
            {/*<Button*/}
            {/*    type="text"*/}
            {/*    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
            {/*    onClick={() => setCollapsed(!collapsed)}*/}
            {/*    style={{*/}
            {/*        fontSize: '16px',*/}
            {/*        width: 64,*/}
            {/*        height: 64,*/}
            {/*    }}*/}
            {/*/>*/}

            <Button
                type="text"
                icon={<Icon.MenuFoldOutlined/>}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    background: '#ffffff',
                }}
            />


            <Dropdown menu={{items}} placement="bottom" arrow>
                <Badge count={4}>
                    <Avatar shape="square" icon={<Icon.UserOutlined/>}/>
                </Badge>
            </Dropdown>
        </Header>
    )
}
export default ComponentHeader;