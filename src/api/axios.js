import axios from 'axios';

const baseURL = '/api';

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
                return config;
            }, function (error) {
                return Promise.reject(error);
            });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            return response;
        },function(error){
            return Promise.reject(error);
        })
    }

    request(options) {
        options = {...this.getInsideConfig(), ...options};
        // 创建axios实例
        const instance = axios.create()
        this.interception(instance)
        return instance(options);
    }

}

export default new HttpRequest(baseURL)