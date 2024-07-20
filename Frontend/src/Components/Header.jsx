import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import axios from 'axios'

const drawerWidth = 240;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    zIndex: theme.zIndex.drawer + 1, // Add this line to ensure the AppBar is above the Drawer
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header({ children }) {
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [loginBox, setLoginBox] = React.useState(false);
    const [signupBox, setSignupBox] = React.useState(false);
    const [staff, setStaff] = React.useState(false);
    const [isLoginFalied, setLoginFail] = React.useState(false)
    const [isSignupFailed, setSignupFail] = React.useState(false)


    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            setAuth(true);
            const staff = localStorage.getItem("staff")
            setStaff(staff)
        } else {
            setAuth(false)
        }

    }, [])
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("staff")
        location.reload()
    }

    const [loginCredentials, setLoginCredentials] = React.useState({
        email: '',
        password: '',
    });
    const handleLogin = (event) => {
        const { id, value } = event.target;
        setLoginCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const [signupCredentials, setSignupCredentials] = React.useState({
        email: '',
        phoneNumber: '',
        password: '',
    });
    const handleSignup = (event) => {
        const { id, value } = event.target;
        setSignupCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSignupSubmit = () => {
        axios.post("http://65.1.136.63/auth/signup", signupCredentials).then((res) => {
            localStorage.setItem('token', res.data['token']);
            localStorage.setItem("staff", res.data['staff'])
            location.reload();
        }).catch((err) => {
            setSignupFail(true)
        });
    }

    const handleLoginSubmit = () => {
        axios.post("http://65.1.136.63/auth/login", loginCredentials).then((res) => {
            localStorage.setItem('token', res.data['token']);
            localStorage.setItem("staff", res.data['staff'])
            location.reload();
        }).catch((err) => {
            setLoginFail(true)
        });
    }



    const navigate = useNavigate()

    const handleMyBookings = () => {
        navigate("/user-bookings")
    };

    const handleTransactionHistory = () => {
        navigate("/user-transactions")
    };


    const handleFlightAdmin = () => {
        navigate("/addFlights")
    };

    const menuItems = [
        { text: "My Bookings", action: handleMyBookings },
        { text: "Transaction History", action: handleTransactionHistory },
        { text: "Flight Admin", action: handleFlightAdmin, staffOnly: true },
    ];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed" open={open} sx={{ backgroundColor: '#333333' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} onClick={() => { navigate("/") }}>
                        FlightMaster
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && (
                        <>
                            <Button color="inherit" onClick={() => {
                                setLoginBox(true);
                                setSignupBox(false);
                            }}>Login</Button>
                            <Button color="inherit" onClick={() => {
                                setSignupBox(true);
                                setLoginBox(false);
                            }}>Signup</Button>
                        </>
                    )}
                </Toolbar>
            </AppBarStyled>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item, index) => {
                        if (item.staffOnly && !staff) {
                            return null;
                        }

                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={item.action}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Modal
                open={loginBox}
                onClose={() => { setLoginBox(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    {
                        isLoginFalied && <Alert severity="error">Invalid Credentials</Alert>
                    }
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Login
                    </Typography>
                    <form style={{ width: '100%' }}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={loginCredentials.email}
                            onChange={handleLogin}
                            fullWidth
                            required
                            autoFocus
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={loginCredentials.password}
                            onChange={handleLogin}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button onClick={handleLoginSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={signupBox}
                onClose={() => { setSignupBox(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        isSignupFailed && <Alert severity="error">Invalid Credentials</Alert>
                    }
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        SignUp
                    </Typography>
                    <form style={{ width: '100%' }}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={signupCredentials.email}
                            onChange={handleSignup}
                            fullWidth
                            required
                            autoFocus
                            margin="normal"
                        />
                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            variant="outlined"
                            type="tel"
                            value={signupCredentials.phoneNumber}
                            onChange={handleSignup}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={signupCredentials.password}
                            onChange={handleSignup}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button onClick={handleSignupSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}
