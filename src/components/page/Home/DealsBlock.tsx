import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { blueTitleStyles, useDealsBlockStyles } from './styles';
import { Regions } from '@/backend/constants/enums/regions';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import escapeStringForHttpParams from '@/helpers/escapeStringForHttpParams';

const DealsBlock = () => {
  const classes = useDealsBlockStyles();
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
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Typography variant="body1" sx={blueTitleStyles} marginBottom="12px">
            Asset Class
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
          <Typography variant="body1" sx={blueTitleStyles} marginBottom="12px">
            Region
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
    </Box>
  );
};

export default DealsBlock;
