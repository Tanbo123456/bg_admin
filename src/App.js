import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from "./pages/admin/admin";

import './app.less'

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
