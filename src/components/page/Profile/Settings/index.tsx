import CustomTabs from '@/components/common/CustomTabs';
import { Box } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import EditProfile from './Edit';
import PrivacySettings from './Privacy';
import Notifications from './Notifications';
import InvestmentPreferences from './InvestmentPreferences';
import CredentialsSettings from './Credentials';
import { useProfileSettingsWrapperStyles } from './styles';

const tabs = [
  { value: 'edit', label: 'Edit Profile', content: <EditProfile /> },
  { value: 'privacy', label: 'Privacy Settings', content: <PrivacySettings /> },
  {
    value: 'notifications',
    label: 'Notifications',
    content: <Notifications />,
  },
  {
    value: 'investment-preferences',
    label: 'Investment Preferences',
    content: <InvestmentPreferences />,
  },
  { value: 'settings', label: 'Settings', content: <CredentialsSettings /> },
];

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('edit');

  const classes = useProfileSettingsWrapperStyles();

  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };

  return (
    <Box sx={classes.wrapper}>
      <CustomTabs
        tabs={tabs}
        onChange={handleChangeTab}
        value={activeTab}
        isSpacing
        isDivider
      />
    </Box>
  );
};

export default ProfileSettings;
