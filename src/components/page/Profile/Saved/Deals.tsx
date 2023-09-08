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

const SavedDeals = () => {
  const classes = useSavedDealsStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<GetDealsBookmarksResponse>(
    ['savedDeals', searchTerm, page],
    () =>
      getDealsBookmarks({
        page,
        pageSize: 10,
        search: searchTerm,
      }) as Promise<GetDealsBookmarksResponse>
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
      refetch();
    }
  };
  const handlePaginate = (value: number) => setPage(value);
  const firstItem = (page - 1) * 10 + 1;
  const lastItem = data && page * 10 > data?.total ? data?.total : page * 10;

  return (
    <Box sx={classes.root}>
      <Input
        placeholder="Search"
        isSearch
        variant="filled"
        customStyles={classes.searchInput}
        onChange={e => handleSearch(e.target.value)}
        onClear={handleClearSearch}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={classes.dealsWrapper}>
          {data?.deals.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              variant={DealCardVariant.Large}
              deleteBookmark={handleDeleteBookmark}
              sx={classes.dealCard}
            />
          ))}
        </Box>
      )}
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
    </Box>
  );
};

export default SavedDeals;
