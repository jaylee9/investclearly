import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import useAdminReviewModerationStyles from '@/pages_styles/adminReviewModerationStyles';
import Input from '@/components/common/Input';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CustomTable, { Column } from '@/components/common/Table';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_DEAL_IMAGE, DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import EllipsisText from '@/components/common/EllipsisText';
import Link from 'next/link';
import { debounce } from 'lodash';
import { GetUserReviewsResponse, getUserReviews } from '@/actions/reviews';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { format } from 'date-fns';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import { ReviewStatuses } from '@/backend/constants/enums/review-statuses';
import CustomTabs from '@/components/common/CustomTabs';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';

const sortOptions = [
  { label: 'Newest Reviews', value: 'DESC' },
  { label: 'Oldest Reviews', value: 'ASC' },
];

type AllowedReviewStatuses = 'published' | 'on moderation';

const ReviewModerationPage = () => {
  const classes = useAdminReviewModerationStyles();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDirection, setOrderDirection] = useState<OrderDirectionConstants>(
    OrderDirectionConstants.DESC
  );
  const [activeTab, setActiveTab] = useState<AllowedReviewStatuses>(
    ReviewStatuses.onModeration
  );

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setPage(1);
    setSearchTerm('');
  };

  const handleChangeSelect = (e: SelectChangeEvent<unknown>) => {
    setOrderDirection(e.target.value as OrderDirectionConstants);
    setPage(1);
  };

  const {
    data: { total: totalPublishedReviews } = {},
    isLoading: isLoadingPublishedCountData,
  } = useQuery<GetUserReviewsResponse>(
    ['publishedReviewsCount'],
    () =>
      getUserReviews({
        status: ReviewStatuses.published,
      }) as Promise<GetUserReviewsResponse>
  );

  const {
    data: { total: totalOnModerationReviews } = {},
    isLoading: isLoadingOnModerationCountData,
  } = useQuery(
    ['onModerationReviewsCount'],
    () =>
      getUserReviews({
        status: ReviewStatuses.onModeration,
      }) as Promise<GetUserReviewsResponse>
  );

  const { data, isLoading } = useQuery<GetUserReviewsResponse>(
    ['reviews', page, searchTerm, orderDirection, activeTab],
    () =>
      getUserReviews({
        page,
        pageSize: 10,
        search: searchTerm,
        orderDirection,
        status: activeTab as ReviewStatuses,
      }) as Promise<GetUserReviewsResponse>,
    {
      keepPreviousData: true,
    }
  );

  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as AllowedReviewStatuses);
    setPage(1);
  };
  const tabs = [
    {
      value: ReviewStatuses.onModeration,
      label: 'On moderation',
      count: totalOnModerationReviews,
    },
    {
      value: ReviewStatuses.published,
      label: 'Published',
      count: totalPublishedReviews,
    },
  ];

  const columns: Column<ReviewInterface>[] = [
    {
      label: 'Sponsor',
      accessor: data => (
        <Box sx={classes.sponsorMainInfo}>
          <PlaceholderImage
            src={data.sponsor?.businessAvatar as string}
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
                text={data.sponsor?.sponsorName as string}
                sx={classes.ellipsisText}
              />
            </Link>
            <Typography variant="caption" sx={classes.subTitle}>
              {data.sponsor?.address}
            </Typography>
          </Box>
        </Box>
      ),
      width: '20%',
    },
    {
      label: 'Deal',
      accessor: data =>
        data.deal ? (
          <Box sx={classes.sponsorMainInfo}>
            <PlaceholderImage
              src={data.deal?.attachments?.[0]?.path as string}
              defaultImage={DEFAULT_DEAL_IMAGE}
              width={32}
              height={32}
              alt="sponsor image"
              style={{ ...classes.sponsorImage, objectFit: 'cover' }}
            />
            <Box>
              <Link style={{ width: 'fit-content' }} href={`/deals/${data.id}`}>
                <EllipsisText
                  variant="body1"
                  fontWeight={500}
                  text={data.deal?.dealTitle as string}
                  sx={classes.ellipsisText}
                />
              </Link>
              <Typography variant="caption" sx={classes.subTitle}>
                {data.deal?.dealAddress}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">N/A</Typography>
        ),
      width: '20%',
    },
    {
      label: 'Reviewer',
      accessor: data => (
        <EllipsisText
          variant="body1"
          fontWeight={500}
          text={
            `${data.reviewer?.firstName} ${data.reviewer?.lastName}` as string
          }
          sx={classes.ellipsisText}
        />
      ),
      width: '15%',
    },
    {
      label: 'Review Date',
      accessor: data => (
        <Typography variant="body1">
          {format(new Date(data.createdAt), 'MMMM d, yyyy h:mm aa')}
        </Typography>
      ),
      width: activeTab === 'on moderation' ? '22%' : '35%',
    },
  ];

  const actions =
    activeTab === 'on moderation'
      ? [{ content: <Button variant="secondary">Manage Review</Button> }]
      : [
          {
            icon: 'icon-Eye-opened',
            //will be replaced by logic of open unpublish review modal
            onClick: (data: ReviewInterface) => console.log(data),
            styles: classes.editIcon,
          },
        ];

  useEffect(() => {
    setPage(1);
    setOrderDirection(OrderDirectionConstants.DESC);
  }, [activeTab]);

  const isReviewsExist =
    activeTab === 'on moderation'
      ? !!totalOnModerationReviews
      : !!totalPublishedReviews;

  const isComprehensiveLoading =
    isLoading || isLoadingOnModerationCountData || isLoadingPublishedCountData;

  return (
    <Layout variant={LayoutVariant.Admin}>
      <Typography variant="h3" sx={classes.title}>
        Review Moderation
      </Typography>
      {isComprehensiveLoading ? (
        <Loading />
      ) : (
        <>
          <CustomTabs
            value={activeTab}
            onChange={handleChangeTab}
            tabs={tabs}
          />
          {isReviewsExist ? (
            <Box>
              <Box sx={classes.header}>
                <Input
                  isSearch
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
              <CustomTable<ReviewInterface>
                data={data?.reviews as ReviewInterface[]}
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
            <Box sx={classes.noReviewsContent}>
              <Typography variant="h4">
                There are no {activeTab === 'published' && 'Published '} Reviews
                {activeTab === 'on moderation' && ' for moderation'} yet
              </Typography>
              <Typography variant="body1" textAlign="center">
                To add deals, search for them on the platform and let us know
                whether you want to claim your deal.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default ReviewModerationPage;
