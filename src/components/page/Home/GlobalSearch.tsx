import React, { useRef, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useGlobalSearchStyles } from './styles';
import { Box, Fade, Typography } from '@mui/material';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Link from 'next/link';
import Image from 'next/image';

type Deal = {
  id: number;
  name: string;
  location: string;
  types: string[];
  image: string;
};

const deals: Deal[] = [
  {
    id: 1,
    name: 'Miami Beach Apartments',
    location: 'Miami, FL',
    types: ['Industrial', 'Deal stage'],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    name: 'Austin Downtown Condos',
    location: 'Austin, TX',
    types: ['Residential', 'Offer stage'],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    name: 'Seattle Waterfront Villas',
    location: 'Seattle, WA',
    types: ['Residential', 'Pre-construction'],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const GlobalSearch = () => {
  const classes = useGlobalSearchStyles();
  const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const ref = useRef(null);
  const handleOpen = () => {
    setIsOpenGlobalSearch(true);
  };

  const handleClose = () => {
    setIsOpenGlobalSearch(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGlobalSearchValue(e.target.value);
  };
  useOnClickOutside(ref, handleClose);
  return (
    <Box ref={ref} onClick={handleOpen}>
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
        value={globalSearchValue}
      />
      {isOpenGlobalSearch && (
        <Fade in={isOpenGlobalSearch}>
          <Box sx={classes.searchContent}>
            <Box sx={classes.block}>
              <Box sx={classes.blockTitleWrapper}>
                <Typography variant="caption" sx={classes.blockTitle}>
                  Deals
                </Typography>
                <Link href="/deals">
                  <Typography variant="body1" sx={classes.showAllLink}>
                    Show all
                  </Typography>
                </Link>
              </Box>
              <Box>
                {deals.map(deal => (
                  <Box sx={classes.blockListItem} key={deal.id}>
                    <Image
                      src={deal.image}
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
                        {deal.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={classes.blockListItemDefaultText}
                        marginBottom={6}
                      >
                        {deal.location}
                      </Typography>
                      <Box sx={classes.dealTypes}>
                        {deal.types.map((type, index) => (
                          <React.Fragment key={type}>
                            <Typography
                              variant="caption"
                              sx={classes.blockListItemDefaultText}
                            >
                              {type}
                            </Typography>
                            {index !== deal.types.length - 1 && (
                              <Box className="round-divider" />
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={classes.block}>
              <Box sx={classes.blockTitleWrapper}>
                <Typography variant="caption" sx={classes.blockTitle}>
                  Deals
                </Typography>
                <Link href="/deals">
                  <Typography variant="body1" sx={classes.showAllLink}>
                    Show all
                  </Typography>
                </Link>
              </Box>
              <Box>
                {deals.map(deal => (
                  <Box sx={classes.blockListItem} key={deal.id}>
                    <Image
                      src={deal.image}
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
                        {deal.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={classes.blockListItemDefaultText}
                        marginBottom={6}
                      >
                        {deal.location}
                      </Typography>
                      <Box sx={classes.dealTypes}>
                        {deal.types.map((type, index) => (
                          <React.Fragment key={type}>
                            <Typography
                              variant="caption"
                              sx={classes.blockListItemDefaultText}
                            >
                              {type}
                            </Typography>
                            {index !== deal.types.length - 1 && (
                              <Box className="round-divider" />
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {globalSearchValue && (
              <Fade in={Boolean(globalSearchValue)}>
                <Link href={`allResults?=${globalSearchValue}`}>
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
