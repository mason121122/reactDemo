import mock from 'mockjs';
import HomeApi, {getHomeList} from './mockServeData/homeApi';
// import homeApi from "./mockServeData/homeApi";

mock.mock(/products/, 'get', () => {
    const homeList = getHomeList();
    return {
        status: 200,
        message: 'success',
        data: homeList
    }
});