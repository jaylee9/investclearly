import { useState } from 'react';
import {
  GetDealsBookmarksResponse,
  deleteDealBookmark,
  getDealsBookmarks,
} from '@/actions/bookmarks';
import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useSavedDealsStyles } from './styles';
import Loading from '@/components/common/Loading';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Input from '@/components/common/Input';
import { debounce } from 'lodash';
import CustomPagination from '@/components/common/Pagination';

interface SavedDealsProps {
  setDealCountChanged: (value: number) => void;
}

const SavedDeals = ({ setDealCountChanged }: SavedDealsProps) => {
  const classes = useSavedDealsStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<GetDealsBookmarksResponse>(
    ['savedDeals', searchTerm, page],
    async () => {
      const response = await getDealsBookmarks({
        page,
        pageSize: 10,
        search: searchTerm,
      });
      return response as GetDealsBookmarksResponse;
    }
  );

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, 300);
  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  const handleDeleteBookmark = async (entityId: number) => {
    const response = await deleteDealBookmark({ entityId });
    if (!('error' in response)) {
      setDealCountChanged(entityId);
      refetch();
    }
  };

  const handlePaginate = (value: number) => setPage(value);
  const firstItem = (page - 1) * 10 + 1;
  const lastItem = data && page * 10 > data?.total ? data?.total : page * 10;

  return (
    <Box sx={classes.root}>
      {(isLoading || (data?.deals && data?.deals.length > 0) || searchTerm) && (
        <Input
          placeholder="Search"
          isSearch
          variant="filled"
          customStyles={classes.searchInput}
          onChange={e => handleSearch(e.target.value)}
          onClear={handleClearSearch}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.deals && data.deals.length > 0 ? (
            <Box sx={classes.dealsWrapper}>
              {data.deals.map(deal => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  variant={DealCardVariant.Large}
                  deleteBookmark={handleDeleteBookmark}
                  sx={classes.dealCard}
                />
              ))}
            </Box>
          ) : searchTerm ? (
            <Box sx={classes.noDealsRoot}>
              <Typography variant="h4" fontWeight={600}>
                No deals found
              </Typography>
              <Typography variant="body1">
                Try different search terms
              </Typography>
            </Box>
          ) : (
            <Box sx={classes.noDealsRoot}>
              <Typography variant="h4" fontWeight={600}>
                You don’t have deals saved yet
              </Typography>
              <Typography variant="body1">
                All deals you save will be displayed here
              </Typography>
            </Box>
          )}
        </>
      )}

      {data?.deals && data.deals.length > 0 && (
        <Box sx={classes.pagination}>
          <Typography variant="caption">
            Showing {firstItem}-{lastItem} of {data?.total} results
          </Typography>
          <CustomPagination
            page={page}
            count={data?.lastPage}
            onChange={(event, value) => handlePaginate(value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default SavedDeals;
