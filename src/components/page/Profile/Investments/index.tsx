import { getAllInvestments } from '@/actions/investments';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import CustomTabs from '@/components/common/CustomTabs';
import Loading from '@/components/common/Loading';
import { Box, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useInvestmentsStyles } from './styles';
import { InvestmentStatuses } from '@/backend/constants/enums/investment-statuses';

const tabs = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

const ProfileInvestments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };

  const classes = useInvestmentsStyles();
  const [page] = useState(1);
  const { data, isLoading } = useQuery(
    ['allInvestments', activeTab],
    () =>
      getAllInvestments({
        page,
        pageSize: 10,
        orderDirection: OrderDirectionConstants.DESC,
        status:
          activeTab === 'all' ? undefined : (activeTab as InvestmentStatuses),
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Box>
      <CustomTabs tabs={tabs} onChange={handleChangeTab} value={activeTab} />
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
    </Box>
  );
};

export default ProfileInvestments;
