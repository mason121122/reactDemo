import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mail from "../pages/mail";
import { Users, Log, Permission, Role } from '../pages/system';
import ReceptionPageOne from "../pages/reception/pageOne/index";
import ReceptionPageTwo from "../pages/reception/pagetwo/index";
import InventoryPageOne from "../pages/inventory/pageOne";
import InventoryPageTwo from "../pages/inventory/pageTwo";
import Login from "../pages/login";

const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const routes = [
    {
        path: "/",
        element: <Navigate to="/login" replace={true} /> // 根路径重定向到登录页
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "/", // 主布局路由（包含左侧菜单和顶部导航）
        element: <Main />,
        children: [
            {
                path: "home", // 访问路径：/home
                element: <PrivateRoute element={<Home />} />
            },
            {
                path: "mail", // 访问路径：/mail
                element: <Mail />
            },
            {
                path: "system", // 系统管理模块父路由（访问路径前缀：/system）
                children: [
                    {
                        path: "users/index",
                        element: <Users />
                    },
                    {
                        path: "permission/index",
                        element: <Permission />
                    },
                    {
                        path: "log/index",
                        element: <Log />
                    },
                    {
                        path: "role/index",
                        element: <Role />
                    }
                ]
            },
            {
                path: "reception", // 订单管理父路由
                children: [
                    {
                        path: "pageOne/index",
                        element: <ReceptionPageOne />
                    },
                    {
                        path: "pageTwo/index",
                        element: <ReceptionPageTwo />
                    }
                ]
            },
            {
                path: "inventory",
                children: [
                    {
                        path: "pageOne",
                        element: <InventoryPageOne />
                    },
                    {
                        path: "pageTwo",
                        element: <InventoryPageTwo />
                    }
                ]
            }
        ]
    }
];

export default createBrowserRouter(routes);