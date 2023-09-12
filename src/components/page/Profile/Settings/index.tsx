import CustomTabs from '@/components/common/CustomTabs';
import { Box } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import EditProfile from './Edit';
import PrivacySettings from './Privacy';

const tabs = [
  { value: 'edit', label: 'Edit Profile', content: <EditProfile /> },
  { value: 'privacy', label: 'Privacy Settings', content: <PrivacySettings /> },
  { value: 'notifications', label: 'Notifications' },
  { value: 'investment-preferences', label: 'Investment Preferences' },
  { value: 'settings', label: 'Settings' },
];

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('edit');

  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };

  return (
    <Box height="90%">
      <CustomTabs tabs={tabs} onChange={handleChangeTab} value={activeTab} />
    </Box>
  );
};

export default ProfileSettings;
