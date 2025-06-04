import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink, Paper, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PageWrapper = ({ title, breadcrumbs, actionArea, children, sx, headerSx }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: (theme) => theme.shape.borderRadius,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    ...headerSx
                }}
            >
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm="auto">
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{ mb: 0.5 }}>
                                {breadcrumbs.map((crumb, index) =>
                                    crumb.to ? (
                                        <MuiLink
                                            component={RouterLink}
                                            to={crumb.to}
                                            underline="hover"
                                            color="inherit"
                                            key={`breadcrumb-${index}`}
                                        >
                                            {crumb.label}
                                        </MuiLink>
                                    ) : (
                                        <Typography color="text.primary" key={`breadcrumb-${index}`}>
                                            {crumb.label}
                                        </Typography>
                                    )
                                )}
                            </Breadcrumbs>
                        )}
                        <Typography variant="h5" component="h1" gutterBottom={!breadcrumbs || breadcrumbs.length === 0}>
                            {title}
                        </Typography>
                    </Grid>

                    {actionArea && (
                        <Grid item xs={12} sm="auto">
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
                                {actionArea}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    flexGrow: 1,
                    backgroundColor: 'background.paper',
                    borderRadius: (theme) => theme.shape.borderRadius,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    overflow: 'auto',
                    ...sx,
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default PageWrapper;