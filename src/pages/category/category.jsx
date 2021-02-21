import React, { Component } from 'react';
import {
    Card,
    Button,
    Table
} from "antd";
import {
    RightOutlined
} from '@ant-design/icons'

import "./category.less";
import { reqCategory, reqAddCategory, reqUpdateCategory } from "../../api/index";
import AddCategory from "./components/add-category";
import UpdateCategory from "./components/update-category";


class Category extends Component {
    state = {
        categoryList: [],
        parentId: '0',
        isModalVisible: false,
        parentName: '',
        subCategory: [],
        showUpdateModal: false,
        showAddModal: false
    }
    getCategoryList = async (parentId) => {

        const res = await reqCategory(parentId)
        this.categoryList = res.data
        // console.log(parentId)
        if (parentId === '0') {
            this.setState({
                categoryList: this.categoryList.map(v => {
                    return { key: v._id, name: v.name }
                })
            })
        } else {
            this.setState({
                subCategory: this.categoryList.map(v => {
                    return { key: v._id, name: v.name }
                })
            })
        }

    }
    showTop = () => {
        const parentId = '0'

        // console.log(record.key)
        this.getCategoryList(parentId)
        this.setState({
            parentId,
            parentName: '',
            subCategory:[]
        })
    }
    showSubList = (record) => {
        // console.log(record)
        const parentId = record.key

        // console.log(record.key)
        this.getCategoryList(parentId)
        this.setState({
            parentId,
            parentName: record.name
        })
    }

    //显示添加模态框
    onAddCategory = () => {
        this.setState({ showAddModal: true })
    }
    onConfirmAdd= async(values)=>{
        // this.setState({ showAddModal: false })
        // console.log(values)
        const {parentId,categoryName} = values
        await reqAddCategory(parentId,categoryName)
        // console.log(res)
        
        this.getCategoryList(parentId)

        //可能是跨类添加
        const parentCategory=this.state.categoryList.find(v=>v.key===parentId)
        // console.log(parentName)
        this.setState({
            showAddModal: false,
            parentId,
            parentName:parentCategory.name
        })
    }
    onCancelAdd=()=>{
        this.setState({ showAddModal: false })
    }

    // 显示修改模态框
    onUpdateCategory=(record)=>{
        this.setState({showUpdateModal:true})
        this.willUpdateCategory = record
        // console.log(this.willUpdateCategory)
    } 
    onConfirmUpdate=async(values,categoryId)=>{
        const {parentId} = this.state
        const {categoryName} = values
        // console.log(values,categoryId)
        await reqUpdateCategory(categoryId,categoryName)
        this.getCategoryList(parentId)

        this.setState({ showUpdateModal: false })
    }
    onCancelUpdate=()=>{
        this.setState({ showUpdateModal: false })
    }
    componentDidMount() {
        const parentId = this.state.parentId
        this.getCategoryList(parentId)
    }
    columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 250,
            render: (text, record) =>
                <span>
                    <Button type="link" onClick={() => this.onUpdateCategory(record)}>修改品类</Button>
                    {this.state.parentId === '0' ? <Button type="link" onClick={() => this.showSubList(record)}>查看子分类</Button> : ''}
                </span>,
        },
    ];
    render() {
        const { parentId, categoryList, subCategory, parentName, showAddModal,showUpdateModal } = this.state
        return (
            <Card
                title={parentId === '0' ? <Button type="text" onClick={this.showTop}>一级分类列表</Button> :
                    <span>
                        <Button type="text" onClick={this.showTop}>一级分类列表</Button>
                        <RightOutlined />
                        <Button type="text">{parentName}</Button>
                    </span>
                }
                extra={<Button type="primary" onClick={this.onAddCategory}>添加</Button>}
                className="cate-card"
            >
               
                <AddCategory
                    visible={showAddModal}
                    categoryList={categoryList}
                    onCreate={this.onConfirmAdd}
                    onCancel={this.onCancelAdd}
                />
                <UpdateCategory
                    visible={showUpdateModal}
                    record={this.willUpdateCategory}
                    onCreate={this.onConfirmUpdate}
                    onCancel={this.onCancelUpdate}
                />
                <Table
                    dataSource={parentId === '0' ? categoryList : subCategory}
                    columns={this.columns}
                    bordered
                    scroll={{ y: 200 }}
                />
            </Card>
        );
    }
}





export default Category;