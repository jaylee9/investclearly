import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { blueTitleStyles, useDealsBlockStyles } from './styles';

const AssetClasses = [
  { name: 'Build-to-Rent', href: '#' },
  { name: 'Co-Living', href: '#' },
  { name: 'Data Center', href: '#' },
  { name: 'Flex R&D', href: '#' },
  { name: 'Flex/Office', href: '#' },
  { name: 'Hospitality', href: '#' },
  { name: 'Industrial', href: '#' },
  { name: 'Land Manufactured Housing', href: '#' },
  { name: 'Medical Office', href: '#' },
  { name: 'Mixed Use', href: '#' },
  { name: 'Multi-Asset', href: '#' },
  { name: 'Multifamily', href: '#' },
  { name: 'Office', href: '#' },
  { name: 'Parking Garage', href: '#' },
  { name: 'Retail', href: '#' },
  { name: 'Senior Housing', href: '#' },
  { name: 'Single Family', href: '#' },
  { name: 'Specialty', href: '#' },
  { name: 'Storage', href: '#' },
];

const Regions = [
  { name: 'Midwest', href: '#' },
  { name: 'Northwest', href: '#' },
  { name: 'Northeast', href: '#' },
  { name: 'Southeast', href: '#' },
  { name: 'Southwest', href: '#' },
];

const DealsBlock = () => {
  const classes = useDealsBlockStyles();
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
            {AssetClasses.map((asset, index) => (
              <Link href={asset.href} key={index}>
                <Typography variant="body1">
                  {asset.name}
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
            {Regions.map((region, index) => (
              <Link href={region.href} key={index}>
                <Typography variant="body1">
                  {region.name}
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
