import React from 'react'
import { Modal, Form, Input } from 'antd'

export default function UpdateCategory(props) {
    const [form] = Form.useForm();
    let categoryName,categoryId;
    const { visible, onCancel, onCreate} = props
    if (props.record) {
        categoryName = props.record.name
        categoryId = props.record.key
        // console.log(categoryName)
    }else{
        categoryName = ''
        categoryId='0'
    }
    
    return (
        <Modal
            visible={visible}
            title="新建品类"
            okText="新建"
            cancelText="取消"
            onCancel={()=>{
                form.resetFields()
                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values,categoryId);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >   
                
                <Form.Item
                    name="categoryName"
                    label="品类名称"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input placeholder={categoryName}/>
                </Form.Item>


            </Form>
        </Modal>
    )
}
