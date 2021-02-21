import React, { Component } from 'react';
import { Switch,Route,Redirect } from "react-router-dom";

import ProductHome from "./component/home";
import ProductAddUpdate from "./component/add-update";
import ProductDetail from './component/detail'


class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' exact component={ProductHome}/>
                <Route path='/product/add-update' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product'/>
            </Switch>
        );
    }
}

export default Product;