import { showuserAddModal } from '../../Redux/Slice/projectSlice';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { CreateUser } from '../../Redux/Slice/userSlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import './AddUserForm.css'


const AddUserForm = () => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        dispatch(CreateUser(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onCancel = () => {
        dispatch(showuserAddModal(false));
    };

    
    return (
        <>
            <div className='overlay'></div>
            <div className='user-form'>
                <h1>Create User</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="phonenumber"
                        name="phonenumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phonenumber!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Space>

                            <Button type="primary" onClick={onCancel} htmlType="button">
                                cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}
export default AddUserForm;