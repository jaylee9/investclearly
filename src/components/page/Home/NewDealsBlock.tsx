import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import type { FC } from 'react';
import DealCard from '@/components/common/DealCard';
import Button from '@/components/common/Button';
import { blueTitleStyles, useNewDealsBlockStyles } from './styles';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { useBreakpoints } from '@/hooks/useBreakpoints';

interface NewDealsBlockProps {
  deals: DealInterface[];
}

const NewDealsBlock: FC<NewDealsBlockProps> = ({ deals }) => {
  const classes = useNewDealsBlockStyles();
  const { isMobile, isTablet } = useBreakpoints();
  const dealsFiltered = isMobile ? deals.slice(0, 1) : deals;
  const gridSize = isMobile ? 12 : isTablet ? 6 : 3;

  return (
    <Box sx={classes.root}>
      <Typography variant="caption" sx={blueTitleStyles}>
        NEW DEALS
      </Typography>
      <Typography variant="h2" fontWeight={600} marginBottom="40px">
        View Active Deals
      </Typography>
      <Box sx={classes.dealCardsWrapper}>
        <Grid container spacing={2}>
          {dealsFiltered.map((deal, index) => (
            <Grid item xs={gridSize} key={index}>
              <DealCard deal={deal} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Link href="/list?type=deals">
        <Button variant="secondary">View all deals</Button>
      </Link>
    </Box>
  );
};

export default NewDealsBlock;
