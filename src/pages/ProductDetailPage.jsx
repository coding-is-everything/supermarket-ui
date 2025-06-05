import React from 'react';
import { Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TabsComponent from '../components/common/TabsComponent';
import PageWrapper from '../components/layout/PageWrapper';

const ProductDetailPage = () => {
  const productTabs = [
    {
      label: 'Overview',
      icon: <InfoIcon />,
      content: (
        <Box>
          <Typography variant="h6">Product Overview</Typography>
          <Typography>Detailed description of the product goes here. Highlighting key features and benefits.</Typography>
        </Box>
      ),
    },
    {
      label: 'Pricing & Stock',
      icon: <AttachMoneyIcon />,
      content: (
        <Box>
          <Typography variant="h6">Pricing Details</Typography>
          <Typography>Price: $19.99</Typography>
          <Typography>Stock: 150 units</Typography>
          <Typography>SKU: P-00123</Typography>
        </Box>
      ),
    },
    {
      label: 'Advanced Settings',
      icon: <SettingsIcon />,
      disabled: false, // Example: can be true to disable a tab
      content: (
        <Box>
          <Typography variant="h6">Advanced Configuration</Typography>
          <Typography>Settings related to variants, shipping, taxes, etc.</Typography>
        </Box>
      ),
    },
    {
      label: 'Reviews',
      content: ( // Example without icon
        <Box>
          <Typography variant="h6">Customer Reviews</Typography>
          <Typography>No reviews yet for this product.</Typography>
        </Box>
      ),
    },
  ];

  return (
    <PageWrapper title="Product Details">
      <TabsComponent
        tabs={productTabs}
        initialTab={0}
        // variant="fullWidth" // Uncomment to make tabs take up full width
        // centered // Uncomment to center the tabs if not scrollable
        tabPanelVariant="string" // No Paper around tab content, padding handled by TabPanel's default
      />
    </PageWrapper>
  );
};

export default ProductDetailPage;
