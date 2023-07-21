import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { RATINGS } from '@/config/constants';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useDealsFiltersStyles } from './styles';
import CustomSlider from '@/components/common/Slider';
import { Regions } from '@/backend/constants/enums/regions';
import { InvestmentStructures } from '@/backend/constants/enums/investment-structures';
import { DealStatuses } from '@/backend/constants/enums/deal-statuses';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';

interface Range {
  from: number;
  to: number;
}

export interface IFilters {
  ratings?: number[];
  asset_classes?: string[];
  statuses?: string[];
  regions?: string[];
  investment_structure?: string[];
  targetIRR?: Range;
  actualIRR?: Range;
  fees?: Range;
  min_investment?: Range;
  prefferd_return?: Range;
}

const DealsFilters = () => {
  const classes = useDealsFiltersStyles();

  const [filters, setFilters] = useState<IFilters>({
    ratings: [],
    asset_classes: [],
    statuses: [],
    regions: [],
    investment_structure: [],
    targetIRR: {
      from: 2,
      to: 12,
    },
    actualIRR: {
      from: 2,
      to: 12,
    },
    fees: {
      from: 2,
      to: 12,
    },
    min_investment: {
      from: 5000,
      to: 25000,
    },
    prefferd_return: {
      from: 5000,
      to: 25000,
    },
  });
  const [showAll, setShowAll] = useState({
    asset_classes: false,
    sec_industry: false,
  });

  const handleStringArrayChange = (
    key: 'asset_classes' | 'statuses' | 'regions' | 'investment_structure',
    value: Regions | string
  ) => {
    const updatedArray = filters[key]?.includes(value)
      ? filters[key]?.filter(item => item !== value)
      : [...(filters[key] || []), value];

    setFilters({ ...filters, [key]: updatedArray });
  };

  //rating
  const handleRatingChange = (value: number) => {
    if (filters.ratings && filters.ratings.includes(value)) {
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

  //irr + min investment + fees
  const handleSliderChange = (
    values: number[],
    key:
      | 'targetIRR'
      | 'actualIRR'
      | 'fees'
      | 'min_investment'
      | 'preffered_return'
  ) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: {
        from: values[0],
        to: values[1],
      },
    }));
  };

  console.log(filters);
  return (
    <>
      <CustomAccordion label="Sponsor Rating">
        <Box sx={classes.accordionContent}>
          {RATINGS.map(rating => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={rating}
              onChange={() => handleRatingChange(rating)}
              checked={filters.ratings && filters.ratings.includes(rating)}
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
                key={assetClass}
                onChange={() =>
                  handleStringArrayChange('asset_classes', assetClass)
                }
                checked={
                  filters.asset_classes &&
                  filters.asset_classes.includes(assetClass)
                }
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
      <CustomAccordion label="Status">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {Object.values(DealStatuses).map(status => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={status}
                onChange={() => handleStringArrayChange('statuses', status)}
                checked={filters.statuses && filters.statuses.includes(status)}
                label={status}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Investment Structure">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {Object.values(InvestmentStructures).map(structure => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={structure}
                onChange={() =>
                  handleStringArrayChange('investment_structure', structure)
                }
                checked={
                  filters.investment_structure &&
                  filters.investment_structure.includes(structure)
                }
                label={structure}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Region">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {Object.values(Regions).map(region => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={region}
                onChange={() => handleStringArrayChange('regions', region)}
                checked={filters.regions && filters.regions.includes(region)}
                label={region}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Target IRR, %">
        <Box sx={classes.accordionContent}>
          <Box>
            <CustomSlider
              min={2}
              max={12}
              onSubmit={value =>
                handleSliderChange(value as number[], 'targetIRR')
              }
            />
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Actual IRR, %">
        <Box sx={classes.accordionContent}>
          <Box>
            <CustomSlider
              min={2}
              max={12}
              onSubmit={value =>
                handleSliderChange(value as number[], 'actualIRR')
              }
            />
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Fees, %">
        <Box sx={classes.accordionContent}>
          <Box>
            <CustomSlider
              min={2}
              max={12}
              onSubmit={value => handleSliderChange(value as number[], 'fees')}
            />
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Minimum Investment, USD">
        <Box sx={classes.accordionContent}>
          <Box>
            <CustomSlider
              min={5000}
              max={25000}
              onSubmit={value =>
                handleSliderChange(value as number[], 'min_investment')
              }
            />
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Preffered Return, USD">
        <Box sx={classes.accordionContent}>
          <Box>
            <CustomSlider
              min={5000}
              max={25000}
              onSubmit={value =>
                handleSliderChange(value as number[], 'preffered_return')
              }
            />
          </Box>
        </Box>
      </CustomAccordion>
    </>
  );
};

export default DealsFilters;
