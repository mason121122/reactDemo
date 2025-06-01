import React, { useEffect, useState } from "react";
import {Tag, Space, Dropdown, Menu, Button, Tooltip } from "antd";
import {useSelector,useDispatch} from "react-redux";
import {useLocation,useNavigate} from "react-router-dom";
import {closeTab,setCurrentMenu} from "../../store/reducers/tab";
import { MoreOutlined, CloseOutlined } from '@ant-design/icons';
import './index.css'

// 定义最大显示的标签数量
const MAX_VISIBLE_TAGS = 10;

const CommonTag = (props) => {
    const tabsList = useSelector(state => state.tab.tabList);
    const currentMenu = useSelector(state => state.tab.currentMenu);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    // 状态用于控制是否显示溢出菜单
    const [showOverflowMenu, setShowOverflowMenu] = useState(false);
    
        console.log("tabsList:",tabsList);
    
    const handleClose = (tag, index) => {
        // 只处理被点击的tag
        const tagToClose = {...tag};
        
        // 如果关闭的不是当前活动的tag
        if(tagToClose.path !== location.pathname) {
            // 直接关闭不需要导航
            dispatch(closeTab(tagToClose));
            return;
        }
        
        // 只有在tabsList长度大于1时才进行下一步操作
        if(tabsList.length <= 1) {
            console.log("Cannot close the only remaining tab");
            return;
        }
        
        // 计算关闭后要显示哪个tab
        let nextTagIndex;
        if(index === tabsList.length - 1) {
            // 如果关闭的是最后一个，选择前一个
            nextTagIndex = index - 1;
        } else {
            // 否则选择后一个
            nextTagIndex = index + 1;
        }
        
        // 创建一个完全新的对象作为下一个tag，避免引用问题
        const nextTag = {
            path: tabsList[nextTagIndex].path,
            name: tabsList[nextTagIndex].name,
            label: tabsList[nextTagIndex].label
        };
        
        // 先导航到新的tag
        dispatch(setCurrentMenu(nextTag));
        navigate(nextTag.path);
        
        // 然后再关闭当前tag
        setTimeout(() => {
            dispatch(closeTab(tagToClose));
        }, 0);
    }
    
    // 关闭其他标签，只保留当前标签和首页
    const closeOtherTags = () => {
        const homePage = tabsList.find(item => item.name === 'home');
        const currentPage = tabsList.find(item => item.path === currentMenu.path);
        
        // 过滤出需要关闭的标签
        const tagsToClose = tabsList.filter(item => 
            item.name !== 'home' && item.path !== currentMenu.path
        );
        
        // 关闭每个标签
        tagsToClose.forEach(tag => {
            dispatch(closeTab(tag));
        });
    }
    
    // 关闭所有标签，只保留首页并导航到首页
    const closeAllTags = () => {
        const homePage = tabsList.find(item => item.name === 'home');
        
        // 过滤出所有非首页标签
        const tagsToClose = tabsList.filter(item => item.name !== 'home');
        
        // 先导航到首页
        if(homePage) {
            dispatch(setCurrentMenu(homePage));
            navigate(homePage.path);
        }
        
        // 然后关闭所有其他标签
        tagsToClose.forEach(tag => {
            dispatch(closeTab(tag));
        });
    }
    
    //点击tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    
    // tag显示
    const setTag = (flag,item,index) => {
        // 确保首页标签不能被关闭
        const isHomePage = item.name === 'home';
        
        return (
            flag ?
                <Tag 
                    color={'#55acee'} 
                    closeIcon={!isHomePage} 
                    onClose={!isHomePage ? ()=>handleClose(item,index) : undefined}
                    key={`${item.name}-${index}-active`}
                >
                    {item.label}
                </Tag>
                :
                <Tag 
                    onClick={() =>handleChange(item)} 
                    key={`${item.name}-${index}`}
                >
                    {item.label}
                </Tag>
        )
    }
    
    // 判断两个路径是否匹配，处理/和/home特殊情况
    const isPathMatch = (path1, path2) => {
        // 处理首页特殊情况
        if ((path1 === '/' || path1 === '/home') && (path2 === '/' || path2 === '/home')) {
            return true;
        }
        return path1 === path2;
    }
    
    // 处理溢出的标签菜单
    const overflowMenu = (
        <Menu>
            {tabsList.length > MAX_VISIBLE_TAGS && 
                tabsList.slice(MAX_VISIBLE_TAGS).map((item, index) => (
                    <Menu.Item 
                        key={`overflow-${item.name}-${index}`}
                        onClick={() => handleChange(item)}
                    >
                        {item.label}
                        {item.name !== 'home' && (
                            <CloseOutlined 
                                style={{ marginLeft: 8 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose(item, MAX_VISIBLE_TAGS + index);
                                }}
                            />
                        )}
                    </Menu.Item>
                ))
            }
            <Menu.Divider />
            <Menu.Item key="close-others" onClick={closeOtherTags}>
                关闭其他
            </Menu.Item>
            <Menu.Item key="close-all" onClick={closeAllTags}>
                关闭所有
            </Menu.Item>
        </Menu>
    );
    
    return(
        <div className="tags-container">
        <Space className="common-tag" size={[0,8]}>
        {
                    currentMenu.name && tabsList.slice(0, MAX_VISIBLE_TAGS).map((item, index) =>(
                        setTag(isPathMatch(item.path, currentMenu.path), item, index)
                    ))
        }
                
                {tabsList.length > MAX_VISIBLE_TAGS && (
                    <Dropdown 
                        overlay={overflowMenu} 
                        trigger={['click']}
                        visible={showOverflowMenu}
                        onVisibleChange={setShowOverflowMenu}
                    >
                        <Tag className="more-tag">
                            <Tooltip title="更多标签">
                                <MoreOutlined />
                                <span style={{ marginLeft: 4 }}>
                                    {tabsList.length - MAX_VISIBLE_TAGS}+
                                </span>
                            </Tooltip>
                        </Tag>
                    </Dropdown>
                )}
        </Space>
            
            <div className="tag-actions">
                <Tooltip title="关闭其他标签">
                    <Button 
                        type="text" 
                        size="small" 
                        onClick={closeOtherTags}
                    >
                        关闭其他
                    </Button>
                </Tooltip>
                <Tooltip title="关闭所有标签">
                    <Button 
                        type="text" 
                        size="small" 
                        onClick={closeAllTags}
                    >
                        关闭所有
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
export default CommonTag;