import React, { useState } from 'react';
import '../User/bookappointment.css';
import { Form, Input, Button, DatePicker, TimePicker, message, Select } from 'antd';
import axios from 'axios';

const BookAppointment = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    // const [loading, setLoading] = useState(false);

    // const handleBooking = async (values) => {
    //   setLoading(true);


    //   setLoading(false);
    // };


    const onFinish = async (values) => {
        try {

            const token = localStorage.getItem('token'); // Get the authentication token from local storage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            };



            const res = await axios.post('/api/v1/user/book-appointment', values, config);

            if (res.data.success) {
                message.success('Appointment Booked!')
                console.log('Appointment booked successfully');
            } else {
                // Failed to book appointment
                console.error('Failed to book appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="form-container">

                <Form form={form} layout="vertical" onFinish={onFinish} className="bordered-form">
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', fontStyle: 'italic', color: '#2E3B55', marginBottom: '24px', textAlign: 'center' }}>Book Appointment</h1>
                    <Form.Item label="Doctor Name" name="doctorName" rules={[{ required: true, message: 'Please enter the doctor name' }]}>
                        <Select placeholder="Select a doctor">
                            <Option value="Dr. Priya Singhania">Dr. Priya Singhania</Option>
                            <Option value="Dr. Rajesh Patel">Dr. Rajesh Patel</Option>
                            <Option value="Dr. Ananya Desai">Dr. Ananya Desai</Option>
                            <Option value="Dr. Rohit Patil">Dr. Rohit Patil</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time' }]}>
                        <TimePicker format="HH:mm" />
                    </Form.Item>
                    {/* <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Check Availability
                        </Button>
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Book Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default BookAppointment;