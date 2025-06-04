import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate,Navigate} from 'react-router-dom';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  // 在登入状态下需要跳转到home
  // if(localStorage.getItem('token')){
  //     return <Navigate to="/home" replace/>
  // }

  const handleSubmit = (val) => {
    // 模拟登录成功
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/home');
    // getMenu(val).then(({data}) => {
    //   console.log(data)
    //   localStorage.setItem('token',data.token);
    //   navigate('/home');
    // })
  };


  return (
    <div className="login-page">
      <div className="login-container">
        {/*<div className="login_title">通用后台管理系统</div>*/}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          validateTrigger="onBlur"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          
          <div className="login-actions">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
            >
              登录
            </Button>
          </div>
        </Form>
        <div className="login-footer">
          © 2025 通用电商后台管理系统开源项目
        </div>
      </div>
    </div>
  );
};

export default Login;