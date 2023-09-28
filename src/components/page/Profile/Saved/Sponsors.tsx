import { useState } from 'react';
import {
  GetSponsorsBookmarksResponse,
  deleteSponsorBookmark,
  getSponsorsBookmarks,
} from '@/actions/bookmarks';
import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useSavedSponsorsStyles } from './styles';
import Loading from '@/components/common/Loading';
import Input from '@/components/common/Input';
import { debounce } from 'lodash';
import CustomPagination from '@/components/common/Pagination';
import SponsorCard, {
  SponsorCardVariant,
} from '@/components/common/SponsorCard';
import { useRouter } from 'next/router';

interface SavedSponsorsProps {
  setSponsorCountChanged: (value: number) => void;
}

const SavedSponsors = ({ setSponsorCountChanged }: SavedSponsorsProps) => {
  const classes = useSavedSponsorsStyles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<GetSponsorsBookmarksResponse>(
    ['savedSponsors', searchTerm, page],
    () =>
      getSponsorsBookmarks({
        page,
        pageSize: 10,
        search: searchTerm,
        router,
      }) as Promise<GetSponsorsBookmarksResponse>
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
    const response = await deleteSponsorBookmark({ entityId, router });
    if (!('error' in response)) {
      setSponsorCountChanged(entityId);
      refetch();
    }
  };

  const handlePaginate = (value: number) => setPage(value);
  const firstItem = (page - 1) * 10 + 1;
  const lastItem = data && page * 10 > data?.total ? data?.total : page * 10;

  return (
    <Box sx={classes.root}>
      {(isLoading ||
        (data?.sponsors && data?.sponsors.length > 0) ||
        searchTerm) && (
        <Input
          placeholder="Search"
          isSearch
          variant="filled"
          sxCustomStyles={classes.searchInput}
          onChange={e => handleSearch(e.target.value)}
          onClear={handleClearSearch}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.sponsors && data.sponsors.length > 0 ? (
            <Box sx={classes.sponsorsWrapper}>
              {data.sponsors.map(sponsor => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  variant={SponsorCardVariant.Large}
                  deleteBookmark={handleDeleteBookmark}
                  sx={classes.sponsorCard}
                />
              ))}
            </Box>
          ) : searchTerm ? (
            <Box sx={classes.noSponsorsRoot}>
              <Typography variant="h4" fontWeight={600}>
                No sponsors found
              </Typography>
              <Typography variant="body1">
                Try different search terms
              </Typography>
            </Box>
          ) : (
            <Box sx={classes.noSponsorsRoot}>
              <Typography variant="h4" fontWeight={600}>
                You don’t have sponsors saved yet
              </Typography>
              <Typography variant="body1">
                All sponsors you save will be displayed here
              </Typography>
            </Box>
          )}
        </>
      )}

      {data?.sponsors && data.sponsors.length > 0 && (
        <Box sx={classes.pagination}>
          <Typography variant="caption" sx={classes.paginationResults}>
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

export default SavedSponsors;
