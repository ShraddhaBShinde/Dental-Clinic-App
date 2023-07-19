import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice'

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
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('api/v1/user/login', values)
            dispatch(hideLoading());
            console.log('Response:', res.data); // Check the response data
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("isAdmin", res.data.data.isAdmin)
                message.success('Login Successful')
                // navigate('/')

                const isAdmin = res.data.data.isAdmin;

                dispatch(setUser(res.data.data));
                if (isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }

            }
            else {
                message.error(res.data.message)
            }
        }
        catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error('Something went wrong')
        }
    }

    return (
        <div className="form-container">
            <Form className="signup-form" onFinish={onFinishHandler}
                {...layout}
                name="nest-messages"
                wrapperCol={{ sm: 24 }}>

                <h1 style={{ textAlign: "center" }}>Login Form</h1>
                <Form.Item name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                    ]}>
                    <Input type="email" required></Input>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Not registered?
                    <Link to="/signup">Click to signup</Link>
                </div>
            </Form>
        </div>
    )
}

export default Login