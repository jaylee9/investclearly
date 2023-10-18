import Layout, { LayoutVariant } from '@/components/common/Layout';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import useAdminReviewModerationStyles from '@/pages_styles/adminReviewModerationStyles';
import Input from '@/components/common/Input';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CustomTable, { Column } from '@/components/common/Table';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { DEFAULT_DEAL_IMAGE, DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import EllipsisText from '@/components/common/EllipsisText';
import Link from 'next/link';
import { debounce } from 'lodash';
import {
  GetUserReviewsResponse,
  approveReview,
  getUserReviews,
} from '@/actions/reviews';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import { format } from 'date-fns';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import { ReviewStatuses } from '@/backend/constants/enums/review-statuses';
import CustomTabs from '@/components/common/CustomTabs';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';
import ReviewDetailsModal from '@/components/page/Admin/Review/ReviewDetailsModal';
import UnpublishReviewModal from '@/components/page/Admin/Review/UnpublishReviewModal';
import withAdminPrivateRoute from '@/HOC/withAdminPrivateRoute';

const sortOptions = [
  { label: 'Newest Reviews', value: 'DESC' },
  { label: 'Oldest Reviews', value: 'ASC' },
];

type AllowedReviewStatuses = 'published' | 'on moderation';

interface OpenModals {
  publish: ReviewInterface | null;
  manage: ReviewInterface | null;
}

interface OpenActionModals {
  unpublish: number | null;
  reject: number | null;
}

type ModalType = 'reject' | 'unpublish';

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
  const [openModals, setOpenModals] = useState<OpenModals>({
    publish: null,
    manage: null,
  });
  const [openActionModals, setOpenActionModals] = useState<OpenActionModals>({
    unpublish: null,
    reject: null,
  });
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  //search and change order
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

  //fetch data
  const {
    data: { total: totalPublishedReviews } = {},
    isLoading: isLoadingPublishedCountData,
    refetch: refetchTotalPublishedReviews,
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
    refetch: refetchTotalOnModerationReviews,
  } = useQuery(
    ['onModerationReviewsCount'],
    () =>
      getUserReviews({
        status: ReviewStatuses.onModeration,
      }) as Promise<GetUserReviewsResponse>
  );

  const {
    data: { total: totalRejectedReviews } = {},
    isLoading: isLoadingRejectedCountData,
  } = useQuery(
    ['rejectedReviewsCount'],
    () =>
      getUserReviews({
        status: ReviewStatuses.rejected,
      }) as Promise<GetUserReviewsResponse>
  );

  const { data, isLoading, refetch } = useQuery<GetUserReviewsResponse>(
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
    {
      value: ReviewStatuses.rejected,
      label: 'Rejected',
      count: totalRejectedReviews,
    },
  ];

  //table
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
                text={data.sponsor?.vanityName as string}
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
                  text={data.deal?.vanityName as string}
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
          sx={{ maxWidth: '150px' }}
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
      width: activeTab === 'on moderation' ? '23%' : '35%',
    },
  ];

  const getActions = useCallback(() => {
    const baseActions = [];

    if (activeTab === ReviewStatuses.onModeration) {
      baseActions.push({
        content: (data: ReviewInterface) => (
          <Button
            variant="secondary"
            key={data.id}
            onClick={() =>
              setOpenModals(prevState => {
                return { ...prevState, manage: data };
              })
            }
          >
            Manage Review
          </Button>
        ),
      });
    } else if (activeTab === ReviewStatuses.published) {
      baseActions.push({
        icon: 'icon-Eye-opened',
        onClick: (data: ReviewInterface) =>
          setOpenModals(prevState => {
            return { ...prevState, publish: data };
          }),
        styles: classes.editIcon,
      });
    } else {
      return undefined;
    }

    return baseActions;
  }, [activeTab, setOpenModals, classes]);

  useEffect(() => {
    setPage(1);
    setOrderDirection(OrderDirectionConstants.DESC);
  }, [activeTab]);

  const isReviewsExist =
    activeTab === 'on moderation'
      ? !!totalOnModerationReviews
      : !!totalPublishedReviews;

  //modal logic
  const handleOpenModal = (key: ModalType, id: number) =>
    setOpenActionModals(prevModals => {
      return { ...prevModals, [key]: id };
    });

  const handleCloseActionModal = (key: ModalType) =>
    setOpenActionModals(prevModals => {
      return { ...prevModals, [key]: null };
    });

  const openModalKey = () => {
    if (openActionModals.unpublish) {
      return 'unpublish';
    } else if (openActionModals.reject) {
      return 'reject';
    }
  };

  const reviewDetailsModalTitle = () => {
    if (!!openModals.manage) {
      return 'Manage Review';
    } else if (!!openModals.publish) {
      return 'Review';
    } else {
      return '';
    }
  };

  const handleCloseModal = () => {
    if (isApproveLoading) {
      return;
    }
    setOpenModals({ manage: null, publish: null });
  };

  const actionButtons = openModals.publish
    ? (data: ReviewInterface) => (
        <Button
          onClick={() => handleOpenModal('unpublish', data.id)}
          color="error"
          variant="secondary"
          customStyles={classes.actionButton}
        >
          <i className="icon-Cross" style={classes.iconCross} />
          Unpublish
        </Button>
      )
    : (data: ReviewInterface) => (
        <Box sx={classes.manageReviewButtonsWrapper}>
          <Button
            color="error"
            variant="secondary"
            customStyles={classes.actionButton}
            disabled={isApproveLoading}
            onClick={() => handleOpenModal('reject', data.id)}
          >
            <i className="icon-Cross" style={classes.iconCross} />
            Reject
          </Button>
          <Button
            color="success"
            customStyles={classes.actionButton}
            onClick={() => handleApproveReview(data.id)}
            disabled={isApproveLoading}
          >
            <i className="icon-Check" style={classes.iconCheck} />
            Approve
          </Button>
        </Box>
      );

  const handleSubmitCloseUnpublishModal = async () => {
    await refetchTotalPublishedReviews();
    await refetch();
    handleCloseModal();
    handleCloseActionModal(openModalKey() as ModalType);
  };

  const handleApproveReview = async (id: number) => {
    setIsApproveLoading(true);
    const response = await approveReview({ id });
    if (!('error' in response)) {
      await refetchTotalPublishedReviews();
      await refetchTotalOnModerationReviews();
      await refetch();
      setIsApproveLoading(false);
      handleCloseModal();
    }
  };

  const isComprehensiveLoading =
    isLoading ||
    isLoadingOnModerationCountData ||
    isLoadingPublishedCountData ||
    isLoadingRejectedCountData;

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
              <CustomTable<ReviewInterface>
                data={data?.reviews as ReviewInterface[]}
                page={page}
                setPage={setPage}
                total={Number(data?.total)}
                lastPage={Number(data?.lastPage)}
                columns={columns}
                actions={getActions()}
                pageSize={10}
              />
              <ReviewDetailsModal
                open={!!openModals.manage || !!openModals.publish}
                title={reviewDetailsModalTitle()}
                onClose={handleCloseModal}
                review={
                  (openModals.manage || openModals.publish) as ReviewInterface
                }
                actionButtons={actionButtons}
              />
              <UnpublishReviewModal
                open={!!openActionModals.unpublish || !!openActionModals.reject}
                onClose={() =>
                  handleCloseActionModal(openModalKey() as ModalType)
                }
                reviewId={Number(openActionModals[openModalKey() as ModalType])}
                onSubmitClose={handleSubmitCloseUnpublishModal}
                isReject={!!openActionModals.reject}
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

export default withAdminPrivateRoute(ReviewModerationPage);
