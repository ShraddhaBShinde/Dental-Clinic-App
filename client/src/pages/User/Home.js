import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Button, Box } from '@mui/material';
import appointmenticon from '../pages-assets/appointmenticon.jpg';
import UserNav from '../../components/Navbar/UserNav';
import BookAppointment from './BookAppointment';
import { Link } from 'react-router-dom';
import ViewAppointments from './ViewAppointments';

const Home = () => {
    //login user data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/user/getUserData",
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
        getUserData();
    }, []);
    return (
        <>

            <Container sx={{ marginTop: '170px' }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={appointmenticon} style={{ height: '270px', width: '270px' }} />
                            <Link to="/book-appointment">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                    Book Appointment
                                </Button>
                            </Link>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={appointmenticon} style={{ height: '270px', width: '270px' }} />
                            <Link to="/view-appointments">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                    View Appointments
                                </Button></Link>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Home