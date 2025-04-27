/**
 * API接口模块 - RESTful风格
 * 提供标准化的资源操作接口
 */
import request, { cancelAllRequests } from './axios';
import { API_BASE_URL, ENDPOINTS } from '../config';  // 从整合后的配置文件导入

/**
 * RESTful资源类
 * 为每种资源类型提供标准的CRUD操作
 */
class Resource {
  /**
   * 创建资源实例
   * @param {string} resourcePath - 资源路径
   */
  constructor(resourcePath) {
    this.resourcePath = resourcePath;
  }

  /**
   * 获取完整URL
   * @param {string|number} id - 可选的资源ID
   * @param {string} subPath - 可选的子路径
   * @returns {string} 完整URL
   */
  getUrl(id, subPath = '') {
    let url = `${this.resourcePath}`;
    console.log(url);
    if (id !== undefined) {
      url += `/${id}`;
    }
    
    if (subPath) {
      url += `/${subPath}`;
    }
    
    return url;
  }

  /**
   * 获取资源列表
   * @param {Object} params - 查询参数 (分页、过滤、排序等)
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  list(params = {}, options = {}) {
    return request({
      url: this.getUrl(),
      method: 'get',
      params,
      ...options
    });
  }

  /**
   * 获取单个资源
   * @param {string|number} id - 资源ID
   * @param {Object} params - 查询参数
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  get(id, params = {}, options = {}) {
    return request({
      url: this.getUrl(id),
      method: 'get',
      params,
      ...options
    });
  }

  /**
   * 创建资源
   * @param {Object} data - 资源数据
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  create(data, options = {}) {
    return request({
      url: this.getUrl(),
      method: 'post',
      data,
      ...options
    });
  }

  /**
   * 完全更新资源
   * @param {string|number} id - 资源ID
   * @param {Object} data - 完整资源数据
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  update(id, data, options = {}) {
    return request({
      url: this.getUrl(id),
      method: 'put',
      data,
      ...options
    });
  }

  /**
   * 部分更新资源
   * @param {string|number} id - 资源ID
   * @param {Object} data - 部分资源数据
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  patch(id, data, options = {}) {
    return request({
      url: this.getUrl(id),
      method: 'patch',
      data,
      ...options
    });
  }

  /**
   * 删除资源
   * @param {string|number} id - 资源ID
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  delete(id, options = {}) {
    return request({
      url: this.getUrl(id),
      method: 'delete',
      ...options
    });
  }

  /**
   * 自定义资源操作
   * @param {string} method - HTTP方法
   * @param {string|number} id - 可选的资源ID
   * @param {string} action - 操作名称
   * @param {Object} data - 请求数据
   * @param {Object} params - 查询参数
   * @param {Object} options - 请求配置选项
   * @returns {Promise} 请求Promise
   */
  action(method, id, action, data = {}, params = {}, options = {}) {
    return request({
      url: this.getUrl(id, action),
      method: method.toLowerCase(),
      data: ['post', 'put', 'patch'].includes(method.toLowerCase()) ? data : undefined,
      params,
      ...options
    });
  }
}

/**
 * API接口类
 * 定义并导出所有API资源和操作
 */
class API {
  constructor() {
    // 初始化常用资源
    this.users = new Resource(ENDPOINTS.USERS.BASE);
    this.products = new Resource(ENDPOINTS.PRODUCTS.BASE);
    
    // 身份验证相关方法
    this.auth = {
      login: (credentials) => request({
        url: ENDPOINTS.AUTH.LOGIN,
        method: 'post',
        data: credentials
      }),
      
      register: (userData) => request({
        url: ENDPOINTS.AUTH.REGISTER,
        method: 'post',
        data: userData
      }),
      
      logout: () => request({
        url: ENDPOINTS.AUTH.LOGOUT,
        method: 'post'
      }),
      
      refreshToken: () => request({
        url: ENDPOINTS.AUTH.REFRESH_TOKEN,
        method: 'post'
      })
    };
  }

  /**
   * 创建自定义资源
   * @param {string} resourcePath - 资源路径
   * @returns {Resource} 资源实例
   */
  createResource(resourcePath) {
    return new Resource(resourcePath);
  }

  /**
   * 取消所有正在进行的请求
   * @param {string} message - 取消原因
   */
  cancelRequests(message) {
    cancelAllRequests(message);
  }
}

// 导出API实例
export default new API();

// 导出Resource类，允许创建自定义资源
export { Resource };