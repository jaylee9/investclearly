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
  const [investmentsData, setInvestmentsData] =
    useState<GetAllInvestmentsResponse>({
      deals: [],
      total: 0,
      totalInvested: 0,
      nextPage: 0,
      currentPage: page,
      prevPage: 0,
      lastPage: 0,
    });
  const { isLoading } = useQuery(
    ['allInvestments'],
    () =>
      getAllInvestments({
        page,
        pageSize: 10,
        orderDirection: OrderDirectionConstants.DESC,
      }),
    {
      onSuccess: data => {
        setInvestmentsData(data);
      },
      keepPreviousData: true,
    }
  );
  console.log(isLoading);
  return (
    <Box sx={classes.root}>
      {isLoading && <Loading />}
      {!isLoading && investmentsData && (
        <Box>
          <Box marginBottom="24px">
            <Typography variant="caption" sx={classes.title}>
              Total Invested
            </Typography>
            <Typography variant="h2" fontWeight={600}>
              ${investmentsData?.totalInvested}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllInvestments;
