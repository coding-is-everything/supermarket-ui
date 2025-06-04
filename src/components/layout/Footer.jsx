import React from 'react';
import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';

const Footer = ({ drawerWidth }) => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: 'background.paper',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                textAlign: 'center'
            }}
        >
            <Typography variant="body2" color="text.secondary" component="div">
                {new Date().getFullYear()} SuperMarket Management System. All rights reserved.
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    mt: 0.5,
                }}
            >
                <MuiLink component={RouterLink} to="/terms-of-service" variant="caption" color="text.secondary">
                    Terms of Service
                </MuiLink>
                <Typography variant="caption" color="text.secondary">|</Typography>
                <MuiLink component={RouterLink} to="/privacy-policy" variant="caption" color="text.secondary">
                    Privacy Policy
                </MuiLink>
            </Box>
            <Typography variant="caption" color="text.secondary">
                Version: {APP_VERSION}
            </Typography>
        </Box>
    );
};

export default Footer;