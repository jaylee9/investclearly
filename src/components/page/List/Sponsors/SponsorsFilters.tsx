import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { RATINGS } from '@/config/constants';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSponsorsFiltersStyles } from './styles';
import { Regions } from '@/backend/constants/enums/regions';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import Button from '@/components/common/Button';
import theme from '@/config/theme';

export interface ISponsorFilters {
  ratings?: number[];
  primaryAssetClasses?: string[];
  regionalFocus?: string[];
  activelyRising?: boolean;
}

interface SponsorsFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<ISponsorFilters>>;
  filters: ISponsorFilters;
  handleApplyFilters: () => void;
  disabledApplyFilters: boolean;
}

const SponsorsFilters = ({
  setFilters,
  filters,
  handleApplyFilters,
  disabledApplyFilters,
}: SponsorsFiltersProps) => {
  const classes = useSponsorsFiltersStyles();

  const [showAll, setShowAll] = useState({
    asset_classes: false,
    sec_industry: false,
  });

  const handleStringArrayChange = (
    key: 'primaryAssetClasses' | 'regionalFocus',
    value: Regions | string
  ) => {
    const updatedArray = filters[key]?.includes(value)
      ? filters[key]?.filter(item => item !== value)
      : [...(filters[key] || []), value];

    setFilters({ ...filters, [key]: updatedArray });
  };

  //rating
  const handleRatingChange = (value: number) => {
    if (filters.ratings?.includes(value)) {
      const ratings = filters.ratings.filter(item => item !== value);
      setFilters({ ...filters, ratings });
    } else if (filters.ratings) {
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
    ? Object.values(AssetClasses)
    : Object.values(AssetClasses).slice(0, 8);

  return (
    <Box>
      <CustomAccordion label="Sponsor Rating">
        <Box sx={classes.accordionContent}>
          {RATINGS.map(rating => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={rating}
              onChange={() => handleRatingChange(rating)}
              checked={filters.ratings?.includes(rating)}
              label={
                <Box sx={classes.starsWrapper}>
                  {[...Array(5)].map((_, i) => {
                    const iconColor =
                      i < rating
                        ? theme.palette.secondary.main
                        : theme.palette.background.paper;
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
                key={assetClass}
                onChange={() =>
                  handleStringArrayChange('primaryAssetClasses', assetClass)
                }
                checked={filters.primaryAssetClasses?.includes(assetClass)}
                label={assetClass}
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
      <CustomAccordion label="Region">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {Object.values(Regions).map(region => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={region}
                onChange={() =>
                  handleStringArrayChange('regionalFocus', region)
                }
                checked={filters.regionalFocus?.includes(region)}
                label={region}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <Box sx={classes.buttonWrapper}>
        <Button onClick={handleApplyFilters} disabled={disabledApplyFilters}>
          Apply filters
        </Button>
      </Box>
    </Box>
  );
};

export default SponsorsFilters;
