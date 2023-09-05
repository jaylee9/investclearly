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

const ProfileReviews = () => {
  const classes = useProfileReviewsStyles();
  const [activeTab, setActiveTab] = useState('published');
  const [counters, setCounters] = useState({ published: 0, onModeration: 0 });
  const [user, setUser] = useState<UserInterface | null>(null);
  const [pageSize, setPageSize] = useState(3);
  const [paginateLoading, setPaginateLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);

  const handleShowMore = () => setPageSize(prevPageSize => prevPageSize + 3);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, []);

  const { isLoading: isLoadingPublishedCountData } = useQuery(
    ['publishedReviewsCount'],
    () =>
      getUserReviews({ userId: user?.id, status: ReviewStatuses.published }),
    {
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
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => {
          return { ...prevCounters, onModeration: data.total };
        }),
    }
  );

  const { data, isLoading, refetch } = useQuery(
    ['reviews', activeTab, pageSize],
    () => {
      setPaginateLoading(true);
      return getUserReviews({
        userId: user?.id,
        status: activeTab as ReviewStatuses,
        orderDirection: OrderDirectionConstants.DESC,
        pageSize,
      });
    },
    {
      keepPreviousData: true,
      onSuccess: () => setPaginateLoading(false),
    }
  );

  const handleOpenDeleteModal = (value: number) => setOpenDeleteModal(value);
  const handleCloseDeleteModal = () => setOpenDeleteModal(0);
  const onDeleteSubmit = () => {
    refetch().then(() =>
      refetchOnModerationCount().then(handleCloseDeleteModal)
    );
  };

  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
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
      count: counters.onModeration,
    },
  ];
  if (
    isLoadingPublishedCountData ||
    isLoadingOnModerationCountData ||
    isLoading
  ) {
    <Loading />;
  }

  return (
    <Box sx={classes.root}>
      <CustomTabs value={activeTab} onChange={handleChangeTab} tabs={tabs} />
      <Box sx={classes.reviewsWrapper}>
        {activeTab === ReviewStatuses.published && (
          <Typography variant="caption" sx={classes.warning}>
            <i className="icon-Warning"></i>
            You have 1 unverified reviews. Please, upload proofs to help us
            maintain accurate information.
          </Typography>
        )}
        {data?.reviews.map(review => (
          <ReviewCard
            review={review}
            key={review.id}
            showVerifyOption={activeTab === ReviewStatuses.published}
            isDelete={activeTab === ReviewStatuses.onModeration}
            onDelete={handleOpenDeleteModal}
          />
        ))}
        {paginateLoading ? (
          <Loading />
        ) : (
          data &&
          data?.total > pageSize && (
            <Typography sx={classes.showMore} onClick={handleShowMore}>
              Show more reviews <i className="icon-Caret-down"></i>
            </Typography>
          )
        )}
        <DeleteReviewModal
          open={!!openDeleteModal}
          id={openDeleteModal}
          onSubmitClose={onDeleteSubmit}
          onClose={handleCloseDeleteModal}
        />
      </Box>
    </Box>
  );
};

export default ProfileReviews;
