import { Box, Typography } from '@mui/material';
import { useAllInvestmentsStyles } from './styles';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {
  GetAllInvestmentsResponse,
  getAllInvestments,
} from '@/actions/investments';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import Loading from '@/components/common/Loading';

const AllInvestments = () => {
  const classes = useAllInvestmentsStyles();
  const [page] = useState(1);
  const { data, isLoading } = useQuery(
    ['allInvestments'],
    () =>
      getAllInvestments({
        page,
        pageSize: 10,
        orderDirection: OrderDirectionConstants.DESC,
      }),
    {
      keepPreviousData: true,
    }
  );
  return (
    <Box sx={classes.root}>
      {isLoading && <Loading />}
      {!isLoading && (
        <Box>
          <Box marginBottom="24px">
            <Typography variant="caption" sx={classes.title}>
              Total Invested
            </Typography>
            <Typography variant="h2" fontWeight={600}>
              ${data?.totalInvested}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllInvestments;
