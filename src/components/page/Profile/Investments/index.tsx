import { getAllInvestments } from '@/actions/investments';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import CustomTabs from '@/components/common/CustomTabs';
import Loading from '@/components/common/Loading';
import { Box, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useInvestmentsStyles } from './styles';
import { InvestmentStatuses } from '@/backend/constants/enums/investment-statuses';
import CustomTable, { Column } from '@/components/common/Table';
import { InvestmentInterface } from '@/backend/services/investments/interfaces/investment.interface';
import { format } from 'date-fns';

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
        pageSize: 4,
        orderDirection: OrderDirectionConstants.DESC,
        status:
          activeTab === 'all' ? undefined : (activeTab as InvestmentStatuses),
      }),
    {
      keepPreviousData: true,
    }
  );

  const columns: Column<InvestmentInterface>[] = [
    {
      label: 'Deal',
      accessor: data => (
        <p style={{ ...classes.dealName, whiteSpace: 'nowrap' }}>
          {data.deal.dealLegalName}
        </p>
      ),
      width: '20%',
    },
    {
      label: 'Date of Investment',
      accessor: data =>
        `${format(new Date(data.dateOfInvestment), 'MM/dd/yyyy')}`,
      width: '16%',
    },
    {
      label: 'Hold period',
      accessor: data => `${data.deal.holdPeriod} years`,
      width: '16%',
    },
    {
      label: 'Invested',
      accessor: data => `$${data.totalInvested}`,
      width: '16%',
    },
    {
      label: 'Target IRR',
      accessor: data =>
        data.deal.targetIRR ? `${data.deal.targetIRR}%` : 'N/A',
      width: '16%',
    },
    {
      label: 'Actual IRR',
      accessor: data =>
        data.deal.actualIRR ? `${data.deal.actualIRR}%` : 'N/A',
      width: '16%',
    },
  ];

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
              <CustomTable<InvestmentInterface>
                data={data?.deals as InvestmentInterface[]}
                columns={columns}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileInvestments;
