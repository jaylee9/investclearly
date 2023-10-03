import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import useAdminDealsStyles from '@/pages_styles/adminDealsStyles';
import Input from '@/components/common/Input';
import { GetAllDealsResponse, getAllDeals } from '@/actions/deals';
import { useState } from 'react';
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

interface AdminDealsPageProps {
  dealsResponse: GetAllDealsResponse;
}

const DealsPage = ({ dealsResponse }: AdminDealsPageProps) => {
  const classes = useAdminDealsStyles();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [choosedDeal, setChoosedDeal] = useState<DealInterface | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setPage(1);
    setSearchTerm('');
  };

  const { data, isLoading, refetch } = useQuery<GetAllDealsResponse>(
    ['deals', page, searchTerm],
    () =>
      getAllDeals({
        page,
        pageSize: 10,
        search: searchTerm,
      }) as Promise<GetAllDealsResponse>,
    {
      initialData: dealsResponse,
      keepPreviousData: true,
    }
  );

  const statusStyles = (status: DealStatuses) =>
    clsx({
      open: status === DealStatuses.open || status === DealStatuses.fullCycle,
      closed: status === DealStatuses.closedActive,
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
                text={data.dealLegalName as string}
                sx={classes.ellipsisText}
              />
            </Link>
            <Typography variant="caption" sx={classes.subTitle}>
              {data.dealAddress}
            </Typography>
          </Box>
        </Box>
      ),
      width: '25%',
    },
    {
      label: 'Sponsor',
      accessor: data => (
        <EllipsisText
          variant="body1"
          text={data?.sponsor?.legalName as string}
          sx={classes.ellipsisText}
        />
      ),
      width: '20%',
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
      width: '20%',
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
      width: '25%',
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout variant={LayoutVariant.Admin}>
      <Typography variant="h3" sx={classes.title}>
        Deals
      </Typography>
      {dealsResponse?.deals?.length ? (
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
          <Typography variant="h4">There are no published Deals yet</Typography>
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
