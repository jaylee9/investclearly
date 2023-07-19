import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import DealCard, { DealCardVariant } from '@/components/common/DealCard';
import Layout from '@/components/common/Layout';
import { assetClasses } from '@/components/common/Layout/Header';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealsPageStyles from '@/pages_styles/dealsStyles';
import { IDeal } from '@/types/deal';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

interface IFilters {
  ratings: number[];
  asset_classes: string[];
}

const mockData: IDeal[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: true,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Lolo Peak Village',
    location: 'Lolo, Montana',
    status: 'In development',
    cost: '28-30',
    promoted: false,
    sponsor_name: 'Cloud Investment Ltd',
    rating: 4.9,
    rating_amount: 115,
    min_investment: 5000,
    asset_class: 'Co-Living',
  },
];

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Investment', value: 'investment' },
];

const ratings = [5, 4, 3];

const Deals = () => {
  const classes = useDealsPageStyles();

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });

  const [filters, setFilters] = useState<IFilters>({
    ratings: [],
    asset_classes: [],
  });
  const [showAll, setShowAll] = useState({
    asset_classes: false,
    sec_industry: false,
  });

  //rating
  const handleRatingChange = (value: number) => {
    if (filters.ratings.includes(value)) {
      const ratings = filters.ratings.filter(item => item !== value);
      setFilters({ ...filters, ratings });
    } else {
      const ratings = [...filters.ratings, value];
      setFilters({ ...filters, ratings });
    }
  };

  //asset_classes

  const handleShowMoreAssetClasses = () => {
    if (showAll.asset_classes) {
      setShowAll({ ...showAll, asset_classes: false });
    } else {
      setShowAll({ ...showAll, asset_classes: true });
    }
  };

  const assetClassesToShow = showAll.asset_classes
    ? assetClasses
    : assetClasses.slice(0, 8);

  const handleAssetClassChange = (value: string) => {
    if (filters.asset_classes.includes(value)) {
      const asset_classes = filters.asset_classes.filter(
        item => item !== value
      );
      setFilters({ ...filters, asset_classes });
    } else {
      const asset_classes = [...filters.asset_classes, value];
      setFilters({ ...filters, asset_classes });
    }
  };

  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.leftColumn}>
          <CustomAccordion label="Sponsor Rating">
            <Box sx={classes.accordionContent}>
              {ratings.map(rating => (
                <CustomCheckbox
                  customStyles={classes.ratingCheckbox}
                  key={rating}
                  onChange={() => handleRatingChange(rating)}
                  checked={filters.ratings.includes(rating)}
                  label={
                    <Box sx={classes.starsWrapper}>
                      {[...Array(5)].map((_, i) => {
                        const iconColor = i < rating ? '#F58F29' : '#DBE4F2';
                        return (
                          <i
                            key={i}
                            style={{ color: iconColor }}
                            className="icon-Star"
                          ></i>
                        );
                      })}
                    </Box>
                  }
                />
              ))}
            </Box>
          </CustomAccordion>
          <CustomAccordion label="Asset Class">
            <Box sx={classes.accordionContent}>
              <Box sx={classes.assetClassesWrapper}>
                {assetClassesToShow.map(assetClass => (
                  <CustomCheckbox
                    customStyles={classes.ratingCheckbox}
                    key={assetClass.value}
                    onChange={() => handleAssetClassChange(assetClass.value)}
                    checked={filters.asset_classes.includes(assetClass.value)}
                    label={assetClass.value}
                  />
                ))}
              </Box>
              <Typography
                variant="body1"
                sx={classes.showMore}
                onClick={handleShowMoreAssetClasses}
              >
                {showAll.asset_classes ? 'Hide' : 'Show more'}{' '}
                <span
                  className={`icon-Caret-down ${
                    showAll.asset_classes ? 'rotate' : ''
                  }`}
                ></span>
              </Typography>
            </Box>
          </CustomAccordion>
        </Box>
        <Box sx={classes.rightColumn}>
          <Box sx={classes.rightColumnHeader}>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>{mockData.length} Deals</span>{' '}
              found for Invest
            </Typography>
            <Box sx={classes.selectWrapper}>
              <Typography variant="body1">Sort by:</Typography>
              <Box sx={classes.selectContent}>
                <CustomSelect
                  options={sortOptions}
                  placeholder="Search"
                  variant={SelectVariant.Dark}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={classes.dealsWrapper}>
            {mockData.map(deal => (
              <DealCard
                key={deal.id}
                deal={deal}
                variant={DealCardVariant.Large}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Deals;
