import React from 'react';
import { Tab as MuiTab } from '@mui/material';
import PropTypes from 'prop-types';

const TabButton = ({
    label,
    icon,
    iconPosition = "start",
    disabled = false,
    sx,
    id,
    ariaControls,
    ...other
}) => {
    return (
        <MuiTab
        label={label}
        icon={icon}
        iconPosition={icon && label ? iconPosition : undefined}
        disabled={disabled}
        sx={sx}
        id={id}
        aria-controls={ariaControls}
        {...other}
    />
    );
};

TabButton.PropTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
    disabled: PropTypes.bool,
    sx: PropTypes.object,
    id: PropTypes.string.isRequired,
    ariaControls: PropTypes.string.isRequired,
};

export default TabButton;