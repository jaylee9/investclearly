import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { RATINGS, STATUSES } from '@/config/constants';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useDealsFiltersStyles } from './styles';
import { assetClasses } from '@/components/common/Layout/Header';

interface IFilters {
  ratings: number[];
  asset_classes: string[];
  statuses: string[];
}

const DealsFilters = () => {
  const classes = useDealsFiltersStyles();

  const [filters, setFilters] = useState<IFilters>({
    ratings: [],
    asset_classes: [],
    statuses: [],
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

  //statuses
  const handleStatusesChange = (value: string) => {
    if (filters.statuses.includes(value)) {
      const statuses = filters.statuses.filter(item => item !== value);
      setFilters({ ...filters, statuses });
    } else {
      const statuses = [...filters.statuses, value];
      setFilters({ ...filters, statuses });
    }
  };
  return (
    <>
      <CustomAccordion label="Sponsor Rating">
        <Box sx={classes.accordionContent}>
          {RATINGS.map(rating => (
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
      <CustomAccordion label="Status">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {STATUSES.map(status => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={status.value}
                onChange={() => handleStatusesChange(status.value)}
                checked={filters.statuses.includes(status.value)}
                label={status.label}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
    </>
  );
};

export default DealsFilters;
