/**
 * 配置文件
 * 包含路由配置和API配置等应用全局配置项
 */

// ========== 菜单配置 ==========
export const routes = [
    {
        path:'/home',
        name:'home',
        label:'店铺概况',
        icon:'HomeOutlined',
        url:'/home/index'
    },
    {
        path:'/mail',
        name:'mail',
        label:'商品管理',
        icon:'ShopOutlined',
        url:'/mail/index'
    },
    {
        path:'/system',
        name:'user',
        label:'系统管理',
        icon:'TeamOutlined',
        children:[
            {
                path:'/system/users/index',
                name:'users',
                label:'用户管理',
                icon:'UserOutlined',
                url:'/system/users/index',
            },
            {
                path:'/system/permission/index',
                name:'permission',
                label:'权限管理',
                icon:'',
                url:'/system/permission/index',
            },
            {
                path:'/system/role/index',
                name:'role',
                label:'角色管理',
                icon:'',
                url:'/system/role/index',
            },
            {
                path:'/system/log/index',
                name:'log',
                label:'日志管理',
                icon:'',
                url:'/system/log/index',
            }
        ]
    },
    {
        path:'/reception',
        name:'reception',
        label:'接待管理',
        icon:'SettingOutlined',
        children:[
            {
                path:'/reception/pageOne/index',
                name:'receptionPageOne',
                label:'reception页面1',
                icon:'',
                url:'/reception/pageOne/index',
            },
            {
                path:'/reception/pageTwo/index',
                name:'receptionPageTwo',
                label:'reception页面2',
                icon:'',
                url:'/reception/pageTwo/index',
            }
        ]
    },
    {
        path:'/inventory',
        name:'inventory',
        label:'库存管理',
        icon:'SettingOutlined',
        children:[
            {
                path:'/inventory/pageOne',
                name:'inventoryPageOne',
                label:'页面1',
                icon:'',
                url:'/inventory/pageOne',
            },
            {
                path:'/inventory/pageTwo',
                name:'inventoryPageTwo',
                label:'页面2',
                icon:'',
                url:'/inventory/pageTwo',
            }
        ]
    }
];

// ========== API配置 ==========

// API基础URL配置
export const API_BASE_URL = 'http://localhost:8080';  // 开发环境API地址

// 超时设置
export const TIMEOUT = 10000; // 10秒

// 默认headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// 请求重试配置
export const RETRY_CONFIG = {
  retry: 2,               // 最大重试次数
  retryDelay: 1000,       // 重试间隔时间(ms)
  retryStatusCodes: [408, 429, 500, 502, 503, 504] // 需要重试的HTTP状态码
};

// 响应状态码处理配置
export const STATUS_HANDLERS = {
  401: () => {
    // 处理未授权错误，如跳转到登录页面
    console.log('未授权，请重新登录');
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  403: () => {
    // 处理禁止访问错误
    console.log('没有权限访问该资源');
  },
  // 可添加其他状态码处理器
};

// 为了兼容旧版导出，保持默认导出为路由数组
export default routes;