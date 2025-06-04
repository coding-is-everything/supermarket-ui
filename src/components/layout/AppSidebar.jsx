// Suggested Folder Path: src/components/layout/AppSidebar.jsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

// Components
import NavMenu from './NavMenu';

const AppSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { 
      text: 'Products', 
      icon: <InventoryIcon />, 
      children: [
        { text: 'All Products', path: '/products' },
        { text: 'Categories', path: '/products/categories', icon: <CategoryIcon /> },
        { text: 'Offers', path: '/products/offers', icon: <LocalOfferIcon /> },
      ]
    },
    { 
      text: 'Orders', 
      icon: <ShoppingCartIcon />, 
      children: [
        { text: 'All Orders', path: '/orders' },
        { text: 'Pending Orders', path: '/orders/pending' },
        { text: 'Completed Orders', path: '/orders/completed' },
        { text: 'Invoices', path: '/invoices', icon: <ReceiptIcon /> },
      ]
    },
    { 
      text: 'Customers', 
      icon: <PeopleIcon />, 
      children: [
        { text: 'All Customers', path: '/customers' },
        { text: 'Add New', path: '/customers/new', icon: <PersonAddIcon /> },
      ]
    },
    { 
      text: 'Reports', 
      icon: <AssessmentIcon />, 
      children: [
        { text: 'Sales', path: '/reports/sales', icon: <BarChartIcon /> },
        { text: 'Inventory', path: '/reports/inventory', icon: <PieChartIcon /> },
      ]
    },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawerContent = (
    <>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        px: [1],
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}>
        <StoreIcon sx={{ mr: 1, fontSize: '2rem' }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Supermarket MS
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <NavMenu navItems={navItems} />
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
