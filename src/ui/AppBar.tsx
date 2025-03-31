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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const allPages = [
    { text: "Fogar", path: "/home" },
    { text: "DramaturgX", path: "/authors" },
    { text: "Obras", path: "/plays" },
    { text: "Persoaxes", path: "/characters" },
    { text: "Esceas", path: "/scenes" },
    { text: "Construccións", path: "/character-buildings" }
];
const publicPages = [{ text: "Fogar", path: "/home" }];
const settings = ["Perfil", 'Logout'];

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (route?: string) => {
        setAnchorElNav(null);
        if (route) navigate(route);
    };

    const handleCloseUserMenu = (route?: string) => {
        setAnchorElUser(null);
        if (route) navigate(route);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        handleCloseUserMenu();
        navigate("/login");
    };

    const pagesToShow = token ? allPages : publicPages;

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
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
                                open={Boolean(anchorElNav)}
                                onClose={() => handleCloseNavMenu()}
                            >
                                {pagesToShow.map((page) => (
                                    <MenuItem key={page.text} onClick={() => handleCloseNavMenu(page.path)}>
                                        <Typography>{page.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pagesToShow.map((page) => (
                                <Button
                                    key={page.text}
                                    onClick={() => handleCloseNavMenu(page.path)}
                                    sx={{ my: 2, color: 'white' }}
                                >
                                    {page.text}
                                </Button>
                            ))}
                        </Box>

                        {token ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user?.username ?? "User"} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={() => handleCloseUserMenu()}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={setting === 'Logout' ? handleLogout : () => handleCloseUserMenu(`/${setting.toLowerCase()}`)}
                                        >
                                            <Typography>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button
                                    color="inherit"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>
                            </Box>
                        )}

                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ mt: 7 }} />
        </>
    );
}

export default ResponsiveAppBar;
