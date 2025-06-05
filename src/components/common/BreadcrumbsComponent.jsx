import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbsComponent = ({ items, sx }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
            mb: 0.5,
            fontSize: '0.875rem',
            ...sx
        }}
        >
            {items.map((item, index) => {
                const isLastItem = index === items.length - 1;

                if (item.to && !isLastItem) {
                    return (
                        <MuiLink
                        component={RouterLink}
                        to={item.to}
                        underline="hover"
                        color="inherit"
                        key={`breadcrumb-${item.label}-${index}`}
                        sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            {item.icon && React.cloneElement(item.icon, { sx: { mr: 0.5, fontSize: '1rem' } })}
                            {item.label}
                        </MuiLink>
                    );
                } else {
                    return (
                        <Typography
                        color={isLastItem ? "text.primary" : "text.secondary"}
                        key={`breadcrumb-${item.label}-${index}`}
                        sx={{ display: 'flex', alignItems: 'center', fontWeight: isLastItem ? 500 : 'inherit' }}
                        >
                            {item.icon && React.cloneElement(item.icon, { sx: { mr: 0.5, fontSize: '1rem' } })}
                            {item.label}
                        </Typography>
                    );
                }
            })}
        </MuiBreadcrumbs>
    );
};

export default BreadcrumbsComponent;
