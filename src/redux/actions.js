//  多个action的模kuai
import { message } from "antd";

import { SET_HEAD_TITLE, RECEIVE_USER, RESET_USER } from "./action-type";

import { reqLogin } from '../api/index'



export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })


// 管理user的action
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// export const resetUser = ()=>({type:RESET_USER})

// 登出
export const loginOut = () => {
    localStorage.removeItem('user')
    return { type: RESET_USER }
}

// 异步登录
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        // console.log('登录成功',result)
        if (result.status === 0) {
            const user = result.data
            message.success("登录成功")
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(receiveUser(user))
        } else {
            message.error(result.msg)
        }
    }

}


