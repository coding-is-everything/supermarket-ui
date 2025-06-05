import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box, AppBar, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TabPanel from './TabPanel';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsComponent = ({
    tabs,
    initialTab = 0,
    variant = "standard",
    centered = false,
    indicatorColor = "primary",
    textColor = "primary",
    tabsContainerSx,
    tabPanelContainerSx,
    tabPanelVariant = 'elevation',
    tabPanelElevation = 1,
}) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (!tabs || tabs.length === 0) {
        return <Typography sx={{ p: 2 }}>No tabs to display.</Typography>;
    }

    const tabPanelWrapperSx = tabPanelVariant === 'string' ? {} : {
        mt: 0,
        borderTopLeftRedius: 0,
        borderTopRightRadius: 0,
    };

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper', ...tabsContainerSx }}>
                <MuiTabs
                    value={activeTab}
                    onChange={handleChange}
                    variant={variant}
                    centered={centered}
                    indicatorColor={typeof indicatorColor === 'string' ? indicatorColor : undefined}
                    textColor={typeof textColor === 'string' ? textColor : undefined}
                    sx={{
                        ...(typeof indicatorColor === 'object' && { '& .MuiTabs-indicator': indicatorColor }),
                        ...(typeof textColor === 'object' && { '& .MuiTab-root': { color: textColor.main } }), // Example for object-based text color
                    }}
                    aria-label="dynamic tabs example"
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition={tab.icon ? "start" : undefined}
                            disabled={tab.disabled || false}
                            {...a11yProps(index)}
                        />
                    ))}
                </MuiTabs>
            </AppBar>
            <Box sx={tabPanelContainerSx}>
                {tabs.map((tab, index) => (
                    <TabPanel
                        key={index}
                        value={activeTab}
                        index={index}
                        // Apply Paper styling only if not 'string' variant
                        sx={tabPanelVariant !== 'string' ? tabPanelWrapperSx : { p: 0 }} // No padding if no paper
                    >
                        {tabPanelVariant !== 'string' ? (
                            <Paper elevation={tabPanelVariant === 'outlined' ? 0 : tabPanelElevation} variant={tabPanelVariant === 'outlined' ? 'outlined' : 'elevation'} sx={{ p: 3, ...tabPanelWrapperSx, borderTop: 'none' }}>
                                {tab.content}
                            </Paper>
                        ) : (
                            tab.content // Render content directly if no paper
                        )}
                    </TabPanel>
                ))}
            </Box>
        </Box>
    );
};

TabsComponent.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired,
        icon: PropTypes.element,
        disabled: PropTypes.bool,
    })).isRequired,
    initialTab: PropTypes.number,
    variant: PropTypes.oneOf(['standard', 'scrollable', 'fullWidth']),
    centered: PropTypes.bool,
    indicatorColor: PropTypes.oneOfType([
        PropTypes.oneOf(['primary', 'secondary']),
        PropTypes.object,
    ]),
    textColor: PropTypes.oneOfType([
        PropTypes.oneOf(['primary', 'secondary']),
        PropTypes.object,
    ]),
    tabsContainerSx: PropTypes.object,
    tabPanelContainerSx: PropTypes.object,
    tabPanelVariant: PropTypes.oneOf(['elevation', 'outlined', 'string']),
    tabPanelElevation: PropTypes.number,
};

export default TabsComponent;
