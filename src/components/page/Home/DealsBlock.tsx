import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { blueTitleStyles, useDealsBlockStyles } from './styles';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useState } from 'react';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import escapeStringForHttpParams from '@/helpers/escapeStringForHttpParams';
import CustomAccordion from '@/components/common/Accordion';
import { Add, Remove } from '@mui/icons-material';

interface DealsBlockProps {
  locations: string[];
}

const DealsBlock = ({ locations }: DealsBlockProps) => {
  const [regionExpanded, setRegionExpanded] = useState(false);
  const [assetClassExpanded, setAssetClassExpanded] = useState(false);
  const classes = useDealsBlockStyles();
  const { isMobile, isDesktop, isTablet } = useBreakpoints();
  const spacingSize = isDesktop ? 24 : 3;
  const regionLabel = 'State';
  const assetClassLabel = 'Asset Class';

  const regionArray = locations?.map(value => {
    const linkValue = escapeStringForHttpParams(value);
    const href = `/list?type=deals&regions=${linkValue}`;
    return {
      value,
      href,
    };
  });

  const assetClassesArray = [
    ...Object.keys(AssetClasses).map(key => {
      const value = AssetClasses[key as keyof typeof AssetClasses];
      const linkValue = escapeStringForHttpParams(value);
      const href = `/list?type=deals&asset_class=${linkValue}`;
      return { value, href };
    }),
  ].slice(0, 33);

  return (
    <Box sx={classes.root}>
      <Typography variant="caption" sx={blueTitleStyles}>
        DEALS
      </Typography>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        Search Deals and Sponsors by Asset Class
      </Typography>
      {isMobile ? (
        <>
          <CustomAccordion
            label={regionLabel}
            expandIcon={regionExpanded ? <Remove /> : <Add />}
            variant="secondary"
            onChange={(_, expanded) => setRegionExpanded(expanded)}
          >
            {regionArray.map(region => (
              <Link href={region.href} key={region.value}>
                <Typography variant="body1">
                  {region.value}
                  <i className="icon-Caret-right"></i>
                </Typography>
              </Link>
            ))}
          </CustomAccordion>
          <CustomAccordion
            label={assetClassLabel}
            expandIcon={assetClassExpanded ? <Remove /> : <Add />}
            variant="secondary"
            onChange={(_, expanded) => setAssetClassExpanded(expanded)}
          >
            {assetClassesArray.map(asset => (
              <Link href={asset.href} key={asset.value}>
                <Typography variant="body1">
                  {asset.value}
                  <i className="icon-Caret-right"></i>
                </Typography>
              </Link>
            ))}
          </CustomAccordion>
        </>
      ) : (
        <Box sx={classes.gridContainerStyles}>
          <Grid
            container
            spacing={spacingSize}
            direction={isDesktop ? 'row' : 'column'}
            sx={classes.gridContentStyles}
          >
            <Grid item xs={isTablet ? 6 : 8}>
              <Typography
                variant="body1"
                sx={blueTitleStyles}
                marginBottom="12px"
              >
                {assetClassLabel}
              </Typography>
              <Box sx={classes.list}>
                {assetClassesArray.map(asset => (
                  <Link href={asset.href} key={asset.value}>
                    <Typography variant="body1" sx={classes.link}>
                      {asset.value}
                      <i className="icon-Caret-right"></i>
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
            <Grid item xs={isTablet ? 6 : 4}>
              <Typography
                variant="body1"
                sx={blueTitleStyles}
                marginBottom="12px"
              >
                {regionLabel}
              </Typography>
              <Box sx={classes.list}>
                {regionArray.map(region => (
                  <Link href={region.href} key={region.value}>
                    <Typography variant="body1" sx={classes.link}>
                      {region.value}
                      <i className="icon-Caret-right"></i>
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default DealsBlock;
