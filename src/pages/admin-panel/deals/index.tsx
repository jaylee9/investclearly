import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import useAdminDealsStyles from '@/pages_styles/adminDealsStyles';
import Input from '@/components/common/Input';
import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';
import CustomTable, { Column } from '@/components/common/Table';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_DEAL_IMAGE } from '@/config/constants';
import EllipsisText from '@/components/common/EllipsisText';
import Link from 'next/link';
import { DealStatuses } from '@/backend/constants/enums/deal-statuses';
import clsx from 'clsx';
import { debounce } from 'lodash';
import withAdminPrivateRoute from '@/HOC/withAdminPrivateRoute';
import EditDealModal from '@/components/page/Admin/Deal/EditDealModal';
import Loading from '@/components/common/Loading';
import { format } from 'date-fns';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import CustomTabs from '@/components/common/CustomTabs';

interface AdminDealsPageProps {
  dealsResponse: GetAllDealsResponse;
}

const sortOptions = [
  { label: 'Newest Deals', value: 'DESC' },
  { label: 'Oldest Deals', value: 'ASC' },
];

const DealsPage = ({ dealsResponse }: AdminDealsPageProps) => {
  const classes = useAdminDealsStyles();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [choosedDeal, setChoosedDeal] = useState<DealInterface | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDirection, setOrderDirection] = useState<'DESC' | 'ASC'>('DESC');
  const [activeTab, setActiveTab] = useState('published');

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setPage(1);
    setSearchTerm('');
  };
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleChangeSelect = (e: SelectChangeEvent<unknown>) => {
    setOrderDirection(e.target.value as 'DESC' | 'ASC');
    setPage(1);
  };

  const { data, isLoading, refetch } = useQuery<GetAllDealsResponse>(
    ['deals', page, searchTerm, activeTab, orderDirection],
    () =>
      getAllDeals({
        page,
        pageSize: 10,
        search: searchTerm,
        orderDirection,
        isDealPublished: activeTab === 'published',
      }) as Promise<GetAllDealsResponse>,
    {
      initialData: dealsResponse,
      keepPreviousData: true,
    }
  );

  const statusStyles = (status: DealStatuses) =>
    clsx({
      open: status === DealStatuses.active,
      closed: status === DealStatuses.closed,
    });

  const columns: Column<DealInterface>[] = [
    {
      label: 'Deal',
      accessor: data => (
        <Box sx={classes.dealMainInfo}>
          <PlaceholderImage
            src={data.attachments?.[0]?.path}
            defaultImage={DEFAULT_DEAL_IMAGE}
            width={32}
            height={32}
            alt="deal image"
            style={{ ...classes.dealImage, objectFit: 'cover' }}
          />
          <Box>
            <Link style={{ width: 'fit-content' }} href={`/deals/${data.id}`}>
              <EllipsisText
                variant="body1"
                fontWeight={500}
                text={data?.vanityName as string}
                sx={classes.ellipsisText}
              />
            </Link>
            <Typography variant="caption" sx={classes.subTitle}>
              {data.dealAddress}
            </Typography>
          </Box>
        </Box>
      ),
      width: '23%',
    },
    {
      label: 'Sponsor',
      accessor: data => (
        <EllipsisText
          variant="body1"
          text={(data?.sponsor?.vanityName || 'N/A') as string}
          sx={classes.ellipsisText}
        />
      ),
      width: '17%',
    },
    {
      label: 'Asset Class',
      accessor: data => (
        <EllipsisText
          variant="body1"
          text={data.assetClass as string}
          sx={classes.ellipsisText}
        />
      ),
      width: '15%',
    },
    {
      label: 'Target IRR',
      accessor: data => (
        <Typography variant="body1">{data.targetIRR}%</Typography>
      ),
      width: '8%',
      align: 'right',
    },
    {
      label: 'Status',
      accessor: data => (
        <Box sx={classes.statusWrapper}>
          <Typography
            variant="body1"
            fontWeight={500}
            className={statusStyles(data.status as DealStatuses)}
          >
            {data.status}
          </Typography>
        </Box>
      ),
      width: '15%',
    },
    {
      label: 'Filled At',
      accessor: data => (
        <Typography variant="body1">
          {format(new Date(data.fileDate), 'MMMM d, yyyy')}
        </Typography>
      ),
      width: '10%',
    },
  ];

  const handleOpenEditModal = (data: DealInterface) => {
    setChoosedDeal(data);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setChoosedDeal(undefined);
    setOpenEditModal(false);
  };

  const actions = [
    {
      icon: 'icon-Edit',
      //will be replaced by logic of open edit deal modal
      onClick: (data: DealInterface) => handleOpenEditModal(data),
      styles: classes.editIcon,
    },
  ];

  const tabs = [
    {
      value: 'published',
      label: 'Published',
    },
    {
      value: 'unpublished',
      label: 'Unpublished',
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  console.log(dealsResponse);

  return (
    <Layout variant={LayoutVariant.Admin}>
      <Typography variant="h3" sx={classes.title}>
        Deals
      </Typography>
      <CustomTabs value={activeTab} onChange={handleChangeTab} tabs={tabs} />
      {!!dealsResponse?.deals?.length || !!data?.deals?.length ? (
        <Box>
          <Box sx={classes.header}>
            <Input
              isSearch
              isFilledWhite
              placeholder="Search"
              variant="filled"
              customStyles={classes.searchInput}
              onChange={e => handleSearch(e.target.value)}
              onClear={handleClearSearch}
            />
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1" noWrap>
                Sort by:
              </Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  variant={SelectVariant.Dark}
                  onChange={handleChangeSelect}
                  value={orderDirection}
                />
              </Box>
            </Box>
          </Box>
          <CustomTable<DealInterface>
            data={data?.deals as DealInterface[]}
            page={page}
            setPage={setPage}
            total={Number(data?.total)}
            lastPage={Number(data?.lastPage)}
            columns={columns}
            actions={actions}
            pageSize={10}
          />
        </Box>
      ) : (
        <Box sx={classes.noDealsContent}>
          <Typography variant="h4">
            There are no {activeTab} Deals yet
          </Typography>
        </Box>
      )}
      <EditDealModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        deal={choosedDeal as DealInterface}
        refetch={refetch}
      />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const dealsResponse = await getAllDeals({
    page: 1,
    pageSize: 10,
  });

  if ('error' in dealsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      dealsResponse: dealsResponse,
    },
  };
};

export default withAdminPrivateRoute(DealsPage);
