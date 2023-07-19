import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Button, Box, Fade } from '@mui/material';
import appointmenticon from '../pages-assets/appointmenticon.jpg';
import doctoricon from '../pages-assets/doctoricon.jpg'
import myappointment from '../pages-assets/myappointment.jpg'
import { Link } from 'react-router-dom';


const Home = () => {
    const [isMounted, setIsMounted] = useState(false);
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
        setIsMounted(true);
    }, []);
    return (
        <>

            <Container sx={{ marginTop: '100px' }}>
                <Fade in={isMounted} timeout={1000}>
                    <Box>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <h1 style={{ fontSize: '36px', fontWeight: 'bold', fontStyle: 'italic', color: '#2E3B55', marginBottom: '24px' }}>
                                    Welcome to Smile Makers Dental Clinic!
                                </h1>
                                <p style={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}>
                                    We are committed to providing the best dental care services to our valued patients.
                                    Book an appointment with our expert dentists and experience top-notch dental treatment
                                    tailored to your needs. Let us take care of your smile and oral health!
                                </p>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
                <Fade in={isMounted} timeout={1000}>
                    <Box sx={{ marginTop: '150px' }} >
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                                <img src={appointmenticon} style={{ height: '270px', width: '270px' }} />
                                <Link to="/book-appointment">
                                    <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                        Book Appointment
                                    </Button>
                                </Link>

                            </Grid>
                            {/* <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                            <img src={myappointment} style={{ height: '270px', width: '270px' }} />
                            <Link to="/view-appointments">
                                <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                    View Appointments
                                </Button></Link>

                        </Grid> */}
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '50px', width: '50px' }}>
                                <img src={doctoricon} style={{ height: '270px', width: '270px' }} />
                                <Link to="/view-doctors">
                                    <Button variant="contained" fullWidth sx={{ marginTop: '12px' }}>
                                        View Doctors
                                    </Button></Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Container>
        </>
    )
}

export default Home