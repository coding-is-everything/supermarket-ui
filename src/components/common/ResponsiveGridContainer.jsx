import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

const ResponsiveGridContainer = ({
    children,
    spacing = 2,
    xs = 12,
    sm = 6,
    md = 4,
    lg = 3,
    xl = 3,
    containerSx,
    itemSx,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
}) => {
    return (
        <Grid
            container
            spacing={spacing}
            direction={direction}
            justifyContent={justifyContent}
            alignItems={alignItems}
            sx={containerSx}
        >
            {React.Children.map(children, (child, index) =>
                child ? (
                    <Grid
                        item
                        xs={xs}
                        sm={sm}
                        md={md}
                        lg={lg}
                        xl={xl}
                        key={child.key || `grid-item-${index}`}
                        sx={itemSx}
                    >
                        {child}
                    </Grid>
                ) : null
            )}
        </Grid>
    );
};

ResponsiveGridContainer.propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    md: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    containerSx: PropTypes.object,
    itemSx: PropTypes.object,
    direction: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
  };
  
  export default ResponsiveGridContainer;