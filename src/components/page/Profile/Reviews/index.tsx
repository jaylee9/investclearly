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
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';
import { ReviewInterface } from '@/backend/services/reviews/interfaces/review.interface';
import EditReviewModal from './Modals/EditReview';

const ProfileReviews = () => {
  const classes = useProfileReviewsStyles();
  const { isDesktop } = useBreakpoints();
  const [activeTab, setActiveTab] = useState('published');
  const [counters, setCounters] = useState({
    published: 0,
    'on moderation': 0,
    rejected: 0,
  });
  const [user, setUser] = useState<UserInterface | null>(null);
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openEditModal, setOpenEditModal] = useState<ReviewInterface | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [openWriteReviewForm, setOpenWriteReviewForm] = useState(false);

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem(USER_OBJECT_LOCALSTORAGE_KEY) as string)
    );
  }, []);

  const { isLoading: isLoadingPublishedCountData } = useQuery(
    ['publishedReviewsCount'],
    () =>
      getUserReviews({ userId: user?.id, status: ReviewStatuses.published }),
    {
      enabled: !!user,
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => ({
          ...prevCounters,
          published: data.total,
        })),
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
        setCounters(prevCounters => ({
          ...prevCounters,
          'on moderation': data.total,
        })),
    }
  );

  const { isLoading: isLoadingRejectedCountData, refetch: refetchRejectCount } =
    useQuery(
      ['rejectedReviewsCount'],
      () =>
        getUserReviews({ userId: user?.id, status: ReviewStatuses.rejected }),
      {
        enabled: !!user,
        onSuccess: (data: GetUserReviewsResponse) =>
          setCounters(prevCounters => ({
            ...prevCounters,
            rejected: data.total,
          })),
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

  const handleRefetchReject = async () => {
    await refetch();
    await refetchOnModerationCount();
    await refetchRejectCount();
  };

  const handleOpenDeleteModal = (value: number) => setOpenDeleteModal(value);
  const handleCloseDeleteModal = () => setOpenDeleteModal(0);
  const onDeleteSubmit = () => {
    handleRefetchFunction().then(handleCloseDeleteModal);
  };

  const handleOpenEditModal = (review: ReviewInterface) =>
    setOpenEditModal(review);

  const handleCloseEditModal = async () => {
    setOpenEditModal(null);
  };

  const handleOpenWriteReviewForm = () => setOpenWriteReviewForm(true);
  const handleCloseWriteReviewForm = () => setOpenWriteReviewForm(false);
  const onCloseWriteReviewForm = () => {
    handleRefetchFunction().then(handleCloseWriteReviewForm);
  };

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
    {
      value: 'rejected',
      label: 'Rejected',
      count: counters.rejected,
    },
  ];

  const handlePaginate = (value: number) => setPage(value);
  const firstItem = (page - 1) * 10 + 1;
  const lastItem = data && page * 10 > data?.total ? data?.total : page * 10;

  if (
    isLoadingPublishedCountData ||
    isLoadingOnModerationCountData ||
    !user ||
    isLoadingRejectedCountData
  ) {
    return <Loading />;
  }

  return (
    <Box sx={classes.root}>
      <CustomTabs
        value={activeTab}
        onChange={handleChangeTab}
        tabs={tabs}
        isDivider={isDesktop}
        isSpacing
      />
      <Box sx={classes.wrapper}>
        {!counters[activeTab as keyof typeof counters] &&
          !!user &&
          !isLoading && (
            <Box sx={classes.noContentWrapper}>
              <Typography variant="h4" sx={classes.noReviewTitle}>
                There are no&nbsp;
                {activeTab === ReviewStatuses.published && 'published '}
                {activeTab === ReviewStatuses.rejected && 'rejected '}
                Reviews&nbsp;
                {activeTab === ReviewStatuses.onModeration && 'on moderation '}
                yet
              </Typography>
              <Typography variant="body1" sx={classes.subTitle}>
                All reviews
                {activeTab === ReviewStatuses.onModeration && ' on moderation'}
                {activeTab === ReviewStatuses.published && ' you publish'} will
                be displayed here
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
              isFilledWhite
              placeholder="Search"
              onChange={e => handleSearch(e.target.value)}
              onClear={handleClearSearch}
            />
            {isLoading ? (
              <Loading sxCustomStyles={{ marginTop: '16px' }} />
            ) : (
              <Box sx={classes.reviewsWrapper}>
                {data?.reviews.map(review => (
                  <ReviewCard
                    review={review}
                    key={review.id}
                    isDelete={activeTab === ReviewStatuses.onModeration}
                    onDelete={handleOpenDeleteModal}
                    showEditOption={activeTab === ReviewStatuses.rejected}
                    onEdit={handleOpenEditModal}
                  />
                ))}
                <Box sx={classes.pagination}>
                  <Typography variant="caption" sx={classes.paginationResults}>
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
                <EditReviewModal
                  open={!!openEditModal}
                  review={openEditModal as ReviewInterface}
                  onClose={handleCloseEditModal}
                  refetch={handleRefetchReject}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileReviews;
