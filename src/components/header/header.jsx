import React, { Component } from 'react';
import { Button,Modal } from "antd";
import {withRouter} from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";

import "./header.less";
import {reqWeather} from '../../api/index'
import getDate from "../../utils/dateUtil"
// import menuList from '../../config/menu-list'
import {loginOut} from "../../redux/actions";


class Header extends Component {
    state={
        city:'广州',
        weather:'',
        date:''
    }
    // 获取天气
    getWeather= async()=>{
        const res = await reqWeather("广州")
        // console.log(res)
        const {weather} = res
        this.setState({
            weather
        })
    }

    // 获取日期
    getDate=()=>{
        this.sysTimer = setInterval(async()=>{
            const date =await getDate(Date.now())
            // console.log(date)
            this.setState({
                date
            })
        },1000)
       
    }

    // 获取子菜单名称
    // getMenuTitle=()=>{
    //     const path = this.props.history.location.pathname
    //     let title
    //     // console.log(path)
    //     menuList.forEach(v=>{
    //         if (v.key===path) {
    //             title = v.title
    //         } else if (v.children) {
    //             const cItem = v.children.find(item=>path.indexOf(item.key)===0)
    //             if (cItem) {
    //                 title = cItem.title
    //             }
    //         } 
    //     })
    //     return title
    // }
    // 登出
    handleLoginOut=()=>{
        let that = this
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                that.props.loginOut()
            }
          });
    }
    componentDidMount(){
        this.getWeather()
       this.getDate()
    //    this.getMenuTitle()
    }

    componentWillUnmount(){
        clearInterval(this.sysTimer)
    }
    render() {
        const title = this.props.headTitle
        const username = this.props.user.username
        return (
            <div className="header-container">
                <div className="header-up">
                    <span>欢迎  {username}</span>
                    <Button type="link" onClick={this.handleLoginOut}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="nav-title">
                        <span className="text">{title}</span>
                       
                        <span className="nav-arrow"></span>    
                    </div>
                    <div className="date-weather">
                        <span className="date">{this.state.date}</span>

                        <span>  {this.state.city}  </span>
                        <span className="weather">{this.state.weather}</span>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(
    state=>({headTitle:state.headTitle,user:state.user}),
    {loginOut}
)(withRouter(Header));