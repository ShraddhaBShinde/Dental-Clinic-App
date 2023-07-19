// import React from 'react';
// import { Menu, Dropdown } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import profileicon from '../assets/profileicon.jpeg';
import { useSelector } from 'react-redux';
import { adminMenu, userMenu } from '../Menu';
import { message } from 'antd';


// const pages = [
//     { title: "Appointments", path: "/view-appointments" },
//     // { title: "Profile", path: "/profile" },
//     // { title: "Patients", path: "/admin/patients" },
// ];
const settings = [
    // { title: "Home", path: "/" },
    { title: "Book Appointment", path: "/book-appointment" },
    { title: "View appointments", path: "/view-appointments" },
    { title: "View doctors", path: "/view-doctors" },
    // { title: "Login", path: "/login" },
    { title: "Logout", path: "/login " },
];


const UserNav = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    // const UserMenu = user?.isAdmin ? adminMenu : userMenu

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // const handlePageClick = (page) => {
    //     console.log(`Clicked ${page}`);
    //     if (page === 'Appointments') {
    //         navigate('/admin/appointments')
    //     } else if (page === 'Doctors') {
    //     } else if (page === 'Patient') {
    //     }
    // };

    const handleSettingClick = (setting) => {
        console.log(`Clicked ${setting}`);
        if (setting === 'Profile') {
            navigate('/admin/profile')
        } else if (setting === 'Account') {
            navigate('/admin/account')
        } else if (setting === 'Dashboard') {
            navigate('/admin/dashboard')
        } else if (setting === 'Logout') {
            handleLogout();
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successful");
        navigate("/login");
    };

    return (
        <AppBar position="static" style={{ background: '#F31559' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <InsertEmoticonIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            to="/admin"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SMILE MAKERS
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuIcon sx={{ mr: 1 }} />
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={profileicon} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.title} onClick={() => handleSettingClick(setting.title)}>
                                    <Button component={NavLink} to={setting.path}>{setting.title}</Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default UserNav


//<Link to="/profile">{user?.name}</Link>
//const { user } = useSelector(state => state.user)

//#2E3B55
//#F31559