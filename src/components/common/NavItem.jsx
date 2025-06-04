// Suggested Folder Path: src/components/common/NavItem.jsx

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography, // For potentially different text styling
} from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * NavItem Component
 * An individual clickable navigation link, typically with an icon and label,
 * showing an active state and handling routing. Designed for general use
 * in sidebars, tabs, or other menu structures.
 *
 * @param {object} props - The component's props.
 * @param {string} props.text - The text label for the navigation item.
 * @param {React.ReactNode} [props.icon] - Optional icon to display before the text.
 * @param {string} [props.path] - The route path for navigation. If not provided, onClick should be used.
 * @param {function} [props.onClick] - Optional click handler function.
 * @param {boolean} [props.selected] - Optional prop to manually set the selected state. If not provided, it's derived from the current route.
 * @param {boolean} [props.disabled] - Optional prop to disable the item.
 * @param {object} [props.sx] - Optional MUI sx prop for additional custom styling.
 * @param {object} [props.listItemTextProps] - Optional props to pass to ListItemText's primaryTypographyProps.
 */
const NavItem = ({
  text,
  icon,
  path,
  onClick,
  selected,
  disabled,
  sx,
  listItemTextProps,
}) => {
  const location = useLocation();

  // Determine if the item is active based on the current path, if not manually overridden by `selected` prop
  const isActive = selected !== undefined ? selected : (path ? location.pathname.startsWith(path) : false);

  const handleItemClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
    // Navigation will be handled by RouterLink if path is provided
  };

  const itemStyle = {
    py: 1.25, // Default padding, adjust as needed
    px: 2,
    borderRadius: (theme) => theme.shape.borderRadius, // Consistent rounding
    mb: 0.5, // Small margin bottom for separation if in a list
    ...(isActive && { // Styles for active/selected state
      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
      '&:hover': {
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
      },
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'primary.main',
        fontWeight: 500,
      },
    }),
    ...(!isActive && { // Hover styles for non-active items
        '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.04),
        },
    }),
    ...(disabled && { // Styles for disabled state
        opacity: 0.5,
        pointerEvents: 'none',
    }),
    ...sx, // Spread any additional sx props
  };

  return (
    <ListItemButton
      component={path && !onClick ? RouterLink : 'div'} // Use RouterLink if path is provided and no specific onClick
      to={path}
      onClick={handleItemClick}
      selected={isActive}
      disabled={disabled}
      sx={itemStyle}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: '40px', color: isActive ? 'primary.main' : 'inherit' }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={text}
        primaryTypographyProps={{
            variant: 'body2',
            fontWeight: isActive ? 500 : 400,
            ...listItemTextProps
        }}
      />
    </ListItemButton>
  );
};

export default NavItem;