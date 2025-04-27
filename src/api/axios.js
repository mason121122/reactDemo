/**
 * axios.js - RESTful风格的Axios实例封装
 * 优化版本支持请求重试、错误处理、取消请求等功能
 */
import axios from 'axios';
import { 
  API_BASE_URL, 
  TIMEOUT, 
  DEFAULT_HEADERS, 
  RETRY_CONFIG,
  STATUS_HANDLERS 
} from '../config';  // 从整合后的配置文件导入

/**
 * HttpClient类 - 封装并管理Axios实例
 */
class HttpClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: TIMEOUT,
      headers: DEFAULT_HEADERS
    });
    
    // 记录正在进行的请求，用于取消
    this.pendingRequests = new Map();
    
    // 初始化拦截器
    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器
   */
  setupInterceptors() {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 生成请求唯一标识，用于取消重复请求
        const requestKey = this.getRequestKey(config);
        
        // 检查是否存在相同的请求
        this.removePendingRequest(requestKey);
        
        // 将新请求添加到pending中
        const cancelToken = axios.CancelToken.source();
        config.cancelToken = cancelToken.token;
        this.pendingRequests.set(requestKey, cancelToken);

        // 添加认证信息
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // 请求完成后，从pending移除
        const requestKey = this.getRequestKey(response.config);
        this.removePendingRequest(requestKey);

        // 统一返回数据结构
        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config
        };
      },
      (error) => {
        // 如果请求被取消，不需要额外处理
        if (axios.isCancel(error)) {
          console.log('请求已取消:', error.message);
          return Promise.reject(error);
        }

        // 从pending移除
        if (error.config) {
          const requestKey = this.getRequestKey(error.config);
          this.removePendingRequest(requestKey);
        }

        // 处理请求重试
        const config = error.config;
        if (config && this.shouldRetry(error, config)) {
          return this.retryRequest(config);
        }

        // 处理特定HTTP状态码
        if (error.response && STATUS_HANDLERS[error.response.status]) {
          STATUS_HANDLERS[error.response.status]();
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * 生成请求的唯一标识
   */
  getRequestKey(config) {
    const { url, method, params, data } = config;
    return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
  }

  /**
   * 移除pending中的请求
   */
  removePendingRequest(key) {
    if (this.pendingRequests.has(key)) {
      const cancelToken = this.pendingRequests.get(key);
      cancelToken.cancel('重复的请求被取消');
      this.pendingRequests.delete(key);
    }
  }

  /**
   * 判断是否应该重试请求
   */
  shouldRetry(error, config) {
    // 设置重试计数
    config.__retryCount = config.__retryCount || 0;
    
    // 是否达到最大重试次数
    const shouldRetry = config.__retryCount < RETRY_CONFIG.retry;
    
    // 检查状态码是否需要重试
    const retryStatusCode = error.response && 
      RETRY_CONFIG.retryStatusCodes.includes(error.response.status);
    
    // 网络错误或特定状态码时进行重试
    return shouldRetry && (error.message.includes('Network Error') || retryStatusCode);
  }

  /**
   * 重试请求
   */
  retryRequest(config) {
    config.__retryCount += 1;
    
    // 创建延迟Promise
    const delayPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.log(`重试请求: ${config.url} (${config.__retryCount}/${RETRY_CONFIG.retry})`);
        resolve();
      }, RETRY_CONFIG.retryDelay);
    });
    
    // 延迟后重新发起请求
    return delayPromise.then(() => this.axiosInstance(config));
  }

  /**
   * 创建请求方法
   */
  request(config) {
    return this.axiosInstance(config);
  }

  /**
   * 取消所有正在进行的请求
   */
  cancelAllRequests(message = '用户取消了操作') {
    for (const [key, cancelToken] of this.pendingRequests.entries()) {
      cancelToken.cancel(message);
      this.pendingRequests.delete(key);
    }
  }
}

// 导出HTTP客户端实例
const httpClient = new HttpClient();
export default httpClient.request.bind(httpClient);

// 导出取消所有请求的方法
export const cancelAllRequests = (message) => httpClient.cancelAllRequests(message);