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
            const response = await axios.get('/api/v1/user/doctors');
            setDoctors(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>View Doctors</h2>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map(doctor => (
                                <TableRow key={doctor._id}>
                                    <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
                                    <TableCell>{doctor.phone}</TableCell>
                                    <TableCell>{doctor.email}</TableCell>
                                    <TableCell>{doctor.specialization}</TableCell>
                                    <TableCell>{doctor.feesPerCunsaltation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    );
};

export default ManageDoctors;