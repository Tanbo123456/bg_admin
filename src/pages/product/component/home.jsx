import React, { Component } from 'react';
import { Card, Select, Input, Button, Table, message } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons'

import { reqProductList, reqProductByKeyWord, reqUpdateStatus } from "../../../api/index";

// productList = [
//     {
//         status: 1,
//         imgs: [
//             "image-1559402396338.jpg"
//         ],
//         _id: "5ca9e05db49ef916541160cd",
//         name: "联想ThinkPad 翼4809",
//         desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
//         price: 65999,
//         pCategoryId: "5ca9d6c0b49ef916541160bb",
//         categoryId: "5ca9db9fb49ef916541160cc",
//         detail: "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
//         __v: 0
//     },
//   ];

const { Option } = Select
const { Search } = Input
const pageSize = 5

class ProductHome extends Component {
    state = {
        searchType: 'productName',// productDesc
        searchName: '',
        productList: [],
        total: 0,
    }

    productColumns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => <span>{'￥' + price}</span>
        },
        {
            title: '状态',
            width: 100,
            render: (text, record) => {
                return <span>
                    {record.status === 1 ? <Button
                        type='primary'
                        onClick={() => { this.updateStatus(record) }}
                    >下架</Button> : <Button
                        type='default'
                        onClick={() => { this.updateStatus(record) }}
                    >上架</Button>}

                    {record.status === 1 ? <span>在售</span> : <span style={{ color: 'red' }}>售罄</span>}
                </span>
            }
        },
        {
            title: '操作',
            width: 100,
            render: (text, record) => {
                return <span>
                    <Button type='link' onClick={() => { this.props.history.push('/product/add-update',{record}) }}>修改</Button>
                    <Button type='link' onClick={() => { this.props.history.push('/product/detail', { record }) }}>详情</Button>
                </span>
            }
        },
    ]
    updateStatus = async (record) => {
        // console.log(record)// status =1,2
        let status
        const productId = record._id
        if (record.status === 1) {
            status = 2
        } else {
            status = 1
        }
        await reqUpdateStatus(productId, status)
        this.getProductList(this.pageNum||1)
        message.success('修改商品状态成功！')
    }
    getProductList = async (pageNum) => {
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        let res
        if (searchName) {
            // console.log(searchName)
            res = await reqProductByKeyWord({ pageNum, pageSize, searchType, searchName })
        } else {
            res = await reqProductList(pageNum, pageSize)
        }

        // console.log(res)
        const { total, list } = res.data
        this.setState({
            productList: list,
            total,
        })
    }
    componentDidMount() {
        // const {pageNum} = this.state
        this.getProductList(this.pageNum||1)
    }
    render() {
        const { productList, total, searchType } = this.state
        const title = (<span>
            <Select
                value={searchType}
                style={{ width: 120, marginRight: 10 }}
                onChange={(value) => this.setState({ searchType: value })}
            >
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Search
                placeholder="请输入关键字"
                allowClear
                enterButton="搜索"
                onChange={(e) => { this.setState({ searchName: e.target.value }) }}
                // size="large"
                onSearch={() => this.getProductList(1)}
                style={{ width: 200 }}
            />
        </span>)
        const extra = (<Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => { this.props.history.push('/product/add-update') }}
        >
            添加商品
        </Button>)
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={productList}
                    columns={this.productColumns}
                    rowKey='_id'
                    bordered
                    scroll={{ y: 200 }}
                    pagination={{
                        defaultPageSize: pageSize,
                        total,

                        onChange: this.getProductList
                    }}
                />
            </Card>
        );
    }
}

export default ProductHome;