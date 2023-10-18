import React, { useEffect, useRef, useState } from 'react';
import { useGlobalSearchStyles } from '../styles';
import { Box, Fade, SxProps, Theme, Typography } from '@mui/material';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import { GlobalSearchResponse, globalSearch } from '@/actions/common';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import Loading from '@/components/common/Loading';
import { useRouter } from 'next/router';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import { GlobalSearchInput } from './GlobalSearchInput';
import { HeaderType } from '../../../../hooks/useHeaderProps';
import Button from '@/components/common/Button';
import { capitalize } from '@/helpers/formatLocations';

export enum GlobalSearchVariant {
  BASE = 'base',
  SMALL = 'sm',
  LARGE = 'lg',
}
interface GlobalSearchProps {
  type?: HeaderType;
  searchResponse?: GlobalSearchResponse;
  variant?: GlobalSearchVariant;
  onChangeSearch?: (value: string) => void;
  isMobileSearchInput?: boolean;
  setIsMobileSearchInput?: (value: boolean) => void;
  isOpenGlobalSearch?: boolean;
  setIsOpenGlobalSearch?: (value: boolean) => void;
}

const GlobalSearch = ({
  type,
  searchResponse,
  variant = GlobalSearchVariant.LARGE,
  onChangeSearch,
  isMobileSearchInput = false,
  setIsMobileSearchInput,
  isOpenGlobalSearch,
  setIsOpenGlobalSearch,
}: GlobalSearchProps) => {
  const router = useRouter();
  const { search, type: queryType } = router.query;
  const classes = useGlobalSearchStyles({
    type,
    variant,
    isMobileSearchInput,
  });
  const [value, setValue] = useState(search || '');
  const [globalSearchValue, setGlobalSearchValue] = useState(
    (search as string) || ''
  );
  const [data, setData] = useState<GlobalSearchResponse>(
    searchResponse as GlobalSearchResponse
  );
  const ref = useRef(null);

  const handleOpen = () => {
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(true);
  };
  const handleClose = () => {
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
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
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
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

  const hasSponsors = data?.sponsors?.length;
  const searchType =
    hasSponsors || queryType === 'sponsors' ? 'sponsors' : 'deals';

  const searchLink = `/list?type=${
    searchType || 'sponsors'
  }&search=${globalSearchValue}`;

  const handleClearInput = () => {
    setValue('');
    setGlobalSearchValue('');
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
    if (queryType) {
      router.push(`/list?type=${searchType}`);
      if (onChangeSearch) {
        onChangeSearch('');
      }
    }
  };

  const handleSearchSubmit = () => {
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
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

  const mobileSearchInputHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMobileSearchInput && setIsMobileSearchInput(!isMobileSearchInput);
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
  };

  useEffect(() => {
    if (variant !== GlobalSearchVariant.SMALL) {
      setIsMobileSearchInput && setIsMobileSearchInput(false);
    }
    setIsOpenGlobalSearch && setIsOpenGlobalSearch(false);
  }, [setIsMobileSearchInput, variant, setIsOpenGlobalSearch]);

  return (
    <Box ref={ref} onClick={handleOpen} sx={classes.root as SxProps<Theme>}>
      <GlobalSearchInput
        variant={variant}
        handleKeyDown={handleKeyDown}
        searchLink={searchLink}
        handleChange={handleChange}
        isMobileSearchInput={isMobileSearchInput}
        handleChangeValue={handleChangeValue}
        handleClearInput={handleClearInput}
        value={value}
        mobileSearchInputHandler={mobileSearchInputHandler}
      />
      {isOpenGlobalSearch && (
        <Fade in={isOpenGlobalSearch}>
          <Box sx={classes.searchContent as SxProps<Theme>}>
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
                    <Button variant="tertiary" customStyles={{ padding: 0 }}>
                      Show all results
                    </Button>
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
                            {deal.vanityName}
                          </Typography>
                        </Link>
                        <Typography
                          variant="caption"
                          sx={classes.blockListItemDefaultText}
                          marginBottom={6}
                        >
                          {!!deal?.locations?.length &&
                          deal?.locations?.[0]?.stateOrCountryDescription
                            ? capitalize(
                                deal?.locations?.[0]?.stateOrCountryDescription
                              )
                            : 'N/A'}
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
                    <Button variant="tertiary" customStyles={{ padding: 0 }}>
                      Show all results
                    </Button>
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
                          {!!sponsor?.locations?.length
                            ? sponsor?.locations?.[0]?.stateOrCountryDescription
                            : 'N/A'}
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
                    <Button variant="tertiary" customStyles={{ padding: 0 }}>
                      Show all results for {globalSearchValue}
                    </Button>
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
