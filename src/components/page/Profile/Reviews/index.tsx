import { Box, Typography } from '@mui/material';
import { useProfileReviewsStyles } from './styles';
import { SyntheticEvent, useEffect, useState } from 'react';
import CustomTabs from '@/components/common/CustomTabs';
import { useQuery } from 'react-query';
import { GetUserReviewsResponse, getUserReviews } from '@/actions/reviews';
import Loading from '@/components/common/Loading';
import { ReviewStatuses } from '@/backend/constants/enums/review-statuses';
import { UserInterface } from '@/backend/services/users/interfaces/user.interface';
import ReviewCard from '@/components/common/ReviewCard';
import { OrderDirectionConstants } from '@/backend/constants/order-direction-constants';
import DeleteReviewModal from './Modals/DeleteReview';
import Input from '@/components/common/Input';
import { debounce } from 'lodash';
import Button from '@/components/common/Button';
import CreateReviewForm from '@/components/common/CreateReview';
import CustomPagination from '@/components/common/Pagination';
import VerifyReviewModal from './Modals/VerifyReview';

const ProfileReviews = () => {
  const classes = useProfileReviewsStyles();
  const [activeTab, setActiveTab] = useState('published');
  const [counters, setCounters] = useState({
    published: 0,
    'on moderation': 0,
  });
  const [user, setUser] = useState<UserInterface | null>(null);
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openWriteReviewForm, setOpenWriteReviewForm] = useState(false);
  const [openVerifyReviewModal, setOpenVerifyReviewModal] = useState<
    null | number
  >(null);

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, []);

  const { isLoading: isLoadingPublishedCountData } = useQuery(
    ['publishedReviewsCount'],
    () =>
      getUserReviews({ userId: user?.id, status: ReviewStatuses.published }),
    {
      enabled: !!user,
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => {
          return { ...prevCounters, published: data.total };
        }),
    }
  );

  const {
    isLoading: isLoadingOnModerationCountData,
    refetch: refetchOnModerationCount,
  } = useQuery(
    ['onModerationReviewsCount'],
    () =>
      getUserReviews({ userId: user?.id, status: ReviewStatuses.onModeration }),
    {
      enabled: !!user,
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => {
          return { ...prevCounters, 'on moderation': data.total };
        }),
    }
  );

  const { data, isLoading, refetch } = useQuery<GetUserReviewsResponse>(
    ['reviews', activeTab, page, searchTerm],
    () => {
      return getUserReviews({
        userId: user?.id,
        status: activeTab as ReviewStatuses,
        orderDirection: OrderDirectionConstants.DESC,
        page,
        pageSize: 10,
        search: searchTerm,
      }) as Promise<GetUserReviewsResponse>;
    },
    {
      enabled: !!user,
      keepPreviousData: true,
    }
  );

  const handleRefetchFunction = () =>
    refetch().then(() => refetchOnModerationCount());

  const handleOpenDeleteModal = (value: number) => setOpenDeleteModal(value);
  const handleCloseDeleteModal = () => setOpenDeleteModal(0);
  const onDeleteSubmit = () => {
    handleRefetchFunction().then(handleCloseDeleteModal);
  };

  const handleOpenWriteReviewForm = () => setOpenWriteReviewForm(true);
  const handleCloseWriteReviewForm = () => setOpenWriteReviewForm(false);
  const onCloseWriteReviewForm = () => {
    handleRefetchFunction().then(handleCloseWriteReviewForm);
  };

  const handleOpenVerifyReviewModal = (value: number) =>
    setOpenVerifyReviewModal(value);
  const handleCloseVerifyReviewModal = () => setOpenVerifyReviewModal(null);

  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
    setPage(1);
  };
  const tabs = [
    {
      value: 'published',
      label: 'Published',
      count: counters.published,
    },
    {
      value: 'on moderation',
      label: 'On moderation',
      count: counters['on moderation'],
    },
  ];

  const handlePaginate = (value: number) => setPage(value);
  const firstItem = (page - 1) * 10 + 1;
  const lastItem = data && page * 10 > data?.total ? data?.total : page * 10;

  if (isLoadingPublishedCountData || isLoadingOnModerationCountData || !user) {
    return <Loading />;
  }
  return (
    <Box sx={{ overflow: 'auto' }}>
      <CustomTabs value={activeTab} onChange={handleChangeTab} tabs={tabs} />
      {!counters[activeTab as keyof typeof counters] &&
        !!user &&
        !isLoading && (
          <Box sx={classes.noContentWrapper}>
            <Typography variant="h4" sx={classes.noReviewTitle}>
              There are no{' '}
              {activeTab === ReviewStatuses.published && 'published '}
              Reviews
              {activeTab === ReviewStatuses.onModeration &&
                ' on moderation'}{' '}
              yet
            </Typography>
            <Typography variant="body1" sx={classes.subTitle}>
              All reviews
              {activeTab === ReviewStatuses.onModeration && ' on moderation'}
              {activeTab === ReviewStatuses.published && 'you publish'} will be
              displayed here
            </Typography>
            <Button
              customStyles={classes.writeReviewButton}
              onClick={handleOpenWriteReviewForm}
            >
              Write a review
            </Button>
            <CreateReviewForm
              open={openWriteReviewForm}
              onClose={onCloseWriteReviewForm}
            />
          </Box>
        )}
      {!!counters[activeTab as keyof typeof counters] && data && (
        <Box sx={classes.content}>
          <Input
            variant="filled"
            isSearch
            placeholder="Search"
            customStyles={classes.searchInput}
            onChange={e => handleSearch(e.target.value)}
            onClear={handleClearSearch}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <Box sx={classes.reviewsWrapper}>
              {activeTab === ReviewStatuses.published &&
                !!data.totalUnverifiedReviews && (
                  <Typography variant="caption" sx={classes.warning}>
                    <i className="icon-Warning"></i>
                    You have {data.totalUnverifiedReviews} unverified review
                    {data.totalUnverifiedReviews > 1 && 's'}. Please, upload
                    proofs to help us maintain accurate information.
                  </Typography>
                )}
              {data?.reviews.map(review => (
                <ReviewCard
                  review={review}
                  key={review.id}
                  showVerifyOption={activeTab === ReviewStatuses.published}
                  isDelete={activeTab === ReviewStatuses.onModeration}
                  onDelete={handleOpenDeleteModal}
                  onVerify={handleOpenVerifyReviewModal}
                />
              ))}
              <Box sx={classes.pagination}>
                <Typography variant="caption">
                  Showing {firstItem}-{lastItem} of {data.total} results
                </Typography>
                <CustomPagination
                  page={page}
                  count={data.lastPage}
                  onChange={(event, value) => handlePaginate(value)}
                />
              </Box>
              <DeleteReviewModal
                open={!!openDeleteModal}
                id={openDeleteModal}
                onSubmitClose={onDeleteSubmit}
                onClose={handleCloseDeleteModal}
              />
              <VerifyReviewModal
                open={!!openVerifyReviewModal}
                onClose={handleCloseVerifyReviewModal}
                refetchFunction={handleRefetchFunction}
                reviewId={openVerifyReviewModal as number}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileReviews;
