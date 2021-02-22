// 操作数据的函数模块

import { combineReducers } from "redux";

import { SET_HEAD_TITLE, RECEIVE_USER, RESET_USER } from "./action-type";


// 管理 headTitle
const initTitle = '首页'
function headTitle(state = initTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state;
    }
}


const initUser = JSON.parse(localStorage.getItem('user'))
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {}
        default:
            return state
    }
}



export default combineReducers({
    headTitle,
    user
})