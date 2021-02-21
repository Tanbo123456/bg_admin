import React, { Component } from 'react';
import { Modal, Form, Input, Tree } from "antd";

import menuList from "../../config/menu-list";

class AuthRole extends Component {
    constructor(props) {
        super(props)
        this.treeData = [
            {
                title: '平台权限',
                key: 'all',
                children: this.getTreeData(menuList)
            },
        ];
        this.state = { checkedKeys: props.role.menus }
        // console.log(props.role.menus)
    }
    getCheckedMenus = () => this.state.checkedKeys
    getTreeData = (list) => {

        return list.map(v => {
            if (v.children && v.children.length > 0) {
                const children = this.getTreeData(v.children)
                return {
                    title: v.title,
                    key: v.key,
                    children
                }
            } else {
                return {
                    title: v.title,
                    key: v.key,
                }
            }

        })
    }
    onCheck = (checkedKeys, info) => {
        this.setState({ checkedKeys })
        // console.log(checkedKeys)
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }
    // static getDerivedStateFromProps(nextProps,prevState){
    //     return {checkedKeys: nextProps.role.menus}
    // }
    render() {
        const { isAuthVisible, onCancelAuth, onAuth, role } = this.props
        const { checkedKeys } = this.state
        // console.log(checkedKeys)
        return (
            <Modal
                visible={isAuthVisible}
                title="设置权限"
                okText="确定"
                cancelText="取消"
                onCancel={onCancelAuth}
                onOk={onAuth}
            >
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    label='角色名称'
                >
                    <Input disabled value={role.name} />
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />

            </Modal>
        );
    }
}

export default AuthRole;