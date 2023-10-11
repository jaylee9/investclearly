import {
  GetAllInvestmentsResponse,
  getAllInvestments,
} from '@/actions/investments';
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
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { debounce } from 'lodash';
import EditDealModal, { DealToEdit } from './Modals/EditDeal';
import DeleteDealModal from './Modals/DeleteDeal';
import EllipsisText from '@/components/common/EllipsisText';
import { useBreakpoints } from '@/hooks/useBreakpoints';

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

enum ModalTypes {
  edit = 'edit',
  delete = 'delete',
}

const ProfileInvestments = () => {
  const { isDesktop } = useBreakpoints();

  const [activeTab, setActiveTab] = useState('all');
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setPage(1);
    setActiveTab(newValue as string);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const classes = useInvestmentsStyles();

  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery<GetAllInvestmentsResponse>(
    ['allInvestments', activeTab, page, searchTerm],
    () =>
      getAllInvestments({
        page,
        pageSize: 4,
        orderDirection: OrderDirectionConstants.DESC,
        status:
          activeTab === 'all' ? undefined : (activeTab as InvestmentStatuses),
        search: searchTerm,
      }) as Promise<GetAllInvestmentsResponse>,
    {
      keepPreviousData: true,
    }
  );

  const columns: Column<InvestmentInterface>[] = [
    {
      label: 'Deal',
      accessor: data => (
        <EllipsisText
          sx={classes.dealName}
          text={data?.deal?.vanityName as string}
        />
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

  const [openModals, setOpenModals] = useState({
    edit: false,
    delete: false,
    dealToEdit: { id: 0 },
  });
  const handleOpenModal = (type: ModalTypes, data: InvestmentInterface) => {
    setOpenModals(prevState => {
      return {
        ...prevState,
        dealToEdit: {
          id: data.id,
          totalInvested: data.totalInvested,
          dateOfInvestment: data.dateOfInvestment,
        },
        [type]: true,
      };
    });
  };
  const handleCloseModal = (type: ModalTypes) => {
    setOpenModals(prevState => {
      return { ...prevState, [type]: false };
    });
  };

  const onSubmitClose = (type: ModalTypes) => {
    refetch().then(() => handleCloseModal(type));
  };

  const actions = [
    {
      icon: 'icon-Edit',
      onClick: (data: InvestmentInterface) =>
        handleOpenModal(ModalTypes.edit, data),
      styles: classes.editIcon,
    },
    {
      icon: 'icon-Delete',
      onClick: (data: InvestmentInterface) =>
        handleOpenModal(ModalTypes.delete, data),
      styles: classes.deleteIcon,
    },
  ];

  return (
    <Box>
      <CustomTabs
        tabs={tabs}
        onChange={handleChangeTab}
        value={activeTab}
        isDivider={isDesktop}
        isSpacing
      />
      <Box sx={classes.root}>
        {isLoading && (
          <Box marginBottom="24px">
            <Loading />
          </Box>
        )}
        {!isLoading && (
          <Box marginBottom="16px">
            <Box sx={classes.totalInvest}>
              <Typography variant="caption" sx={classes.title}>
                Total Invested
              </Typography>
              <Typography variant="h2" sx={classes.totalInvested}>
                ${data?.totalInvested || 0}
              </Typography>
            </Box>
            {!data?.deals.length && !searchTerm ? (
              <Box sx={classes.noDeals}>
                <Typography variant="h5" sx={classes.noDealsTitle}>
                  Deals
                </Typography>
                <Typography variant="body1" sx={classes.noDealsSubTitle}>
                  You have no deals yet. You can add your deals here
                </Typography>
                <Link href="/list?type=deals">
                  <Button sxCustomStyles={classes.buttonSearchDeals}>
                    Search for deals
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box sx={classes.dealWrapper}>
                <Box sx={classes.tableWrapperHeader}>
                  <Typography variant="h5">Deals</Typography>
                  <Box sx={classes.searchWrapper}>
                    <Input
                      variant="filled"
                      isSearch
                      placeholder="Search my deals"
                      onChange={e => handleSearch(e.target.value)}
                      onClear={handleClearSearch}
                      sxCustomStyles={classes.input}
                      isFilledWhite
                    />
                    <Link href="/list?type=deals">
                      <Button sxCustomStyles={classes.buttonSearchDeals}>
                        Search for deals
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <CustomTable<InvestmentInterface>
                  data={data?.deals as InvestmentInterface[]}
                  columns={columns}
                  page={page}
                  total={Number(data?.total)}
                  lastPage={Number(data?.lastPage)}
                  setPage={setPage}
                  actions={actions}
                  pageSize={4}
                />
                <EditDealModal
                  open={openModals.edit}
                  onClose={() => handleCloseModal(ModalTypes.edit)}
                  onSubmitClose={() => onSubmitClose(ModalTypes.edit)}
                  dealToEdit={openModals.dealToEdit as DealToEdit}
                />
                <DeleteDealModal
                  open={openModals.delete}
                  onClose={() => handleCloseModal(ModalTypes.delete)}
                  onSubmitClose={() => onSubmitClose(ModalTypes.delete)}
                  id={openModals.dealToEdit.id}
                />
              </Box>
            )}
          </Box>
        )}
        <Box sx={classes.contactUsWrapper}>
          <Typography variant="body1" fontWeight={600}>
            Can’t find a deal? Contact us and we’ll resolve it!
          </Typography>
          <Link href="mailto:support@investclearly.io?subject=Can’t find a deal">
            <Button sxCustomStyles={classes.buttonContact}>Contact Us</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInvestments;
