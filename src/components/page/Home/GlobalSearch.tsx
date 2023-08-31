import React, { useRef, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useGlobalSearchStyles } from './styles';
import { Box, Fade, Typography } from '@mui/material';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import { GlobalSearchResponse, globalSearch } from '@/actions/common';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import Loading from '@/components/common/Loading';
import { useRouter } from 'next/router';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Search } from '@mui/icons-material';

export enum GlobalSearchVariant {
  BASE = 'base',
  LARGE = 'lg',
}
interface GlobalSearchProps {
  searchResponse?: GlobalSearchResponse;
  variant?: GlobalSearchVariant;
  onChangeSearch?: (value: string) => void;
}

const GlobalSearch = ({
  searchResponse,
  variant = GlobalSearchVariant.LARGE,
  onChangeSearch,
}: GlobalSearchProps) => {
  const classes = useGlobalSearchStyles();
  const router = useRouter();
  const { search, type } = router.query;
  const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
  const [value, setValue] = useState(search || '');
  const [globalSearchValue, setGlobalSearchValue] = useState(
    (search as string) || ''
  );
  const [data, setData] = useState<GlobalSearchResponse>(
    searchResponse as GlobalSearchResponse
  );
  const ref = useRef(null);
  const { isMobile } = useBreakpoints();

  const handleOpen = () => {
    setIsOpenGlobalSearch(true);
  };
  const handleClose = () => {
    setIsOpenGlobalSearch(false);
  };

  const handleChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setGlobalSearchValue(e.target.value);
    },
    500
  );

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(e);
    setValue(e.target.value);
  };

  const handleCloseGlobalSearch = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpenGlobalSearch(false);
  };

  const handleShowAllLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleCloseGlobalSearch(event);
    if (onChangeSearch) {
      onChangeSearch(globalSearchValue);
    }
  };

  const { isLoading } = useQuery(
    ['globalSearch', globalSearchValue],
    () => globalSearch({ search: globalSearchValue }),
    {
      onSuccess: response => {
        setData(response as GlobalSearchResponse);
      },
    }
  );

  const searchType = data?.sponsors?.length
    ? type === 'sponsors' && 'sponsors'
    : 'deals';

  const searchLink = `/list?type=${
    searchType || 'sponsors'
  }&search=${globalSearchValue}`;

  const handleClearInput = () => {
    setValue('');
    setGlobalSearchValue('');
    setIsOpenGlobalSearch(false);
    if (type) {
      router.push(`/list?type=${searchType}`);
      if (onChangeSearch) {
        onChangeSearch('');
      }
    }
  };

  const handleSearchSubmit = () => {
    setIsOpenGlobalSearch(false);
    router.push(searchLink);
    if (onChangeSearch) {
      onChangeSearch(globalSearchValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useOnClickOutside(ref, handleClose);

  return (
    <Box ref={ref} onClick={handleOpen} sx={classes.root}>
      {variant === GlobalSearchVariant.LARGE && (
        <Input
          variant="filled"
          isFilledWhite
          isSearch
          showClearOption={false}
          placeholder="Deals, Sponsors, and Asset Class"
          customStyles={classes.searchInput}
          height="large"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          endComponent={
            isMobile ? (
              <Button customStyles={classes.searchButton}>
                <Search />
              </Button>
            ) : (
              <Link href={searchLink}>
                <Button
                  customStyles={{
                    boxSizing: 'border-box',
                    padding: '12px 40px !important',
                    height: '48px !important',
                  }}
                >
                  Search
                </Button>
              </Link>
            )
          }
          onChange={handleChange}
        />
      )}
      {variant === GlobalSearchVariant.BASE && (
        <Input
          isSearch
          showClearOption
          placeholder="Search"
          variant="filled"
          onChange={handleChangeValue}
          onClear={handleClearInput}
          value={value}
          customStyles={classes.baseSearchInput}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      )}
      {isOpenGlobalSearch && (
        <Fade in={isOpenGlobalSearch}>
          <Box sx={classes.searchContent}>
            {isLoading && <Loading />}
            {!!data?.deals?.length && !isLoading && (
              <Box sx={classes.block}>
                <Box sx={classes.blockTitleWrapper}>
                  <Typography variant="caption" sx={classes.blockTitle}>
                    Deals
                  </Typography>
                  <Link
                    href={`/list?type=deals&search=${globalSearchValue}`}
                    onClick={handleShowAllLinkClick}
                  >
                    <Typography variant="body1" sx={classes.showAllLink}>
                      Show all
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  {data?.deals?.map(deal => (
                    <Box sx={classes.blockListItem} key={deal.id}>
                      <PlaceholderImage
                        src={deal?.attachments?.[0]?.path as string}
                        alt="Deal image"
                        width={48}
                        height={48}
                        style={classes.blockListItemImage}
                        defaultImage="/assets/Sponsor-placeholder.png"
                      />
                      <Box>
                        <Link
                          href={`/deals/${deal.id}`}
                          onClick={handleCloseGlobalSearch}
                        >
                          <Typography
                            variant="body1"
                            sx={classes.blockListItemContentTitle}
                          >
                            {deal.dealLegalName}
                          </Typography>
                        </Link>
                        <Typography
                          variant="caption"
                          sx={classes.blockListItemDefaultText}
                          marginBottom={6}
                        >
                          {Array.isArray(deal.regions)
                            ? deal.regions.join(', ')
                            : deal.regions}
                        </Typography>
                        <Box sx={classes.dealTypes}>
                          <Typography
                            variant="caption"
                            sx={classes.blockListItemDefaultText}
                          >
                            {deal.assetClass}
                          </Typography>
                          {/* 
                        logic for future, when will be array
                        {deal.assetClass.map((type, index) => (
                          <React.Fragment key={type}>
                            <Typography
                              variant="caption"
                              sx={classes.blockListItemDefaultText}
                            >
                              {type}
                            </Typography>
                            {index !== deal.assetClass.length - 1 && (
                              <Box className="round-divider" />
                            )}
                          </React.Fragment>
                        ))} */}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {!!data?.sponsors?.length && !isLoading && (
              <Box sx={classes.block}>
                <Box sx={classes.blockTitleWrapper}>
                  <Typography variant="caption" sx={classes.blockTitle}>
                    Sponsors
                  </Typography>
                  <Link
                    href={`/list?type=sponsors&search=${globalSearchValue}`}
                    onClick={handleShowAllLinkClick}
                  >
                    <Typography variant="body1" sx={classes.showAllLink}>
                      Show all
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  {data?.sponsors?.map(sponsor => (
                    <Box sx={classes.blockListItem} key={sponsor.id}>
                      <PlaceholderImage
                        src={sponsor.businessAvatar as string}
                        alt="Deal image"
                        width={48}
                        height={48}
                        style={classes.blockListItemImage}
                        defaultImage="/assets/Sponsor-placeholder.png"
                      />
                      <Box>
                        <Link
                          href={`/sponsors/${sponsor.id}`}
                          onClick={handleCloseGlobalSearch}
                        >
                          <Typography
                            variant="body1"
                            sx={classes.blockListItemContentTitle}
                          >
                            {sponsor.legalName}
                          </Typography>
                        </Link>
                        <Typography
                          variant="caption"
                          sx={classes.sponsorRating}
                        >
                          <i className="icon-Star"></i>
                          <span>{sponsor.avgTotalRating}</span>
                          <span>({sponsor.reviewsCount})</span>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={classes.blockListItemDefaultText}
                          marginBottom={6}
                        >
                          {Array.isArray(sponsor.regions)
                            ? sponsor.regions.join(', ')
                            : sponsor.regions}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {globalSearchValue &&
              !isLoading &&
              (!!data?.deals?.length || !!data?.sponsors?.length) && (
                <Fade in={Boolean(globalSearchValue)}>
                  <Link href={searchLink} onClick={handleShowAllLinkClick}>
                    <Typography sx={classes.showAllLink} variant="body1">
                      Show all results for {globalSearchValue}
                    </Typography>
                  </Link>
                </Fade>
              )}
            {!data?.deals?.length && !data?.sponsors?.length && (
              <Typography variant="caption" sx={classes.noResults}>
                No results found
              </Typography>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default GlobalSearch;
