import CustomAccordion from '@/components/common/Accordion';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealsPageStyles from '@/pages_styles/dealsStyles';
import { IDeal } from '@/types/deal';
import { Box, Typography } from '@mui/material';

const mockData: IDeal[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: true,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
];

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Investment', value: 'investment' },
];

const Deals = () => {
  const classes = useDealsPageStyles();
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.leftColumn}>
          <CustomAccordion label="Test">123</CustomAccordion>
        </Box>
        <Box sx={classes.rightColumn}>
          <Box sx={classes.rightColumnHeader}>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>{mockData.length} Deals</span>{' '}
              found for Invest
            </Typography>
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1">Sort by:</Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  placeholder="Search"
                  variant={SelectVariant.Dark}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={classes.dealsWrapper}>
            {mockData.map(deal => (
              <DealCard
                key={deal.id}
                deal={deal}
                variant={DealCardVariant.Large}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Deals;
