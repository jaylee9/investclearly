import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import useAdminSponsorsStyles from '@/pages_styles/adminSponsorsStyles';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CustomTable, { Column } from '@/components/common/Table';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import EllipsisText from '@/components/common/EllipsisText';
import Link from 'next/link';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { GetAllSponsorsResponse, getAllSponsors } from '@/actions/sponsors';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import AddEditSponsorModal from '@/components/page/Admin/Sponsor/AddEditSponsorModal';
import withAdminPrivateRoute from '@/HOC/withAdminPrivateRoute';

interface AdminSponsorsPageProps {
  sponsorsResponse: GetAllSponsorsResponse;
}

const SponsorsPage = ({ sponsorsResponse }: AdminSponsorsPageProps) => {
  const classes = useAdminSponsorsStyles();

  const [openModal, setOpenModal] = useState<null | 'add' | SponsorInterface>(
    null
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

  const { data, refetch } = useQuery<GetAllSponsorsResponse>(
    ['sponsors', page, searchTerm],
    () =>
      getAllSponsors({
        page,
        pageSize: 10,
        search: searchTerm,
      }) as Promise<GetAllSponsorsResponse>,
    {
      initialData: sponsorsResponse,
      keepPreviousData: true,
    }
  );

  const activelyRisingStyles = (activelyRising: boolean) =>
    clsx({
      activelyRising: activelyRising,
      notActivelyRising: !activelyRising,
    });

  const columns: Column<SponsorInterface>[] = [
    {
      label: 'Sponsor',
      accessor: data => (
        <Box sx={classes.sponsorMainInfo}>
          <PlaceholderImage
            src={data.businessAvatar as string}
            defaultImage={DEFAULT_SPONSOR_IMAGE}
            width={32}
            height={32}
            alt="sponsor image"
            style={{ ...classes.sponsorImage, objectFit: 'cover' }}
          />
          <Box>
            <Link
              style={{ width: 'fit-content' }}
              href={`/sponsors/${data.id}`}
            >
              <EllipsisText
                variant="body1"
                fontWeight={500}
                text={data?.vanityName as string}
                sx={classes.ellipsisText}
              />
            </Link>
            {!!data.locations.length && (
              <Typography variant="caption" sx={classes.subTitle}>
                {data.locations[0]?.street1}
              </Typography>
            )}
          </Box>
        </Box>
      ),
      width: '25%',
    },
    {
      label: 'Year Founded',
      accessor: data => (
        <Typography variant="body1">
          {data?.yearOfFoundation || 'N/A'}
        </Typography>
      ),
      width: '10%',
    },
    {
      label: 'State or Country',
      accessor: data => (
        <EllipsisText
          variant="body1"
          text={
            !!data?.locations?.length
              ? data?.locations?.[0]?.stateOrCountryDescription
              : 'N/A'
          }
          sx={classes.ellipsisText}
        />
      ),
      width: '20%',
    },
    {
      label: 'Average IRR',
      accessor: data => (
        <Typography variant="body1">{data.averageIRR || 0}%</Typography>
      ),
      width: '9%',
      align: 'right',
    },
    {
      label: 'Deals',
      key: 'dealsCount',
      width: '8%',
    },
    {
      label: 'Actively Raising',
      accessor: data => (
        <Box sx={classes.activelyRisingWrapper}>
          <Typography
            variant="body1"
            fontWeight={500}
            className={activelyRisingStyles(data.activelyRising)}
          >
            {data.activelyRising ? 'Yes' : 'No'}
          </Typography>
        </Box>
      ),
      width: '25%',
    },
  ];

  const actions = [
    {
      icon: 'icon-Edit',
      //will be replaced by logic of open edit sponsor modal
      onClick: (data: SponsorInterface) => handleOpenModal(data),
      styles: classes.editIcon,
    },
  ];

  const handleOpenModal = (modalType: 'add' | SponsorInterface) =>
    setOpenModal(modalType);

  const handleCloseModal = () => setOpenModal(null);

  const isSponsorInterface = openModal !== null && openModal !== 'add';

  return (
    <Layout variant={LayoutVariant.Admin}>
      <Typography variant="h3" sx={classes.title}>
        Sponsors
      </Typography>
      {sponsorsResponse?.sponsors?.length ? (
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
            <Button onClick={() => handleOpenModal('add')}>Add Sponsor</Button>
          </Box>
          <CustomTable<SponsorInterface>
            data={(data?.sponsors as SponsorInterface[]) || []}
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
        <Box sx={classes.noSponsorsContent}>
          <Typography variant="h4">
            There are no published Sponsors yet
          </Typography>
          <Button onClick={() => handleOpenModal('add')}>Add Sponsor</Button>
        </Box>
      )}
      <AddEditSponsorModal
        open={!!openModal}
        onClose={handleCloseModal}
        sponsor={isSponsorInterface ? openModal : undefined}
        isEdit={isSponsorInterface}
        refetchSponsors={refetch}
      />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const sponsorsResponse = await getAllSponsors({
    page: 1,
    pageSize: 10,
  });

  if ('error' in sponsorsResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      sponsorsResponse,
    },
  };
};

export default withAdminPrivateRoute(SponsorsPage);
