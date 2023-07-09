import React from 'react'
import { Form, Input, Select, InputNumber, message } from 'antd'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import "../styles/SignUpStyle.css";
const { Option } = Select;

const layout = {
    // labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
    // wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
    // labelCol: {
    //     span: 8,
    // },
    // wrapperCol: {
    //     span: 16,
    // },
};

const SignUp = () => {
    const navigate = useNavigate()

    //form handler
    const onFinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/user/signup', values)
            if (res.data.success) {
                message.success('SignUp Successful!') //alert
                navigate('/login')
            }
            else {
                message.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error)
            message.error('Something went wrong')
        }
    };
    return (
        <>
            <div className="form-container">
                <Form className="signup-form" onFinish={onFinishHandler}
                    {...layout}
                    name="nest-messages"
                    wrapperCol={{ sm: 24 }}>

                    <h1 style={{ textAlign: "center" }}>SignUp Form</h1>
                    <Form.Item label="Full Name" name="name" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}>
                        <Input type="email" required></Input>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            {
                                required: 'true',
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
                        name={['user', 'confirm']}
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item> */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-primary" type="submit">SignUp</button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        Already a user?
                        <Link to="/login">Click to login</Link>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default SignUp