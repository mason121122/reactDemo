// 导入React的核心库
import React from 'react';
// 导入ReactDOM，用于将React组件渲染到DOM中
import ReactDOM from 'react-dom/client';
// 导入应用的根组件
import App from './App';
// 导入性能监控工具
import reportWebVitals from './reportWebVitals';
// 导入全局样式
import './index.css';

import {Provider} from 'react-redux';
import store from './store';

// 获取根DOM元素，React应用将挂载在这里
const root = ReactDOM.createRoot(document.getElementById('root'));

// 使用严格模式渲染应用
// 严格模式会帮助发现潜在的问题，比如不安全的生命周期方法等
root.render(
  <React.StrictMode>
      <Provider store={store}>
          {/* 渲染App组件，这是整个应用的入口 */}
          <App />
      </Provider>
  </React.StrictMode>
);

// 如果你想开始测量应用的性能，可以传入一个函数
// 这个函数会记录性能指标，比如页面加载时间、首次渲染时间等
// 更多信息请参考：https://bit.ly/CRA-vitals
reportWebVitals();
