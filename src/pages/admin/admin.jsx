import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from "react-router-dom";

import './admin.less'
import Header from '../../components/header/header'
import LeftNav from "../../components/left-nav/left-nav";
import Product from '../product/product'
import Role from '../role/role'
import Category from "../category/category";
import User from "../user/user";
import Home from "../home/home";
import Bar from "../charts/bar/bar";
import Line from "../charts/line/line";
import Pie from "../charts/pie/pie";
import NotFound from "../not-found/not-found";
import { connect } from "react-redux";


const { Footer, Sider, Content } = Layout;


class Admin extends Component {

    render() {
        const user = this.props.user
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }
        return (
            <div className='index-page'>
                <Layout className='layout-wrap'>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout className="right-nav">
                        <Header />
                        <Content className="content-wrap">
                            <Switch>
                                <Redirect exact from='/' to='/home' />
                                <Route path="/home" component={Home} />
                                <Route path="/product" component={Product} />
                                <Route path="/role" component={Role} />
                                <Route path="/category" component={Category} />
                                <Route path="/user" component={User} />
                                <Route path="/charts/pie" component={Pie} />
                                <Route path="/charts/line" component={Line} />
                                <Route path="/charts/bar" component={Bar} />
                                <Route component={NotFound}/>
                            </Switch>
                        </Content>
                        <Footer>
                            <div className='footer-wrap'>
                                <span>
                                    开发人：好大一波坑
                            </span>
                                <span>联系方式：15061885043</span>
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin) 