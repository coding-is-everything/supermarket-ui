// Suggested Folder Path: src/components/layout/AppShell.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import AppHeader from './AppHeader'; // Assuming AppHeader is in the same directory
import AppSidebar from './AppSidebar'; // Assuming AppSidebar is in the same directory
import MainContentArea from './MainContentArea';
import Footer from './Footer'; // Import the Footer component

const drawerWidth = 240; // Ensure this matches the width used in AppSidebar and AppHeader

/**
 * AppShell Component (MUI Version)
 * Main application wrapper for the backend/admin interface.
 * Manages the overall layout including a sidebar, header, and main content area using MUI.
 */
const AppShell = () => {
  // State and handler for responsive drawer (if you implement it)
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline /> {/* Ensures consistent baseline styling & applies background from theme */}

      {/* Sidebar Component */}
      <AppSidebar drawerWidth={drawerWidth} />
      {/*
        For responsive drawer, you might pass props like:
        <AppSidebar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      */}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default', // MUI's default background color from theme
          width: `calc(100% - ${drawerWidth}px)`, // Take remaining width
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Component */}
        <AppHeader drawerWidth={drawerWidth} />
        {/*
          For responsive drawer, you might pass props like:
          <AppHeader
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
        */}

        {/* Toolbar component provides spacing equivalent to AppBar height */}
        <Toolbar />

        {/* Page Content - where routed components will render */}
        <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
          <MainContentArea><Outlet /></MainContentArea>
        </Box>

        {/* Footer Component */}
        <Footer drawerWidth={drawerWidth} />
      </Box>
    </Box>
  );
};

export default AppShell;
