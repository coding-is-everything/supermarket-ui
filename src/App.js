// Suggested Folder Path: src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import { ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { alpha } from '@mui/material/styles'; // Import alpha for theme usage

// Placeholder Page Components (you'll create these in separate files)
// e.g., import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductPage'; // Import the actual ProductsPage
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
// const DashboardPage = () => <Typography variant="h4" component="h1" gutterBottom>Dashboard Content</Typography>;
const InventoryPage = () => <Typography variant="h4" component="h1" gutterBottom>Inventory Content</Typography>;
const OrdersPage = () => <Typography variant="h4" component="h1" gutterBottom>Orders Content</Typography>;
const CustomersPage = () => <Typography variant="h4" component="h1" gutterBottom>Customers Content</Typography>;
const ReportsPage = () => <Typography variant="h4" component="h1" gutterBottom>Reports Content</Typography>;
const SettingsPage = () => <Typography variant="h4" component="h1" gutterBottom>Settings Content</Typography>;
const ProfilePage = () => <Typography variant="h4" component="h1" gutterBottom>User Profile Page</Typography>;
const AccountSettingsPage = () => <Typography variant="h4" component="h1" gutterBottom>Account Settings Page</Typography>;
const NotificationsPage = () => <Typography variant="h4" component="h1" gutterBottom>All Notifications</Typography>;

const LoginPage = () => (
  <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <Typography variant="h4" component="h1" gutterBottom>Login Page</Typography>
    {/* Actual Login Form would go here */}
  </Box>
);

// A simple auth check placeholder - replace with your actual auth context/logic
const isAuthenticated = () => {
  // Example: return !!localStorage.getItem('authToken');
  return true; // Assume user is authenticated for this example
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Define a basic MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // MUI default blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e', // MUI default pink
      light: '#ff6090',
      dark: '#9a0036',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8', // A light grey for the main content background
      paper: '#ffffff',   // Background for elements like AppBar, Drawer, Cards
    },
    text: {
      primary: '#263238', // Darker grey for primary text
      secondary: '#546e7a', // Lighter grey for secondary text
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      marginBottom: '1rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.15rem',
    },
    button: {
        textTransform: 'none', // Keep button text case as is
    }
  },
  shape: {
    borderRadius: 8, // Slightly more rounded corners
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0, // Flatter AppBar
      },
      styleOverrides: {
        root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`, // Subtle border instead of strong shadow
        }),
      }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: ({ theme }) => ({
                borderRight: `1px solid ${theme.palette.divider}`,
            }),
        }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({ // theme is available here
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.primary.main,
              fontWeight: 500,
            },
          },
        }),
      },
    },
    MuiTooltip: {
        defaultProps: {
            arrow: true,
        }
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* Default child route for "/" can be dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings/account" element={<AccountSettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            {/* Add other nested routes here that should appear within the AppShell */}
          </Route>

          {/* Routes that DO NOT use the AppShell layout (e.g., Login, Register) */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}

          {/* Catch-all for 404 Not Found (optional) */}
          {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
