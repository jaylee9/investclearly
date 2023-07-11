import { Box, Grid, Typography } from '@mui/material';
import { blueTitleStyles, useNewDealsBlockStyles, viewAllLink } from './styles';
import DealCard from '@/components/common/DealCard';
import Link from 'next/link';

const mockData = [
  {
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
  },
  {
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
  },
  {
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
  },
  {
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
  },
];

const NewDealsBlock = () => {
  const classes = useNewDealsBlockStyles();
  return (
    <Box sx={classes.root}>
      <Typography variant="caption" sx={blueTitleStyles}>
        NEW DEALS
      </Typography>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        View Active Deals
      </Typography>
      <Box sx={classes.dealCardsWrapper}>
        {mockData.map((deal, index) => (
          <Grid item xs={3} key={index}>
            <DealCard image={deal.image}>
              <Box sx={classes.dealCardContent}>
                <Typography variant="h5" sx={classes.dealName}>
                  {deal.name}
                </Typography>
                <Typography variant="body1" sx={classes.dealLocation}>
                  {deal.location}
                </Typography>
                <Typography
                  variant="body1"
                  sx={classes.dealDetail}
                  marginBottom="10px"
                >
                  <i className="icon-Status"></i> {deal.status}
                </Typography>
                <Typography variant="body1" sx={classes.dealDetail}>
                  <i className="icon-Investment"></i> {deal.cost}% IRR
                </Typography>
              </Box>
            </DealCard>
          </Grid>
        ))}
      </Box>
      <Link href="/deals">
        <Typography variant="body1" sx={viewAllLink}>
          View all deals
        </Typography>
      </Link>
    </Box>
  );
};

export default NewDealsBlock;
