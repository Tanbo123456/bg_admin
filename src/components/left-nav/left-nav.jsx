import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'antd';
import {
    DeploymentUnitOutlined,
    BarsOutlined
} from '@ant-design/icons';

import menuList from '../../config/menu-list'
import logo from '../../assets/images/logo.png'
import './left-nav.less'

const { SubMenu } = Menu;


class LeftNav extends Component {

    // 数组转换成导航栏
    getMenuNodes = (menuList) => {
        // 获取路径，从而指定openkey
        const pathname = this.props.location.pathname
        // console.log(pathname)
        // 
        return menuList.reduce((pre, currentItem) => {
            // 根据登录用户的menu判断currentItem是否渲染到导航栏
            if (this.hasAuth(currentItem)) {
                // 映射渲染导航栏
                if (!currentItem.children) {
                    pre.push(
                        <Menu.Item key={currentItem.key} icon={<DeploymentUnitOutlined />}>
                            <Link to={currentItem.key}>
                                <span>{currentItem.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {

                    pre.push(
                        <SubMenu key={currentItem.key} icon={<BarsOutlined />} title={currentItem.title}>
                            {this.getMenuNodes(currentItem.children)}
                        </SubMenu>
                    )
                    // 指定打开的菜单
                    const CItem = currentItem.children.find(c => pathname.indexOf(c.key) === 0)
                    // console.log(CItem)
                    if (CItem) {
                        this.openKey = currentItem.key
                        // console.log(this.openKey)
                    }

                }
            }
            return pre
        }, [])
    }
    hasAuth=(item)=>{
        // 1. 如果菜单栏是公开的
        // 2. 当前用户是admin
        // 3. 菜单项的key在登录用户的menus中
        // 4. 如果有子节点，判断其child的key在menus中
        const key = item.key
        const user = JSON.parse(localStorage.getItem('user'))
        const menuSet = new Set(user.role.menus||[])
        // 1. 2. 3. 
        if (item.public||user.username==='admin'||menuSet.has(key)) {
            return true
        } else if (item.children) { 
           return !!item.children.find(child=>menuSet.has(child.key))
        }
        
    }


    render() {
        let selectedKey = this.props.location.pathname 
        if (selectedKey.indexOf('/product') === 0) {
            selectedKey = '/product'
        }
        this.menuListNodes = this.getMenuNodes(menuList)
        const openKey = this.openKey
        // console.log(openKey)
        // debugger
        return (
            <div className="left-nav">
                <Link to="/home">
                    <div className="bg-logo">
                        <img src={logo} alt="logo" />
                        <span className="bg-title">后台管理</span>
                    </div>
                </Link>
                <Menu
                    defaultSelectedKeys={[selectedKey]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuListNodes}
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav)