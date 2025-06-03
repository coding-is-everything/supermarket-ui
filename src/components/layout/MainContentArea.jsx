import React from 'react';
import { Box } from '@mui/material';

const MainContentArea = ({ children, sx }) => {
    return (
        <Box
            sx={{
                p: 3,
                flexGrow: 1,
                overflowY: 'auto',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default MainContentArea;