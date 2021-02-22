import React, { Component } from 'react';
import { Card,Table,Button,message } from "antd";
import { connect } from "react-redux";


import { reqRoleList,reqAddRole,reqUpdateRole } from "../../api/index";
import AddRole from "./add-role";
import AuthRole from "./auth-role";
import getDate from "../../utils/dateUtil";
import { loginOut } from "../../redux/actions";

class Role extends Component {

    state={
        selectedRowKeys:[],
        roleList:[],
        isAddVisible:false,
        isAuthVisible:false,
        role:{}
    }
    columns=[
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render:getDate
        },
        {
            title: '修改时间',
            dataIndex: 'auth_time',
            render:getDate
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        }    
    ]

    onCancelAdd=()=>this.setState({isAddVisible:false})
    onAddRole=async(values)=>{
        this.setState({isAddVisible:false})
        // console.log(values)
        const roleName = values.roleName
        const result= await reqAddRole(roleName)
        if (result.status===0) {
            message.success('添加角色成功')
            const role = result.data
            this.setState(state=>({
                roleList:[...state.roleList,role]
            }))
            
        }else{
            message.error('添加失败')
        }
        
    }

    onCancelAuth=()=>this.setState({isAuthVisible:false})
    onAuth= async()=>{
        // console.log('授权')/
        this.setState({isAuthVisible:false})
        const role = this.state.role
        role.menus = this.menu.getCheckedMenus()
        role._id = this.state.role._id
        role.auth_time = Date.now()
        role.auth_name = this.props.user.username
        const result = await reqUpdateRole(role)
        if (result.status===0) {
            message.success('设置权限成功')
            this.setState({roleList:[...this.state.roleList]})
        }
        // 判断是否操作了用户所属角色的权限
        const user =this.props.user
        if (role._id===user.role_id) {
            message.info('自身角色权限被修改，需要重新登录')
            this.props.loginOut()
        }
    }

    rowSelect=(selectedRowKeys,record)=>{
        // console.log(selectedRowKeys,record)
        this.setState({selectedRowKeys,role:record[0]})
    }
    getRoleList= async()=>{
        const result = await reqRoleList()
        // console.log(result)
        this.setState({
            roleList:result.data
        })
    }
    componentDidMount(){
        this.getRoleList()
    }
    render() {
        const {selectedRowKeys,roleList,isAddVisible,role,isAuthVisible} = this.state

        const title = <span>
            <Button type='primary' onClick = {()=>this.setState({isAddVisible:true})}>添加角色</Button>&nbsp;
            <Button type='primary' disabled={!role._id} onClick = {()=>this.setState({isAuthVisible:true})}>设置角色权限</Button>
        </span>
        return (
            <Card title={title}>
                <Table
                    dataSource={roleList}
                    columns={this.columns}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize: 5,
                    }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys,
                        onChange:this.rowSelect
                      }}
                />
                <AddRole isAddVisible={isAddVisible} onCancelAdd={this.onCancelAdd} onAddRole={this.onAddRole}/>
                <AuthRole ref={menu=>{this.menu=menu}} isAuthVisible={isAuthVisible} onCancelAuth={this.onCancelAuth} onAuth={this.onAuth} role={role}/>
            </Card>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {loginOut}
)(Role) ;