import CustomTabs from '@/components/common/CustomTabs';
import { Box } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import AllInvestments from './all';

const tabs = [
  {
    value: 'all',
    label: 'All',
    content: <AllInvestments />,
  },
  {
    value: 'active',
    label: 'Active',
    content: <></>,
  },
  {
    value: 'completed',
    label: 'Completed',
    content: <></>,
  },
];

const ProfileInvestments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };
  return (
    <Box>
      <CustomTabs tabs={tabs} onChange={handleChangeTab} value={activeTab} />
    </Box>
  );
};

export default ProfileInvestments;
