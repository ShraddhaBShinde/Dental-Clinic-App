import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/api/v1/ad/doctors');
            setDoctors(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (doctorId) => {
        try {
            const response = await axios.delete(`/api/v1/ad/doctors/${doctorId}`);
            if (response.data.success) {
                setDoctors(doctors.filter((doctor) => doctor.userId !== doctorId));
                console.log('Doctor deleted successfully');
            }
        } catch (error) {
            console.log(error);
            console.log('Error deleting doctor');
        }
    };

    const handleDelete = async (doctorId) => {
        // Implement logic to handle delete
        try {
            const response = await axios.delete(`/api/v1/ad/doctors/${doctorId}`);
            if (response.data.success) {
                // Update doctors state by removing the deleted doctor
                setDoctors(doctors.filter(doctor => doctor.userId !== doctorId));
                // Show success notification or perform any other action
                console.log('Doctor deleted successfully');
            }
        } catch (error) {
            console.log(error);
            // Show error notification or perform any other action
            console.log('Error deleting doctor');
        }
    };

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Manage Doctors</h2>
            <div >
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Specialization</TableCell>
                                <TableCell>Fees</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map(doctor => (
                                <TableRow key={doctor.userId}>
                                    <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
                                    <TableCell>{doctor.phone}</TableCell>
                                    <TableCell>{doctor.email}</TableCell>
                                    <TableCell>{doctor.specialization}</TableCell>
                                    <TableCell>{doctor.feesPerCunsaltation}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(doctor.userId)}>Edit</Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(doctor.userId)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <Link to="/admin/doctor-add" >
                        <Button variant="contained" color="primary">Add Doctor</Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ManageDoctors;