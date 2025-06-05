import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TabPanel = (props) => {
    const { children, value, index, sx, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, ...sx }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    sx: PropTypes.object,
};

export default TabPanel;