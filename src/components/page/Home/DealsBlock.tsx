import { Box, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { blueTitleStyles, useDealsBlockStyles } from './styles';
import { REGIONS } from '@/config/constants';

const AssetClasses = [
  { id: 1, name: 'Build-to-Rent', href: '#' },
  { id: 2, name: 'Co-Living', href: '#' },
  { id: 3, name: 'Data Center', href: '#' },
  { id: 4, name: 'Flex R&D', href: '#' },
  { id: 5, name: 'Flex/Office', href: '#' },
  { id: 6, name: 'Hospitality', href: '#' },
  { id: 7, name: 'Industrial', href: '#' },
  { id: 8, name: 'Land Manufactured Housing', href: '#' },
  { id: 9, name: 'Medical Office', href: '#' },
  { id: 10, name: 'Mixed Use', href: '#' },
  { id: 11, name: 'Multi-Asset', href: '#' },
  { id: 12, name: 'Multifamily', href: '#' },
  { id: 13, name: 'Office', href: '#' },
  { id: 14, name: 'Parking Garage', href: '#' },
  { id: 15, name: 'Retail', href: '#' },
  { id: 16, name: 'Senior Housing', href: '#' },
  { id: 17, name: 'Single Family', href: '#' },
  { id: 18, name: 'Specialty', href: '#' },
  { id: 19, name: 'Storage', href: '#' },
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
            {AssetClasses.map(asset => (
              <Link href={asset.href} key={asset.id}>
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
            {REGIONS.map(region => (
              <Link href={region.href} key={region.value}>
                <Typography variant="body1">
                  {region.label}
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
