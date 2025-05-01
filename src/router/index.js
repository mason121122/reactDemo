// 导入路由相关的组件和页面组件
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mail from "../pages/mail";
import User from "../pages/user";
import ReceptionPageOne from "../pages/reception/pageOne/index";
import ReceptionPageTwo from "../pages/reception/pagetwo/index";
import InventoryPageOne from "../pages/inventory/pageOne";
import InventoryPageTwo from "../pages/inventory/pageTwo";

// 定义路由配置
const routes = [
    // 根路径重定向到home页面，此处配置的是跳转逻辑的路由，config中的路由配置是导航菜单
    {
        path: "/",
        element: <Navigate to="/home" replace={true} />
    },
    // 主布局路由，包含所有子路由
    {
        path: "/",
        element: <Main />,
        children: [
            // Home页面路由
            {
                path: "home",
                element: <Home />
            },
            // Mail页面路由
            {
                path: "mail",
                element: <Mail />
            },
            // User页面路由
            {
                path: "user",
                element: <User />
            },
            // 接待管理，包含两个子页面
            {
                path: "reception",
                children: [
                    // PageOne页面路由
                    {
                        path: "/reception/pageOne/index",
                        element: <ReceptionPageOne />
                    },
                    // PageTwo页面路由
                    {
                        path: "/reception/pageTwo/index",
                        element: <ReceptionPageTwo />
                    }
                ]
            },
            // 库存管理
            {
                path: "inventory",
                children: [
                    // PageOne页面路由
                    {
                        path: "/inventory/pageOne",
                        element: <InventoryPageOne />
                    },
                    // PageTwo页面路由
                    {
                        path: "/inventory/pageTwo",
                        element: <InventoryPageTwo />
                    }
                ]
            }
        ]
    }
]

// 创建并导出路由配置
export default createBrowserRouter(routes);