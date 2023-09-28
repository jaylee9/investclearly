import {
  GetDealsBookmarksResponse,
  GetSponsorsBookmarksResponse,
  getDealsBookmarks,
  getSponsorsBookmarks,
} from '@/actions/bookmarks';
import CustomTabs from '@/components/common/CustomTabs';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';
import SavedDeals from './Deals';
import SavedSponsors from './Sponsors';
import { Box } from '@mui/material';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const ProfileSaved = () => {
  const { isDesktop } = useBreakpoints();
  const [activeTab, setActiveTab] = useState('deals');
  const [dealCountChanged, setDealCountChanged] = useState(0);
  const [sponsorCountChanged, setSponsorCountChanged] = useState(0);
  const handleChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number
  ) => {
    setActiveTab(newValue as string);
  };

  const { data: savedDeals } = useQuery<GetDealsBookmarksResponse>(
    ['savedDealsTotal', dealCountChanged],
    () => getDealsBookmarks({}) as Promise<GetDealsBookmarksResponse>
  );
  const { data: savedSponsors } = useQuery<GetSponsorsBookmarksResponse>(
    ['savedSponsorsTotal', sponsorCountChanged],
    () => getSponsorsBookmarks({}) as Promise<GetSponsorsBookmarksResponse>
  );

  const tabs = [
    {
      value: 'deals',
      label: 'Deals',
      count: savedDeals?.total,
      content: <SavedDeals setDealCountChanged={setDealCountChanged} />,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      count: savedSponsors?.total,
      content: (
        <SavedSponsors setSponsorCountChanged={setSponsorCountChanged} />
      ),
    },
  ];

  return (
    <Box>
      <CustomTabs
        tabs={tabs}
        value={activeTab}
        onChange={handleChangeTab}
        isDivider={isDesktop}
        isSpacing
      />
    </Box>
  );
};

export default ProfileSaved;
