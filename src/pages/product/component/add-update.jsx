import React, { Component } from 'react';
import { Card, Button, Form, Input, Cascader } from "antd";
import {
    ArrowLeftOutlined,
} from '@ant-design/icons'

import PictureWall from "./picture-wall";
import RichTextEditor from "./rich-text-editor.jsx";
import { reqCategory,reqAddProduct,reqUpdateProduct } from "../../../api/index";

const { TextArea } = Input


class AddUpdate extends Component {
    constructor(props){
        super(props)
        const locationState = props.location.state
        // console.log(locationState)
        this.product = locationState?locationState.record:{}
        this.isUpdate=!!locationState // 转换为布尔类型
        
    }
    state = {
        options: [] // 定义分类级联数组
    }

    // 异步加载分类列表
    loadData = async (selectedOptions) => {
        // console.log(selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
        // 获取二级分类
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false
        if (subCategorys && subCategorys.length > 0) {
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: false
            }))
            targetOption.children = cOptions
        }else{
            targetOption.isLeaf = true
        }
        this.setState({
            options:[...this.state.options]
        })
    }

    getCategorys = async (parentId) => {
        const result = await reqCategory(parentId)
        const categorys = result.data
        // 如果是一级分类
        if (parentId === '0') {
            this.initOptions(categorys)
        } else {
            return categorys
        }
    }
    // 初始化options
    initOptions = (categorys) => {
        const options = categorys.map((c) => ({
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        this.setState({
            options
        })
    }


    onFinish = async (value) => {
        console.log(value)
        const {desc,name,price,categorys} =value
        const detail = this.editor.getDetail()
        const imgs = this.imgs.getImgs()
        let pCategoryId,categoryId
        if (categorys.length===1) {
            pCategoryId='0'
            categoryId=categorys[0]
        }else{
            pCategoryId=categorys[0]
            categoryId = categorys[1]
        }
        let product
        if (this.isUpdate) {
            product = {_id:this.product._id,pCategoryId,categoryId,name,desc,price,detail,imgs}
            await reqUpdateProduct(product)
        }else{
            product = {pCategoryId,categoryId,name,desc,price,detail,imgs}
            await reqAddProduct(product)
        }
        this.props.history.replace('/product')
        
    }
    onFinishFailed = () => {
        console.log('buok')
    }

    componentDidMount() {
        this.getCategorys('0')
    }
    render() {
        const { options } = this.state
        const {product,isUpdate} = this
        const title = <span>
            <ArrowLeftOutlined style={{ color: '#FF99CC', width: 30 }} onClick={() => { this.props.history.go(-1) }} />
            <span>{isUpdate?'修改商品':'添加商品'}</span>
        </span>
        const layout = {
            labelCol: { span: 3, }, wrapperCol: { span: 8, },
        };
        const formItemLayout = {
            labelCol: { span: 3, }, wrapperCol: { span: 21, },
        };

        const cateIdArr = []
        if (isUpdate) {
            if (product.pCategoryId==='0') {
                cateIdArr.push(product.categoryId)
            } else {
                cateIdArr.push(product.pCategoryId)
                cateIdArr.push(product.categoryId)
            }
            // console.log(cateIdArr)
        }
        
        return (
            <Card title={title}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        validateTrigger='onBlur'
                        initialValue={isUpdate?product.name:''}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品描述"
                        name="desc"
                        initialValue={isUpdate?product.desc:''}
                        validateTrigger='onBlur'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <TextArea autoSize />
                    </Form.Item>
                    <Form.Item
                        label="s商品价格"
                        name="price"
                        validateTrigger='onBlur'
                        initialValue={isUpdate?product.price:''}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input type='number' prefix="￥" suffix="元" />
                    </Form.Item>
                    <Form.Item
                        label="商品类别"
                        name="categorys"
                        validateTrigger='onBlur'
                        initialValue={cateIdArr}
                        rules={[
                            {   
                                type:'array',
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Cascader options={options} loadData={this.loadData} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item
                        label="图片上传"
                        name="imags"
                        {...formItemLayout}
                    >
                        <PictureWall ref={p=>{this.imgs=p}} images={isUpdate?product.imgs:[]} isUpdate={isUpdate}></PictureWall>
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                        name="editor"
                        {...formItemLayout}
                    >
                        <RichTextEditor ref={value=>{this.editor=value}} detail= {product.detail}></RichTextEditor>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit">{isUpdate?'更新':'新增'}</Button>
                    </Form.Item>
                </Form>

            </Card>
        );
    }
}

export default AddUpdate;