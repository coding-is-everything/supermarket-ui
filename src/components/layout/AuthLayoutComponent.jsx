import React from 'react';
import { Box, Container, Paper, Typography, Avatar, CssBaseline } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

const AuthLayoutComponent = ({
    children,
    title
}) => {
    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            py: 4,
        }}>
            <CssBaseline />
            <Paper
            elevation={3}
            sx={{
                p: { xs: 2, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                borderRadius: (theme) => theme.spane.borderRadius * 1.5,
            }}
            >
                <Avatar sx={{
                    m: 1,
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                }}>
                    <StoreIcon fontSize='large' />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    {title}
                </Typography>
                {children}
            </Paper>
            <Typography variant='body2' color="text.secondary" align="center" sx={{ mt: 5 }}>
                {'@ '}
                {new Date().getFullYear()}
                {' Supermarket Management System'}
            </Typography>
        </Container>
    );
};

export default AuthLayoutComponent;