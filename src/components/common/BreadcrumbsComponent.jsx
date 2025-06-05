import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BreadcrumbItem from './BreadcrumbItem';

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
                return (
                    <BreadcrumbItem
                        key={`breadcrumb-${item.label}-${index}`}
                        label={item.label}
                        to={!isLastItem ? item.to : undefined}
                        icon={item.icon}
                        isLastItem={isLastItem}
                    />
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default BreadcrumbsComponent;
