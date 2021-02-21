import React, { Component } from 'react';
import { Card, Button, Table,message,Modal} from "antd";

import getDate from "../../utils/dateUtil";
import { reqUserList,reqDeleteUser} from "../../api/index";

class Home extends Component {
    state = {
        users:[],
        isDelete:false,
        roles:[]
    }
    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: getDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render:(role_id)=>this.roles[role_id]
        },
        {
            title: '操作',
            width: 100,
            render: (text, record) => (<span>
                <Button type='link' onClick={()=>{this.props.history.push('/user/add-update',{user:record,roles:this.state.roles})}}>修改</Button>
                <Button type='link' onClick={()=>{
                    this.setState((state)=>({isDelete:true}))
                    this.actUser=record
                }}>删除</Button>
            </span>)
        },
    ]
    
    onCancelDelete=()=>{
        this.setState((state)=>({isDelete:false}))
        this.actUser=null
    }
    onDelete=async()=>{
        this.setState((state)=>({isDelete:false}))
        const userId = this.actUser._id
        this.actUser=null
        const result = await reqDeleteUser(userId)
        if (result.status===0) {
            message.success('删除用户成功')
            this.getUserList()
        }
    }

    getUserList=async()=>{
        const result = await reqUserList()
        // console.log(result)
        const {users,roles} = result.data
        this.roles = roles.reduce((pre,role)=>{
            pre[role._id]=role.name
            return pre
        },[])
        this.setState((state)=>({users,roles}))
    }
    componentDidMount(){
        this.getUserList()
    }
    render() {
        const {users,isDelete} = this.state
        return (
            <div>
                <Card title={<span>
                        <Button type="primary" onClick={()=>{this.props.history.push('/user/add-update',{roles:this.state.roles})}}>创建用户</Button>
                    </span>}>
                    <Table
                        dataSource={users}
                        columns={this.columns}
                        rowKey='_id'
                        bordered
                        pagination={{
                            defaultPageSize: 5,
                        }}
                    />
                </Card>
                <Modal 
                    visible={isDelete}
                    title="确定删除吗？"
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.onCancelDelete}
                    onOk={this.onDelete}
                >

                </Modal>
            </div>

        );
    }
}

export default Home;