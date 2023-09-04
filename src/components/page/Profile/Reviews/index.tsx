import { Box } from '@mui/material';
import { useProfileReviewsStyles } from './styles';
import { SyntheticEvent, useState } from 'react';
import CustomTabs from '@/components/common/CustomTabs';
import { useQuery } from 'react-query';
import { GetUserReviewsResponse, getUserReviews } from '@/actions/reviews';
import Loading from '@/components/common/Loading';
import { ReviewStatuses } from '@/backend/constants/enums/review-statuses';

const ProfileReviews = () => {
  const classes = useProfileReviewsStyles();
  const [activeTab, setActiveTab] = useState('published');
  const [counters, setCounters] = useState({ published: 0, onModeration: 0 });
  const { isLoading: isLoadingPublishedCountData } = useQuery(
    ['publishedReviewsCount'],
    () => getUserReviews({ userId: 1, status: ReviewStatuses.published }),
    {
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => {
          return { ...prevCounters, published: data.total };
        }),
    }
  );

  const { isLoading: isLoadingOnModerationCountData } = useQuery(
    ['onModerationReviewsCount'],
    () => getUserReviews({ userId: 1, status: ReviewStatuses.onModeration }),
    {
      onSuccess: (data: GetUserReviewsResponse) =>
        setCounters(prevCounters => {
          return { ...prevCounters, onModeration: data.total };
        }),
    }
  );

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
  if (isLoadingPublishedCountData || isLoadingOnModerationCountData) {
    <Loading />;
  }
  return (
    <Box sx={classes.root}>
      <CustomTabs value={activeTab} onChange={handleChangeTab} tabs={tabs} />
    </Box>
  );
};

export default ProfileReviews;
