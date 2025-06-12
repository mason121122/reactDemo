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
    return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
    return !isAuthenticated() ? element : <Navigate to="/home" replace />;
};

const routes = [
    {
        path: "/",
        element: <Navigate to="/login" replace={true} />
    },
    {
        path: "login",
        element: <PublicRoute element={<Login />} />
    },
    {
        path: "/",
        element: <PrivateRoute element={<Main />} />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "mail",
                element: <Mail />
            },
            {
                path: "system",
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
                path: "reception",
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