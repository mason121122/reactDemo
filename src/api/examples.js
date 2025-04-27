/**
 * API使用示例
 * 展示如何使用优化后的RESTful API接口
 */
import API, { Resource } from './index';

// 基本用法示例
async function basicExamples() {
  try {
    // 1. 用户资源操作示例
    // 获取用户列表，带分页和过滤
    const { data: users } = await API.users.list({
      page: 1,
      limit: 10,
      status: 'active'
    });
    console.log('用户列表:', users);

    // 获取单个用户
    const { data: user } = await API.users.get(123);
    console.log('用户详情:', user);

    // 创建用户
    const { data: newUser } = await API.users.create({
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'user'
    });
    console.log('创建用户成功:', newUser);

    // 更新用户
    const { data: updatedUser } = await API.users.update(123, {
      name: '李四',
      email: 'lisi@example.com',
      role: 'admin'
    });
    console.log('更新用户成功:', updatedUser);

    // 部分更新用户
    const { data: patchedUser } = await API.users.patch(123, {
      role: 'editor'
    });
    console.log('部分更新用户成功:', patchedUser);

    // 删除用户
    await API.users.delete(123);
    console.log('删除用户成功');

    // 2. 产品资源操作示例
    // 获取产品列表，带排序
    const { data: products } = await API.products.list({
      sort: 'price',
      order: 'desc'
    });
    console.log('产品列表:', products);
  } catch (error) {
    console.error('基本操作示例错误:', error);
  }
}

// 高级用法示例
async function advancedExamples() {
  try {
    // 1. 使用自定义资源
    const orders = API.createResource('/orders');
    
    // 获取订单列表
    const { data: orderList } = await orders.list({
      status: 'pending',
      fromDate: '2023-01-01'
    });
    console.log('订单列表:', orderList);
    
    // 2. 自定义动作
    // 完成订单
    const { data: completedOrder } = await orders.action(
      'POST', 
      123, 
      'complete', 
      { completedAt: new Date().toISOString() }
    );
    console.log('完成订单:', completedOrder);
    
    // 取消订单
    const { data: cancelledOrder } = await orders.action(
      'POST', 
      456, 
      'cancel', 
      { reason: '客户要求取消' }
    );
    console.log('取消订单:', cancelledOrder);
    
    // 3. 身份验证
    // 登录
    const { data: authResult } = await API.auth.login({
      username: 'admin',
      password: 'admin123'
    });
    console.log('登录成功:', authResult);
    
    // 登出
    await API.auth.logout();
    console.log('登出成功');
    
    // 4. 请求配置选项
    // 带超时的请求
    const { data: urgentData } = await API.users.list({}, {
      timeout: 5000 // 5秒超时
    });
    console.log('紧急数据:', urgentData);
    
    // 5. 取消请求
    // 在某些情况下取消所有进行中的请求
    setTimeout(() => {
      API.cancelRequests('用户离开页面');
    }, 1000);
  } catch (error) {
    console.error('高级操作示例错误:', error);
  }
}

// 复杂场景：数据加载与依赖请求
async function complexScenario() {
  try {
    // 1. 按ID批量获取
    const userIds = [101, 102, 103];
    const userPromises = userIds.map(id => API.users.get(id));
    const usersResponses = await Promise.all(userPromises);
    const users = usersResponses.map(response => response.data);
    console.log('批量获取用户:', users);
    
    // 2. 依赖请求 - 先获取用户，再获取其订单
    const { data: currentUser } = await API.users.get(101);
    
    // 如果用户有订单，获取其订单
    if (currentUser.hasOrders) {
      const orders = API.createResource('/orders');
      const { data: userOrders } = await orders.list({
        userId: currentUser.id
      });
      console.log(`${currentUser.name}的订单:`, userOrders);
    }
    
    // 3. 错误处理和重试
    try {
      const { data: sensitiveData } = await API.users.action(
        'GET',
        101,
        'sensitive-data'
      );
      console.log('敏感数据:', sensitiveData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('需要刷新令牌');
        const { data: newToken } = await API.auth.refreshToken();
        console.log('令牌已刷新:', newToken);
        
        // 重试请求
        const { data: sensitiveData } = await API.users.action(
          'GET',
          101,
          'sensitive-data'
        );
        console.log('重试后获取的敏感数据:', sensitiveData);
      }
    }
  } catch (error) {
    console.error('复杂场景示例错误:', error);
  }
}

// 运行示例
export function runExamples() {
  console.log('====== 开始运行API示例 ======');
  
  basicExamples()
    .then(() => advancedExamples())
    .then(() => complexScenario())
    .then(() => {
      console.log('====== API示例运行完成 ======');
    })
    .catch(error => {
      console.error('示例运行出错:', error);
    });
}

// 自动运行示例
// 在实际应用中删除此行或将其注释掉
// runExamples(); 