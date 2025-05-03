import {createSlice} from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: "tab",
    initialState: {
        isCollapsed: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '店铺概况',
            }
        ],
        currentMenu: {
            path: '/',
            name: 'home',
            label: '店铺概况',
        }
    },
    reducers: {
        collapseMenu: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        selectMenuList: (state, {payload: val}) => {
            if (val.name !== 'home') {
                state.currentMenu = val;
                //  去除掉已经存在的tag就不需要添加
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabList.push(val)
                }
            } else if (val.name === 'home') {
                // 当点击home菜单时，更新currentMenu为home
                state.currentMenu = {
                    path: val.path || '/',
                    name: 'home',
                    label: '店铺概况',
                };
                
                // 确保tabList中存在home标签
                const homeIndex = state.tabList.findIndex(item => item.name === 'home');
                if (homeIndex === -1) {
                    state.tabList.push({
                        path: '/',
                        name: 'home',
                        label: '店铺概况',
                    });
                }
            }
            console.log("tabList:",state.tabList)
        },
        closeTab: (state, {payload: val}) => {
            // 防止关闭唯一的标签
            if (state.tabList.length <= 1) {
                console.log("Cannot close the only tab");
                return;
            }
            
            // 防止关闭首页标签
            if (val.name === 'home') {
                console.log("Cannot close home tab");
                return;
            }
            
            // 找到要关闭的标签
            let res = state.tabList.findIndex(item => item.name === val.name);
            if (res !== -1) {
                state.tabList.splice(res, 1);
            }
        },
        setCurrentMenu: (state, {payload: val}) => {
            if(val.name === 'home') {
                state.currentMenu = {
                    path: val.path || '/',
                    name: 'home',
                    label: '店铺概况',
                };
            }else{
                state.currentMenu = val;
            }
        }
    }
})

export const {
    collapseMenu,
    selectMenuList,
    closeTab,
    setCurrentMenu} = tabSlice.actions;
export default tabSlice.reducer;