import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/v1/user/users');
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
            <div >
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Phone</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.userId}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    {/* <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(doctor.userId)}>Edit</Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(doctor.userId)}>Delete</Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <Link to="/admin/doctor-add" >
                        <Button variant="contained" color="primary">Add Doctor</Button>
                    </Link>
                </div> */}

            </div>
        </div>
    );
};

export default ManageUsers;