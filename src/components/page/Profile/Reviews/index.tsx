import { Box } from '@mui/material';
import { useProfileReviewsStyles } from './styles';
import { SyntheticEvent, useState } from 'react';
import CustomTabs from '@/components/common/CustomTabs';

const ProfileReviews = () => {
  const classes = useProfileReviewsStyles();
  const [activeTab, setActiveTab] = useState('published');
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
    },
    {
      value: 'on moderation',
      label: 'On moderation',
    },
  ];
  return (
    <Box sx={classes.root}>
      <CustomTabs value={activeTab} onChange={handleChangeTab} tabs={tabs} />
    </Box>
  );
};

export default ProfileReviews;
