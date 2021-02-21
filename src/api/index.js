import ajax from './ajax'

// 登录
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')

// 天气
export const reqWeather = (city="广州")=>{
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    return fetch(url).then(
        response=>response.json()
    )
    .then(data=>{
        // console.log(data)
        // const city = data.data.city
        const weather = data.data.forecast[0].type
        return {weather}
    })
    .catch(error=>console.log(error,'获取天气失败'))
}

// 分类
export const reqCategory=(parentId=0)=>ajax('/manage/category/list',{parentId})
export const reqAddCategory = (parentId,categoryName)=>ajax('/manage/category/add',{parentId,categoryName},"POST")
export const reqUpdateCategory =(categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},"POST")
export const reqCategoryNameById = (categoryId)=>ajax('/manage/category/info',{categoryId},'GET')

// 商品
export const reqProductList =(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize},'GET')
export const reqProductByKeyWord = ({pageNum,pageSize,searchType,searchName})=>ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName},'GET')
export const reqUpdateStatus = (productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'POST')
export const reqAddProduct = (product)=>ajax('/manage/product/add',product,'POST')
export const reqUpdateProduct = (product)=>ajax('/manage/product/update',product,'POST')

// 商品图片
export const reqDeleteProductPic = (name)=>ajax('/manage/img/delete',{name},"POST")

// 角色管理
export const reqRoleList = ()=>ajax('/manage/role/list',{},'GET')
export const reqAddRole=(roleName)=>ajax('/manage/role/add',{roleName},'POST')
export const reqUpdateRole = (role)=>ajax('/manage/role/update',role,'POST')

// 用户管理
export const reqUserList = ()=>ajax('/manage/user/list',{},'GET')
export const reqAddUser = (user)=>ajax('/manage/user/add',user,'POST')
export const reqUpdateUser = (user)=>ajax('/manage/user/update',user,'POST')
export const reqDeleteUser = (userId)=>ajax('/manage/user/delete',{userId},'POST')