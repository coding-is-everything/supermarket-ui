import React from 'react';
import { Box, Paper, Typography, Grid, Button, TextField, MenuItem } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import BreadcrumbsComponent from '../common/BreadcrumbsComponent';

const DashboardLayoutComponent = ({ 
    title, 
    headerControls, 
    children, 
    breadcrumbs,
    sx 
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...sx }}>
            {(title || headerControls) && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: 'background.paper',
                        borderRadius: (theme) => theme.shape.borderRadius,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                >
                    {/* Breadcrumbs */}
                    {breadcrumbs && (
                        <Box sx={{ mb: 1 }}>
                            <BreadcrumbsComponent items={breadcrumbs} />
                        </Box>
                    )}
                    
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        {title && (
                            <Grid item xs={12} md="auto">
                                <Typography 
                                    variant='h5' 
                                    component="h1" 
                                    gutterBottom={!headerControls}
                                    sx={breadcrumbs ? { mt: 0.5 } : {}}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                        )}
                        {headerControls && (
                            <Grid item xs={12} md>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                    }}
                                >
                                    {headerControls}
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            )}

            <Box
            sx={{
                flexGrow: 1,
            }}
            >
                {children}
            </Box>
        </Box>
    );
};

const ExampleDashboardWidget = ({ title, children, sx }) => (
    <Paper elevation={1} sx={{ p: 2, height: '100%', ...sx }}>
        <Typography variant='h6' component="h3" gutterBottom sx={{fontSize: '1rem', fontWeight: 500}}>
            {title}
        </Typography>
        {children}
    </Paper>
);

const ExampleChartPlaceholder = ({ title = "Chart Area", height = 200 }) => (
    <Box
    sx={{
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.action.hover,
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `1px dashed ${theme.palette.divider}`,
        color: 'text.secondary',
    }}
    >
        <Typography variant='subtitle1'>{title}</Typography>
    </Box>
);

export { ExampleDashboardWidget, ExampleChartPlaceholder };
export default DashboardLayoutComponent;