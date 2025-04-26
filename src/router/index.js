// 导入路由相关的组件和页面组件
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mail from "../pages/mail";
import User from "../pages/user";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";

// 定义路由配置
const routes = [
    // 根路径重定向到home页面
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
            // Other页面路由组，包含两个子页面
            {
                path: "other",
                children: [
                    // PageOne页面路由
                    {
                        path: "pageOne",
                        element: <PageOne />
                    },
                    // PageTwo页面路由
                    {
                        path: "pageTwo",
                        element: <PageTwo />
                    }
                ]
            }
        ]
    }
]

// 创建并导出路由配置
export default createBrowserRouter(routes);