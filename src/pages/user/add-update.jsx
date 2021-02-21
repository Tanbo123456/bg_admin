import React, { Component } from 'react';
import { Form, Input, Select, Card,Button,message} from "antd";
import {
    ArrowLeftOutlined,
} from '@ant-design/icons'

import {reqAddUser,reqUpdateUser } from "../../api/index";
const {Option} = Select

class AddUpdate extends Component {
    constructor(props){
        super(props)
        this.user= this.props.location.state.user?this.props.location.state.user:{}
        this.roles= this.props.location.state.roles
        this.isUpdate=!!this.user._id
        // console.log(this.isUpdate)

    }

    handleAddOrUpdate= async (user)=>{
        // console.log(user)
        let result
        if (this.isUpdate) {
            // 修改
            user._id=this.user._id
            result = await reqUpdateUser(user)
        }else{
            result = await reqAddUser(user)
        }
        if (result.status===0) {
            message.success('操作成功')
            this.props.history.replace('/user/home')
        }

    }
    render() {
        const {user,roles,isUpdate} = this
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 8,
            },
        }
        const title = <span>
            <ArrowLeftOutlined style={{ color: '#FF99CC', width: 30 }} onClick={() => { this.props.history.go(-1) }} />
            <span>{isUpdate?'修改用户':'添加用户'}</span>
        </span>
     
        return (
            <Card title={title}>
                <Form
                    {...layout}
                    onFinish={this.handleAddOrUpdate}
                >
                    <Form.Item
                        label='用户名称'
                        name='username'
                        initialValue={user.username}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入用户名称' />
                    </Form.Item>
                    {!user._id ?
                        (<Form.Item
                            label='用户密码'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>) : null
                    }

                    <Form.Item
                        label='手机号码'
                        name='phone'
                        initialValue={user.phone}
                    >
                        <Input placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item
                        label='邮箱'
                        name='email'
                        initialValue={user.email}
                        rules={[
                            {
                                type: 'email'
                            }
                        ]}
                    >
                        <Input placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item
                        label='角色'
                        name='role_id'
                        initialValue={user.role_id}
                    >
                        <Select >
                            {roles.map(role => {
                                return <Option key={role._id} value={role._id}>{role.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>{isUpdate?'修改':'添加'}</Button>
                    </Form.Item>
                </Form>

            </Card>
        );
    }
}

export default AddUpdate;