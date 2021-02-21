import React, { Component } from 'react';
import { Upload,Modal,message} from "antd";
import {
    PlusOutlined
} from '@ant-design/icons'


const BASE_IMG_PATH = 'http://localhost:5000/upload/'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


class PictureWall extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };
    // 图片相关
    handleCancelPreview = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleChange = async({file, fileList }) => {
        // console.log(file,fileList)
        if (file.status==='done') {
            
            message.success('上传成功')
        } else if (file.status==='removed') {
            
            message.success('删除图片成功')
        }
        this.setState({ fileList })
    };
    initFileList=()=>{
        const {isUpdate,images} = this.props
        let fileList=[]
        if (isUpdate&&images.length>0) {
            fileList = images.map((c,index)=>({
                uid:-(index+1),
                name:c,
                status:'done',
                url:BASE_IMG_PATH+c
            }))
        }
        this.setState({fileList})
    }
    getImgs=()=>{
        return this.state.fileList.map(v=>v.name)
    }
    componentDidMount(){
        this.initFileList()
    }
    render() {
        const { fileList, previewVisible, previewImage } = this.state
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    listType="picture-card"
                    action="/manage/img/upload"
                    accept="image/*"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancelPreview}
                >
                    <img alt="example" style={{ width: '80%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PictureWall;