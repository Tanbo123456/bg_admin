import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},method="GET"){
    return new Promise((resolve,reject)=>{
        let result
        if (method==="GET") {
            result = axios.get(url,{params:data})
        } else {
            result = axios.post(url,data)
        }
        result.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error('请求错误'+error.message)
        })
    })
}