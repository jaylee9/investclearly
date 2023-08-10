import { Box, Typography } from '@mui/material';
import { blueTitleStyles, useNewDealsBlockStyles, viewAllLink } from './styles';
import DealCard from '@/components/common/DealCard';
import Link from 'next/link';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';

interface NewDealsBlockProps {
  deals: DealInterface[];
}

const NewDealsBlock = ({ deals }: NewDealsBlockProps) => {
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
        {deals.map((deal, index) => (
          <Box key={index} sx={{ width: 'calc(100%/4)', height: '332px' }}>
            <DealCard deal={deal} />
          </Box>
        ))}
      </Box>
      <Link href="/list?type=deals">
        <Typography variant="body1" sx={viewAllLink}>
          View all deals
        </Typography>
      </Link>
    </Box>
  );
};

export default NewDealsBlock;
