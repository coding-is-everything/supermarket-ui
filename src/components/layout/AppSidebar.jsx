// Suggested Folder Path: src/components/layout/AppSidebar.jsx

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// Example Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';

const AppSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Products', icon: <InventoryIcon />, path: '/products' },
    { text: 'Inventory', icon: <StoreIcon />, path: '/inventory' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    // Example of a divider and another section
    // { divider: true },
    // { text: 'Management', subheader: true },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawerContent = (
    <>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: [1] }}>
        <StoreIcon sx={{ mr: 1, fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Supermarket MS
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item, index) => {
            if (item.divider) {
              return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
            }
            if (item.subheader) {
              return (
                <ListItem key={item.text} sx={{ pt: 2, pb: 0 }}>
                  <ListItemText
                    primary={<Typography variant="caption" color="text.secondary">{item.text}</Typography>}
                  />
                </ListItem>
              );
            }
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname.startsWith(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      },
                      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: 'primary.main',
                        fontWeight: 500,
                      },
                    },
                    // Add general hover effect for non-selected items
                    '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.04),
                    }
                  }}
                >
                  <ListItemIcon sx={{minWidth: '40px'}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Drawer for mobile/temporary view */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Drawer for desktop/permanent view */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open // Permanent drawer is always open on larger screens
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default AppSidebar;
