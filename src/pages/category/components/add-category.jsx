import React from 'react';
import { Modal, Form, Select, Input } from 'antd'
// import PropTypes from "prop-types";

function AddCategoryForm(props) {
    const [form] = Form.useForm();
    const { visible, onCancel, onCreate,categoryList } = props
    return (
        <Modal
            visible={visible}
            title="新建品类"
            okText="新建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
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
                    name="parentId"
                    label="分类"
                    rules={[
                        {
                            required: true,
                            message: 'Please select category',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option key='0' value='0'>一级分类列表</Select.Option>
                        {categoryList.map(v=>
                            <Select.Option key={v.key} value={v.key}>{v.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
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
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    )
}

export default AddCategoryForm;