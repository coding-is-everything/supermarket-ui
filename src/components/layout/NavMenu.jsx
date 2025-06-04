import React from 'react';
import { useLocation } from 'react-router-dom';
import { List, ListItemText, Box, Typography } from '@mui/material';
import NavItem from '../common/NavItem';
import SubNavMenu from '../common/SubNavMenu';

const NavMenuItem = ({ item, level = 0 }) => {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isActive = (path) => path && location.pathname.startsWith(path);
    
    // Check if any child is active
    const isAnyChildActive = hasChildren && 
        item.children.some(child => isActive(child.path));
    
    // Determine if the item should be initially open
    const initiallyOpen = isAnyChildActive;

    if (hasChildren) {
        return (
            <SubNavMenu
                parentItem={{
                    text: item.text,
                    icon: item.icon,
                    path: item.path,
                    onClick: item.onClick
                }}
                childrenItems={item.children}
                level={level}
                initiallyOpen={initiallyOpen}
                sx={{
                    pl: 2 + (level * 2),
                    py: 1.25,
                }}
            />
        );
    }


    return (
        <NavItem
            text={item.text}
            icon={item.icon}
            path={item.path}
            onClick={item.onClick}
            selected={isActive(item.path)}
            sx={{
                pl: 2 + (level * 2),
                py: 1.25,
            }}
            listItemTextProps={{
                variant: 'body2',
                fontWeight: isActive(item.path) ? 500 : 400,
            }}
        />
    );
};

/**
 * NavMenu Component
 * Container for navigation items, usually within the Sidebar.
 * Supports nested menus with expand/collapse animations.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.navItems - Array of navigation item objects.
 * Each item: { text: string, icon?: React.ReactNode, path?: string, children?: Array<object>, onClick?: function }
 */
const NavMenu = ({ navItems }) => {
    if (!navItems || navItems.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary">No navigation items.</Typography>
            </Box>
        );
    }

    return (
        <List component="nav" aria-labelledby="nested-list-subheader">
            {navItems.map((item, index) => {
                if (item.subheader) {
                    return (
                        <ListItemText
                            key={`subheader-${index}`}
                            primary={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        pl: 2,
                                        pt: 2,
                                        pb: 1,
                                        fontWeight: 'bold',
                                        color: 'text.secondary',
                                        textTransform: 'uppercase',
                                        display: 'block'
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            }
                        />
                    );
                }
                return <NavMenuItem key={`${item.text}-${index}`} item={item} />;
            })}
        </List>
    );
};

export default NavMenu;
