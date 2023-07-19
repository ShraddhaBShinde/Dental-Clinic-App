import React, { useEffect } from 'react'
import { Container, Grid, Button, Box } from '@mui/material';
import doctoricon from '../pages-assets/doctoricon.jpg';
import usericon from '../pages-assets/usericon.jpg';
import appointmenticon from '../pages-assets/appointmenticon.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';





const AdminHome = () => {
    //login admin data
    const getAdminData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/user/getAdminData",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAdminData();
    }, []);

    return (
        <>

            <Container sx={{ marginTop: '170px' }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={usericon} style={{ height: '270px', width: '270px' }} />
                            <Link to="/admin/users">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }} >
                                    Manage Users
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={doctoricon} style={{ height: '270px', width: '270px' }} />

                            <Link to="/admin/doctors">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }} >
                                    Manage Doctors
                                </Button>
                            </Link>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={appointmenticon} style={{ height: '270px', width: '270px' }} />
                            <Link to="/admin/appointments">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                    Manage Appointments
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </>
    );
};

export default AdminHome;