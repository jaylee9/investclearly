import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { blueTitleStyles, useDealsBlockStyles } from './styles';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { FC, useState } from 'react';
import { Regions } from '@/backend/constants/enums/regions';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import escapeStringForHttpParams from '@/helpers/escapeStringForHttpParams';
import CustomAccordion from '@/components/common/Accordion';
import { Add, Remove } from '@mui/icons-material';

const DealsBlock: FC = () => {
  const [regionExpanded, setRegionExpanded] = useState(false);
  const [assetClassExpanded, setAssetClassExpanded] = useState(false);
  const classes = useDealsBlockStyles();
  const { isMobile, isDesktop } = useBreakpoints();
  const spacingSize = isDesktop ? 24 : 3;
  const regionLabel = 'Region';
  const assetClassLabel = 'Asset Class';

  const regionArray = Object.values(Regions).map(value => {
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
  ];

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
        <Grid
          container
          spacing={spacingSize}
          direction={isDesktop ? 'row' : 'column'}
        >
          <Grid item xs={6}>
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
                  <Typography variant="body1">
                    {asset.value}
                    <i className="icon-Caret-right"></i>
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
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
                  <Typography variant="body1">
                    {region.value}
                    <i className="icon-Caret-right"></i>
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DealsBlock;
