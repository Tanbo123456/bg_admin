import React, { Component } from 'react';
import { Input, Button, Form } from 'antd'
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";



import './login.less'
import logo from './images/logo.png'
import { login } from "../../redux/actions";


const { Item } = Form

class Login extends Component {
    formRef = React.createRef();
    onFinish = async (userInfo) => {
        const { username, password } = userInfo
        this.props.login(username, password)
        this.formRef.current.resetFields()

    };
    onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };
    render() {
        const userInfo = this.props.user
        
        if (userInfo && userInfo._id) {
            // console.log(userInfo)
            return <Redirect to="/home" />
        }
        return (
            <div className="login-page">
                <div className="login-top">
                    <div className="login-top-content">
                        <img className="logo" src={logo} alt="logo" />
                        <span className="bg-title">React项目：后台管理系统</span>
                    </div>
                </div>
                <div className="login-body">
                    <div className="login-body-content">
                        <span className="login-title">用户登录</span>
                        <Form
                            
                            className="login-form"
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Item
                                name="username"
                                validateTrigger='onBlur'
                                rules={[
                                    { required: true, whitespace: true, message: 'Please input your username!', },
                                    { min: 4, message: '用户名小于4位', },
                                    { max: 12, message: '用户名大于12位', },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名需要合法" }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} />
                            </Item>

                            <Item
                                name="password"
                                validateTrigger='onBlur'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    { min: 4, message: '用户名小于4位', },
                                    { max: 12, message: '用户名大于12位', },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名需要合法" }
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} />
                            </Item>

                            <Item>
                                <Button type="primary" htmlType="submit" block>登录</Button>
                            </Item>

                        </Form>
                        <span>用户名：admin   密码：admin</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login) ;