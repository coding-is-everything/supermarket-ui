import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Tooltip,
    InputBase,
    Badge,
    Menu,
    MenuItem,
    Divider,
    Box,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '@:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

const AppHeader = ({ drawerWidth, handleDrawerToggle }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);
    const [notifications] = React.useState([
        // Sample notifications - replace with actual data from your backend
        { id: 1, text: 'New order received', time: '5 min ago' },
        { id: 2, text: 'Inventory low on Milk', time: '2 hours ago' },
    ]);

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const pageTitle = pathnames.length > 0
        ? pathnames[pathnames.length - 1].charAt(0).toUpperCase() + pathnames[pathnames.length - 1].slice(1) : 'Dashboard';

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNotificationsMenu = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotificationsMenu = () => {
        setAnchorElNotifications(null);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        handleCloseUserMenu();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` }, // Adjust width for permanent drawer on sm+
                ml: { sm: `${drawerWidth}px` }, // Margin left for permanent drawer on sm+
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar>
                {/* IconButton for toggling drawer on smaller screens */}
                {/*
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle} // This prop needs to be passed from AppShell if responsive drawer is used
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        */}

                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 500 }}>
                        {pageTitle}
                    </Typography>
                    {/* You can add Breadcrumbs here if needed, dynamically generated */}
                </Box>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    // Add onChange and onKeyPress handlers for search functionality
                    />
                </Search>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit" onClick={handleOpenNotificationsMenu}>
                            <Badge badgeContent={notifications.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-notifications"
                        anchorEl={anchorElNotifications}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElNotifications)}
                        onClose={handleCloseNotificationsMenu}
                        PaperProps={{
                            style: {
                                maxHeight: 400,
                                width: '320px',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
                            {/* Optional: <Button size="small">Mark all as read</Button> */}
                        </Box>
                        <Divider />
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <MenuItem key={notification.id} onClick={handleCloseNotificationsMenu} sx={{ borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
                                    <ListItemText
                                        primary={<Typography variant="body2">{notification.text}</Typography>}
                                        secondary={<Typography variant="caption" color="text.secondary">{notification.time}</Typography>}
                                    />
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem onClick={handleCloseNotificationsMenu}>
                                <ListItemText primary="No new notifications" />
                            </MenuItem>
                        )}
                        {notifications.length > 0 && <Divider />}
                        {notifications.length > 0 && (
                            <MenuItem
                                onClick={handleCloseNotificationsMenu}
                                component={RouterLink}
                                to="/notifications"
                                sx={{ justifyContent: 'center', py: 1.5 }}
                            >
                                <Typography variant="body2" color="primary">View all notifications</Typography>
                            </MenuItem>
                        )}
                    </Menu>

                    <Tooltip title="User Account">
                        <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{ p: 0, ml: 1.5 }}>
                            <Avatar alt="User Name" src="/static/images/avatar/1.jpg">
                                {/* Fallback to initials: U */}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar-user"
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/profile">
                            <ListItemIcon><ManageAccountsIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/settings/account">
                            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Account Settings</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;