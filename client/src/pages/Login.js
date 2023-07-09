import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

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
    const navigate = useNavigate()

    //form handler
    const onFinishHandler = async (values) => {
        try {
            const res = await axios.post('api/v1/user/login', values)
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                message.success('Login Successful')
                navigate('/')

            }
            else {
                message.error(res.data.message)
            }
        }
        catch (error) {
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