import React from "react";
import './index.css';
import MenuConfig from '../../config'
import Router from '../../router'
import * as Icon from '@ant-design/icons';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectMenuList} from '../../store/reducers/tab';


const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单的数组
const items = MenuConfig.map((icon) => {

    //没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label,
    }
    // 有子菜单
    if (icon.children && icon.children.length) {
        child.children = icon.children.map((item) => {
            return {
                key: item.path,
                icon: item.icon ? iconToElement(item.icon) : null,
                label: item.label,
            }
        })
    }
    return child

})

// 动态获取icon

const ComponentAside = ({collapsed}) => {
    const navigation = useNavigate();

    const dispatch = useDispatch();
    // 添加数据到store
    const setTabList =(val)=>{
        dispatch(selectMenuList(val))
    }

    //点击菜单

    const selectMenus = (e) => {
        let data
        console.log(e, 'e')
        // 获取被点击的菜单的key和keyPath
        const clickedKey = e.key;
        
        // tag组件联动
        MenuConfig.forEach(item => {
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                // 如果是有二级菜单
                if(e.keyPath.length > 1){
                    // 二级菜单的路径在keyPath[0]中
                    const childPath = e.keyPath[0];
                    data = item.children.find(child => child.path === childPath);
                }
            }
        })
        
        if (data) {
        setTabList({
                path: data.path,
                name: data.name,
                label: data.label
        })
            // 使用data.path确保导航到正确的路径
            navigation(data.path)
        }
    }

    return (
        // <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sider trigger={null} collapsed={collapsed} width="250px">
            <h3 className="app-name">{collapsed ? '' : '通用后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                items={items}
                onClick={selectMenus}
            />
        </Sider>
    )
}

export default ComponentAside;