import React from 'react';
import { Form, Input,Modal } from "antd";

function AddRole(props) {
    
    const [form] = Form.useForm();
    const {isAddVisible,onCancelAdd,onAddRole} = props
    return (
        <Modal
            visible={isAddVisible}
            title="新建角色"
            okText="新建"
            cancelText="取消"
            onCancel={onCancelAdd}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onAddRole(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                name="form_in_modal"
                
            >
                
                <Form.Item
                    label='角色名称'
                    name='roleName'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    validateTrigger='onBlur'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your roleName!',
                        },
                    ]}
                >
                    <Input placeholder='请输入角色名称' />
                </Form.Item>

            </Form>
        </Modal>
    );

}

export default AddRole;