import mock from 'mockjs';
import HomeApi, {getHomeList} from './mockServeData/homeApi';
import PermissionApi from './mockServeData/permission';
import homeApi from "./mockServeData/homeApi";

// 修正拦截规则，匹配完整的请求路径
// mock.mock(/\/api\/products/, 'get', () => {
//     console.log('Mock拦截成功: /api/products');
//     const homeList = getHomeList();
//     return {
//         status: 200,
//         message: 'success',
//         data: homeList
//     }
// });
// mock.mock(/\/api\/users/, 'get', () => {
//     console.log('Mock拦截成功: /api/users');
//     const homeList = getHomeList();
//     return {
//         status: 200,
//         message: 'success',
//         data: homeList
//     }
// });

// mock.mock(/\/permission\/getMenu/, 'post', PermissionApi.getMenu);