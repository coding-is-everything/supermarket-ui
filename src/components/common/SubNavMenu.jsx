import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Typography, // If parentItem.text needs specific styling
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavItem from './NavItem'; // Assuming NavItem.jsx is in the same common folder

/**
 * SubNavMenu Component
 * A collapsible menu for nested navigation items, typically used within a Sidebar or NavMenu.
 * It displays a parent item and a list of child NavItems that can be expanded or collapsed.
 *
 * @param {object} props - The component's props.
 * @param {object} props.parentItem - The parent navigation item object.
 * Should contain: { text: string, icon?: React.ReactNode, path?: string (optional, if parent itself is a link) }
 * @param {Array<object>} props.childrenItems - Array of child navigation item objects.
 * Each child: { text: string, icon?: React.ReactNode, path: string }
 * @param {number} [props.level=0] - The nesting level, used for indentation.
 * @param {boolean} [props.initiallyOpen=false] - Whether the submenu should be open by default.
 * @param {object} [props.sx] - Optional MUI sx prop for additional custom styling on the parent ListItemButton.
 */
const SubNavMenu = ({ parentItem, childrenItems, level = 0, initiallyOpen = false, sx }) => {
  const location = useLocation();
  const [open, setOpen] = useState(initiallyOpen);

  // Determine if any child item is currently active
  const isAnyChildActive = childrenItems.some(child => child.path && location.pathname.startsWith(child.path));

  // Effect to open the submenu if a child route is active on page load or route change
  useEffect(() => {
    if (isAnyChildActive) {
      setOpen(true);
    } else if (!initiallyOpen) { // If not initially set to open and no child is active, ensure it's closed
        // setOpen(false); // This might cause it to close if user navigates away from child then back to parent
    }
  }, [location.pathname, isAnyChildActive, initiallyOpen]);

  const handleClick = () => {
    setOpen(!open);
    if (parentItem.onClick) {
      parentItem.onClick();
    }
  };

  const parentItemStyle = {
    pl: 2 + (level * 2), // Indentation for the parent item itself
    py: 1.25,
    borderRadius: (theme) => theme.shape.borderRadius,
    mb: 0.5,
    ...(isAnyChildActive && !open && { // Style parent differently if a child is active but menu is closed (optional)
        // e.g. a subtle indicator
    }),
    ...(open && { // Style for when the submenu is open (optional, could be just the icon change)
        // backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.02),
    }),
    '&:hover': {
        backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.04),
    },
    ...sx,
  };

  // Parent item is active if its own path matches or if any child is active
  const isParentEffectivelyActive = (parentItem.path && location.pathname.startsWith(parentItem.path)) || isAnyChildActive;


  return (
    <>
      <ListItemButton
        onClick={handleClick}
        // selected={isParentEffectivelyActive} // Highlight parent if its path matches or a child is active
        sx={{
            ...parentItemStyle,
            ...(isParentEffectivelyActive && { // Styles for active/selected state for parent
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
              },
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'primary.main',
                fontWeight: 500,
              },
            }),
        }}
      >
        {parentItem.icon && (
          <ListItemIcon sx={{ minWidth: '40px', color: isParentEffectivelyActive ? 'primary.main' : 'inherit' }}>
            {parentItem.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={parentItem.text}
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: isParentEffectivelyActive ? 500 : 400,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {childrenItems.map((childItem, index) => (
            // Use the NavItem component for children
            <NavItem
              key={`${childItem.text}-${index}-${level}`}
              text={childItem.text}
              icon={childItem.icon}
              path={childItem.path}
              sx={{ pl: 2 + ((level + 1) * 2) }} // Further indent children
              // selected prop for NavItem is handled internally by NavItem based on its path
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SubNavMenu;