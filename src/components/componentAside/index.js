import React from "react";
import './index.css';
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";


const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单的数组
const items = MenuConfig.map((icon ) => {
    //没有子菜单
    const child = {
        key:icon.path,
        icon:iconToElement(icon.icon),
        label:icon.label,
    }
    // 有子菜单
    if(icon.children && icon.children.length){
        child.children=icon.children.map((item) => {
            return{
                key:item.path,
                label:item.label,
            }
        })
    }
    return child

})

// 动态获取icon

const ComponentAside = ({collapsed}) => {
    console.log(collapsed);
    return (
        // <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sider trigger={null} collapsed={collapsed} >
            <h3 className="app-name">{collapsed ? '':'通用后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    )
}

export default ComponentAside;