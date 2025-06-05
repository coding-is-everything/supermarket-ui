import React from 'react';
import { Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbItem = ({ label, to, icon, isLastItem = false, sx }) => {
    const commonSx = {
        display: 'flex',
        alignItems: 'center',
        ...sx,
    };

    const iconElement = icon ? React.cloneElement(icon, {
        sx: {
            mr: 0.5,
            fontSize: '1rem',
            ...(icon.props.sx || {}),
        },
    }) : null;

    if (to && !isLastItem) {
        return (
            <MuiLink
            component={RouterLink}
            to={to}
            underline="hover"
            color="inherit"
            sx={commonSx}
            >
                {iconElement}
                {label}
            </MuiLink>
        );
    } else {
        return (
            <Typography
            color={isLastItem ? "text.primary" : "text.secondary"}
            sx={{ ...commonSx, fontWeight: isLastItem ? 500 : 'inherit' }}
            >
                {iconElement}
                {label}
            </Typography>
        );
    }
};

export default BreadcrumbItem;