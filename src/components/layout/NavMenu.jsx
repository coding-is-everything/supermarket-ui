import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List, ListItemText, Collapse, Box, Typography, alpha, ListItemButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavItem from '../common/NavItem';

const NavMenuItem = ({ item, level = 0 }) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const hasChildren = item.children && item.children.length > 0;

    const isActive = (path) => location.pathname.startsWith(path);
    const isCurrentOrChildActive = item.path ? isActive(item.path) : false || (hasChildren && item.children.some(child => child.path && isActive(child.path)));

    React.useEffect(() => {
        if (hasChildren && item.children.some(child => child.path && isActive(child.path))) {
            setOpen(true);
        }
    }, [location.pathname, hasChildren, item.children, isActive]);

    const handleClick = () => {
        if (hasChildren) {
            setOpen(!open);
        }

        if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <>
            <NavItem
                text={item.text}
                icon={item.icon}
                path={!hasChildren ? item.path : undefined}
                onClick={handleClick}
                selected={item.path ? isActive(item.path) : isCurrentOrChildActive && hasChildren}
                sx={{
                    pl: 2 + (level * 2),
                    py: 1.25,
                    '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.04),
                    },
                    ...(hasChildren && {
                        '&:hover': {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        },
                    }),
                }}
                listItemTextProps={{
                    variant: 'body2',
                    fontWeight: item.path && isActive(item.path) ? 500 : 400,
                }}
                endIcon={hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            />
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((childItem, index) => (
                            <NavMenuItem key={`${childItem.text}-${index}`} item={childItem} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
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
