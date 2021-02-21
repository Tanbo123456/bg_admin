import React, { Component } from 'react';
import { Switch,Route,Redirect } from "react-router-dom";

import Home from "./home";
import AddUpdate from "./add-update";

class User extends Component {
    render() {
        return (
            <Switch>
                <Route path='/user/home' component={Home}/>
                <Route path='/user/add-update' component={AddUpdate}/>
                <Redirect to='/user/home'/>
            </Switch>
        );
    }
}

export default User;