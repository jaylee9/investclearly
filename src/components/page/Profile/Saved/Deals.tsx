import {
  GetDealsBookmarksResponse,
  getDealsBookmarks,
} from '@/actions/bookmarks';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useSavedDealsStyles } from './styles';

const SavedDeals = () => {
  const classes = useSavedDealsStyles();
  const { data, isLoading } = useQuery<GetDealsBookmarksResponse>(
    ['savedDeals'],
    () =>
      getDealsBookmarks({ pageSize: 10 }) as Promise<GetDealsBookmarksResponse>
  );
  return (
    <Box sx={classes.root}>
      <Box></Box>
    </Box>
  );
};

export default SavedDeals;
