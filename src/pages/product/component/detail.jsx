import React, { Component } from 'react';
import { Card } from "antd";
import {
    ArrowLeftOutlined
} from '@ant-design/icons'

import './detail.less'
import { reqCategoryNameById } from "../../../api/index";

class ProductDetail extends Component {
    state = {
        pCatName: '',
        catName: ''
    }
    getCategory = async () => {
        const { categoryId, pCategoryId } = this.props.location.state.record
        let catName ,pCatName
        if (pCategoryId==='0') {
            pCatName=''
        } else {
            const res1 = await reqCategoryNameById(pCategoryId)
            pCatName = res1.data.name
        }
        const res2 = await reqCategoryNameById(categoryId)
        catName = res2.data.name
        this.setState({
            pCatName,
            catName
        })
    }
    componentDidMount() {
        this.getCategory()
    }
    render() {
        const { record } = this.props.location.state
        const { catName,pCatName} = this.state
        const title = <span>
            <ArrowLeftOutlined style={{ color: '#FF99CC', width: 30 }} onClick={() => { this.props.history.go(-1) }} />
            <span>商品详情</span>
        </span>
        return (
            <Card title={title} className="detail-wrap">
                <div className="detail-item">
                    <span className="item-title">商品名称：</span>
                    <span className="item-detail">{record.name}</span>
                </div>
                <div className="detail-item">
                    <span className="item-title">商品描述：</span>
                    <span className="item-detail">{record.desc}</span>
                </div>
                <div className="detail-item">
                    <span className="item-title">商品价格：</span>
                    <span className="item-detail">{'￥' + record.price}</span>
                </div>
                <div className="detail-item">
                    <span className="item-title">所属分类：</span>
                    <span className="item-detail">
                        
                        {pCatName===''?catName:pCatName+'--->'+catName}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="item-title">商品图片：</span>
                    {record.imgs.map(v=>(
                        <img key="index" src={v} alt='goods_pic'></img>
                    ))}
                </div>
                <div>
                    <span className="item-title">商品详情：</span>
                    <div dangerouslySetInnerHTML={{__html:record.detail}}></div>
                </div>
            </Card>
        );
    }
}

export default ProductDetail;