import React, { useRef, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useGlobalSearchStyles } from './styles';
import { Box, Fade, Typography } from '@mui/material';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import Image from 'next/image';
import { GlobalSearchResponse, globalSearch } from '@/actions/common';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';

const MOCK_IMAGE_URL =
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

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
  const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [data, setData] = useState<GlobalSearchResponse>(
    searchResponse as GlobalSearchResponse
  );
  const ref = useRef(null);
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

  const handleShowAllLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpenGlobalSearch(false);
    if (onChangeSearch) {
      onChangeSearch(globalSearchValue);
    }
  };

  useQuery(
    ['globalSearch', globalSearchValue],
    () => globalSearch({ search: globalSearchValue }),
    {
      onSuccess: response => {
        setData(response as GlobalSearchResponse);
      },
      keepPreviousData: true,
    }
  );
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
          endComponent={
            <Button
              customStyles={{
                boxSizing: 'border-box',
                padding: '12px 40px !important',
                height: '48px !important',
              }}
            >
              Search
            </Button>
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
          onChange={handleChange}
        />
      )}
      {isOpenGlobalSearch && (
        <Fade in={isOpenGlobalSearch}>
          <Box sx={classes.searchContent}>
            {!!data?.deals?.length && (
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
                  {data.deals.map(deal => (
                    <Box sx={classes.blockListItem} key={deal.id}>
                      <Image
                        src={MOCK_IMAGE_URL}
                        alt="Deal image"
                        width={48}
                        height={48}
                        style={classes.blockListItemImage}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={classes.blockListItemContentTitle}
                        >
                          {deal.dealLegalName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={classes.blockListItemDefaultText}
                          marginBottom={6}
                        >
                          {deal.region}
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
            {!!data?.sponsors?.length && (
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
                  {data.sponsors.map(sponsor => (
                    <Box sx={classes.blockListItem} key={sponsor.id}>
                      <Image
                        src={MOCK_IMAGE_URL}
                        alt="Deal image"
                        width={48}
                        height={48}
                        style={classes.blockListItemImage}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={classes.blockListItemContentTitle}
                        >
                          {sponsor.legalName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={classes.sponsorRating}
                        >
                          <i className="icon-Star"></i>
                          <span>4.9</span>
                          <span>(115)</span>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={classes.blockListItemDefaultText}
                          marginBottom={6}
                        >
                          {sponsor.region}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {globalSearchValue && (
              <Fade in={Boolean(globalSearchValue)}>
                <Link href={`/list?type=deals&search=${globalSearchValue}`}>
                  <Typography sx={classes.showAllLink} variant="body1">
                    Show all results for {globalSearchValue}
                  </Typography>
                </Link>
              </Fade>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default GlobalSearch;
