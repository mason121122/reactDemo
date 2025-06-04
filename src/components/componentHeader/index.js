import React, {useMemo} from "react";
import './index.css';
import * as Icon from '@ant-design/icons';
import {Button, Avatar, Badge, Space, Dropdown} from "antd";
import {Header} from "antd/es/layout/layout";
import {useDispatch} from 'react-redux'
import {collapseMenu} from '../../store/reducers/tab'
import {useNavigate} from "react-router-dom";
// import {MenuFoldOutlined} from "@ant-design/icons";


const ComponentHeader = ({collapsed}) => {
    const navigate = useNavigate();
    // 定义每个菜单项的点击事件处理函数
    const handleMenuItemClick = (key) => {
        switch (key) {
            case '2':
                console.log('个人中心被点击');
                // 在这里可以添加跳转到个人中心页面的逻辑
                break;
            case '3':
                console.log('设置被点击');
                // 在这里可以添加跳转到设置页面的逻辑
                break;
            case '4':
                console.log('退出被点击');
                localStorage.setItem('isLoggedIn', 'false');
                navigate('/login');
                // 在这里可以添加退出登录的逻辑
                break;
            default:
                break;
        }
    };


    const items = [
        {
            type: 'divider',
        },
        {
            key: '2',
            label: '个人中心',
            icon: <Icon.UserOutlined/>,
            extra: '⌘P',
            onClick: () => handleMenuItemClick('2'),
        },
        {
            key: '3',
            label: '设置',
            icon: <Icon.SettingOutlined/>,
            extra: '⌘S',
            onClick: () => handleMenuItemClick('3'),
        },
        {
            key: '4',
            label: '退出',
            icon: <Icon.PoweroffOutlined style={{color: 'red'}}/>,
            extra: '⌘B',
            onClick: () => handleMenuItemClick('4'),
        }
    ];

    // 创建dispath
    const dispatch = useDispatch();
    // 收起状态变化图片跟着变化
    const icons = collapsed ? <Icon.MenuUnfoldOutlined /> : <Icon.MenuFoldOutlined />;
    // 点击展开收起按钮
    const setCollapsed = (collapsed) => {
        console.log(collapsed);
        dispatch(collapseMenu(collapsed));
    }

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
                icon={icons}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    background: '#ffffff',
                }}
                onClick={() => setCollapsed(collapsed)}
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