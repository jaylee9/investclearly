import {
  GetDealsBookmarksResponse,
  GetSponsorsBookmarksResponse,
  getDealsBookmarks,
  getSponsorsBookmarks,
} from '@/actions/bookmarks';
import CustomTabs from '@/components/common/CustomTabs';
import Loading from '@/components/common/Loading';
import { Box } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';

const ProfileSaved = () => {
  const [activeTab, setActiveTab] = useState('deals');
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };

  const { data: savedDeals, isLoading: isLoadingSavedDealsTotal } =
    useQuery<GetDealsBookmarksResponse>(
      ['savedDealsTotal'],
      () => getDealsBookmarks({}) as Promise<GetDealsBookmarksResponse>
    );
  const { data: savedSponsors, isLoading: isLoadingSavedSponsorsTotal } =
    useQuery<GetSponsorsBookmarksResponse>(
      ['savedSponsorsTotal'],
      () => getSponsorsBookmarks({}) as Promise<GetSponsorsBookmarksResponse>
    );

  const tabs = [
    {
      value: 'deals',
      label: 'Deals',
      count: savedDeals?.total,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      count: savedSponsors?.total,
    },
  ];

  if (isLoadingSavedDealsTotal || isLoadingSavedSponsorsTotal) {
    return <Loading />;
  }

  return (
    <Box>
      <CustomTabs tabs={tabs} value={activeTab} onChange={handleChangeTab} />
    </Box>
  );
};

export default ProfileSaved;
