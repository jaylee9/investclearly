import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import {
  INVESTMENT_STRUCTURES,
  RATINGS,
  REGIONS,
  STATUSES,
} from '@/config/constants';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useDealsFiltersStyles } from './styles';
import { assetClasses } from '@/components/common/Layout/Header';
import CustomSlider from '@/components/common/Slider';

interface Range {
  from: number;
  to: number;
}

interface IFilters {
  ratings: number[];
  asset_classes: string[];
  statuses: string[];
  regions: string[];
  investment_structure: string[];
  targetIRR: Range;
  actualIRR: Range;
  fees: Range;
  min_investment: Range;
  prefferd_return: Range;
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
    value: string
  ) => {
    if (Array.isArray(filters[key])) {
      const updatedArray = filters[key].includes(value)
        ? filters[key].filter(item => item !== value)
        : [...filters[key], value];
      setFilters({ ...filters, [key]: updatedArray });
    }
  };

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
                onChange={() =>
                  handleStringArrayChange('asset_classes', assetClass.value)
                }
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
                onChange={() =>
                  handleStringArrayChange('statuses', status.value)
                }
                checked={filters.statuses.includes(status.value)}
                label={status.label}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Investment Structure">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {INVESTMENT_STRUCTURES.map(structure => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={structure.value}
                onChange={() =>
                  handleStringArrayChange(
                    'investment_structure',
                    structure.value
                  )
                }
                checked={filters.investment_structure.includes(structure.value)}
                label={structure.label}
              />
            ))}
          </Box>
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Region">
        <Box sx={classes.accordionContent}>
          <Box sx={classes.assetClassesWrapper}>
            {REGIONS.map(region => (
              <CustomCheckbox
                customStyles={classes.ratingCheckbox}
                key={region.value}
                onChange={() =>
                  handleStringArrayChange('regions', region.value)
                }
                checked={filters.regions.includes(region.value)}
                label={region.label}
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
