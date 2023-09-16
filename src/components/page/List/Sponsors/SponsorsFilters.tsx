import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { RATINGS } from '@/config/constants';
import { Box, Fade, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useSponsorComponentStyles, useSponsorsFiltersStyles } from './styles';
import { Regions } from '@/backend/constants/enums/regions';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import Button from '@/components/common/Button';
import theme from '@/config/theme';
import { Close } from '@mui/icons-material';
import { useBreakpoints } from '@/hooks/useBreakpoints';

export interface ISponsorFilters {
  ratings?: number[];
  primaryAssetClasses?: string[];
  regionalFocus?: string[];
  activelyRising?: boolean;
}

interface SponsorsFiltersProps {
  setFilters: Dispatch<SetStateAction<ISponsorFilters>>;
  filters: ISponsorFilters;
  handleApplyFilters: () => void;
  disabledApplyFilters: boolean;
  isChangedFilters?: boolean;
  handleClearFilters?: () => void;
}

export const SponsorsFilters: FC<SponsorsFiltersProps> = ({
  setFilters,
  filters,
  handleApplyFilters,
  disabledApplyFilters,
  isChangedFilters,
  handleClearFilters,
}) => {
  const classes = useSponsorsFiltersStyles();
  const { isDesktop } = useBreakpoints();

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
        <Box>
          <Box sx={classes.accordionContent}>
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
          {Object.values(Regions).map(region => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={region}
              onChange={() => handleStringArrayChange('regionalFocus', region)}
              checked={filters.regionalFocus?.includes(region)}
              label={region}
            />
          ))}
        </Box>
      </CustomAccordion>
      <Box sx={isDesktop ? classes.buttonWrapper : classes.mobileButtonWrapper}>
        <Fade in={isChangedFilters}>
          <Typography
            sx={classes.mobileClearButton}
            variant="body1"
            color={theme.palette.primary.light}
            onClick={handleClearFilters}
          >
            Clear filters
          </Typography>
        </Fade>
        <Button onClick={handleApplyFilters} disabled={disabledApplyFilters}>
          Apply filters
        </Button>
      </Box>
    </Box>
  );
};

interface SponsorsFiltersHeaderProps {
  isChangedFilters: boolean;
  handleClearFilters: () => void;
  setFilters: Dispatch<SetStateAction<ISponsorFilters>>;
  filters: ISponsorFilters;
  onClose?: () => void;
}

export const SponsorsFiltersHeader: FC<SponsorsFiltersHeaderProps> = ({
  isChangedFilters,
  handleClearFilters,
  setFilters,
  filters,
  onClose,
}) => {
  const classes = useSponsorComponentStyles();
  const { isDesktop } = useBreakpoints();

  return (
    <Box sx={classes.filtersHeaderWrapper}>
      <Box sx={classes.filtersHeaderTitleWrapper}>
        <Typography variant="h5">Filters</Typography>
        {isDesktop ? (
          isChangedFilters && (
            <Fade in={isChangedFilters}>
              <Typography variant="body1" onClick={handleClearFilters}>
                Clear filters
              </Typography>
            </Fade>
          )
        ) : (
          <Button
            variant="transparent"
            onClick={onClose}
            sxCustomStyles={classes.mobileHeaderIcon}
          >
            <Close />
          </Button>
        )}
      </Box>
      <Box>
        <CustomCheckbox
          onChange={e =>
            setFilters({ ...filters, activelyRising: e.target.checked })
          }
          checked={filters.activelyRising}
          label="Actively rising"
        />
      </Box>
    </Box>
  );
};
