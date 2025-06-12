import axios from 'axios';
import {API_BASE_URL} from '../config/index';
import { message } from 'antd';

// axios二次封装
class HttpRequest {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            headers: {}
        }
        return config;
    }

    interception(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 从 localStorage 获取 token
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            const res = response.data;
            if (res.status === 200) {
                return res;
            }
            message.error(res.message || '请求失败');
            return Promise.reject(new Error(res.message || '请求失败'));
        }, function(error) {
            message.error(error.message || '请求失败');
            return Promise.reject(error);
        });
    }

    request(options) {
        options = {...this.getInsideConfig(), ...options};
        // 创建axios实例
        const instance = axios.create();
        this.interception(instance);
        return instance(options);
    }
}

export default new HttpRequest(API_BASE_URL);