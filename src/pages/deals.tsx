import { getAllDeals } from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import DealsFilters from '@/components/page/Deals/DealsFilters';
import BannerBlock from '@/components/page/Home/BannerBlock';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealsPageStyles from '@/pages_styles/dealsStyles';
import { Box, Typography } from '@mui/material';

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Investment', value: 'investment' },
];

interface DealsPageProps {
  deals: DealInterface[];
  total: number;
}

const Deals = ({ deals, total }: DealsPageProps) => {
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
          <DealsFilters />
        </Box>
        <Box sx={classes.rightColumn}>
          <Box sx={classes.rightColumnHeader}>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>{total} Deals</span> found for
              Invest
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
            {deals.map(deal => (
              <DealCard
                key={deal.id}
                deal={deal}
                variant={DealCardVariant.Large}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <BannerBlock
        title="Can’t find a deal? Let us know!"
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const dealsResponse = await getAllDeals({ page: 1, pageSize: 10 });
  if (!dealsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      deals: dealsResponse.deals,
      total: dealsResponse.total,
    },
  };
};

export default Deals;
