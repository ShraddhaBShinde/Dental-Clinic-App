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
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import profileicon from '../assets/profileicon.jpeg';
import { useSelector } from 'react-redux';
import { adminMenu, userMenu } from '../Menu';
import { message } from 'antd';

// const pages = ['appointments', 'doctors', 'users'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [
    { title: "Appointments", path: "/admin/appointments" },
    { title: "Doctors", path: "/admin/doctors" },
    { title: "Patients", path: "/admin/patients" },
];
// const settings = [
//     { title: "Profile", path: "/admin/profile" },
//     { title: "Account", path: "/admin/account" },
//     { title: "Dashboard", path: "/admin/dashboard" },
//     { title: "Logout", path: "/login" },
// ];

const AdminNav = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);


    // const menuItems = user?.isAdmin ? adminMenu : userMenu;

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

    const handlePageClick = (page) => {
        console.log(`Clicked ${page}`);
        if (page === 'Appointments') {
            navigate('/admin/appointments')
        } else if (page === 'Doctors') {
        } else if (page === 'Patient') {
        }
    };

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
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <InsertEmoticonIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/admin"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SMILE MAKERS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" component={NavLink} to={page.path}>
                                        {page.title}</Typography>
                                    {/* <Button onClick={() => { Navigate(`/${pages}`) }}>{pages}</Button> */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <InsertEmoticonIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Smile Makers
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={page.path}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={profileicon} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            {adminMenu.map((menu) => (
                                <MenuItem key={menu.name} onClick={() => handleSettingClick(menu.name)}>
                                    {/* <Button onClick={() => { Navigate(`/${settings}`) }}>{settings}</Button> */}
                                    <Button component={NavLink} to={menu.path}>{menu.name}</Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AdminNav