import CustomAccordion from '@/components/common/Accordion';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { RATINGS } from '@/config/constants';
import { Box, Fade, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDealsFiltersStyles } from './styles';
import CustomSlider from '@/components/common/Slider';
import { Regions } from '@/backend/constants/enums/regions';
import { InvestmentStructures } from '@/backend/constants/enums/investment-structures';
import { DealStatuses } from '@/backend/constants/enums/deal-statuses';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { Exemptions } from '@/backend/constants/enums/exemptions';
import Button from '@/components/common/Button';
import { Regulations } from '@/backend/constants/enums/regulations';
import { RangeData } from '@/actions/deals';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Close } from '@mui/icons-material';
import theme from '@/config/theme';

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
  exemptions?: string[];
  regulations?: string[];
  targetIRR?: Range;
  actualIRR?: Range;
  fees?: Range;
  min_investment?: Range;
  preffered_return?: Range;
}

interface DealsFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  filters: IFilters;
  handleApplyFilters: () => void;
  disabledApplyFilters: boolean;
  rangeData: RangeData;
  isChangedFilters?: boolean;
  handleClearFilters?: () => void;
}

export const DealsFilters: FC<DealsFiltersProps> = ({
  setFilters,
  filters,
  handleApplyFilters,
  disabledApplyFilters,
  rangeData,
  isChangedFilters,
  handleClearFilters,
}) => {
  const { isDesktop } = useBreakpoints();
  const classes = useDealsFiltersStyles();

  const [showAll, setShowAll] = useState({
    asset_classes: false,
    sec_industry: false,
  });

  const handleStringArrayChange = (
    key:
      | 'asset_classes'
      | 'statuses'
      | 'regions'
      | 'investment_structure'
      | 'exemptions'
      | 'regulations',
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
      <CustomAccordion label="Minimum Investment, USD">
        <Box>
          <CustomSlider
            min={Number(rangeData.minInvestment)}
            max={Number(rangeData.maxInvestment)}
            onChange={value =>
              handleSliderChange(value as number[], 'min_investment')
            }
            value={[
              Number(filters.min_investment?.from),
              Number(filters.min_investment?.to),
            ]}
          />
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
                  handleStringArrayChange('asset_classes', assetClass)
                }
                checked={filters.asset_classes?.includes(assetClass)}
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
      <CustomAccordion label="Target IRR, %">
        <Box>
          <CustomSlider
            min={rangeData.minTargetIRR}
            max={rangeData.maxTargetIRR}
            onChange={value =>
              handleSliderChange(value as number[], 'targetIRR')
            }
            value={[
              filters.targetIRR?.from as number,
              filters.targetIRR?.to as number,
            ]}
          />
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Actual IRR, %">
        <Box>
          <CustomSlider
            min={rangeData.minActualIRR}
            max={rangeData.maxActualIRR}
            onChange={value =>
              handleSliderChange(value as number[], 'actualIRR')
            }
            value={[
              filters.actualIRR?.from as number,
              filters.actualIRR?.to as number,
            ]}
          />
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Fees, %">
        <Box>
          <CustomSlider
            min={rangeData.minFee}
            max={rangeData.maxFee}
            onChange={value => handleSliderChange(value as number[], 'fees')}
            value={[filters.fees?.from as number, filters.fees?.to as number]}
          />
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Preferred Return, %">
        <Box>
          <CustomSlider
            min={rangeData.minPreferredReturn}
            max={rangeData.maxPreferredReturn}
            onChange={value =>
              handleSliderChange(value as number[], 'preffered_return')
            }
            value={[
              filters.preffered_return?.from as number,
              filters.preffered_return?.to as number,
            ]}
          />
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Status">
        <Box sx={classes.accordionContent}>
          {Object.values(DealStatuses).map(status => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={status}
              onChange={() => handleStringArrayChange('statuses', status)}
              checked={filters.statuses?.includes(status)}
              label={status}
            />
          ))}
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Region">
        <Box sx={classes.accordionContent}>
          {Object.values(Regions).map(region => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={region}
              onChange={() => handleStringArrayChange('regions', region)}
              checked={filters.regions?.includes(region)}
              label={region}
            />
          ))}
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Regulation">
        <Box sx={classes.accordionContent}>
          {Object.values(Regulations).map(regulation => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={regulation}
              onChange={() =>
                handleStringArrayChange('regulations', regulation)
              }
              checked={filters.regulations?.includes(regulation)}
              label={regulation}
            />
          ))}
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Exemption">
        <Box sx={classes.accordionContent}>
          {Object.values(Exemptions).map(exemption => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={exemption}
              onChange={() => handleStringArrayChange('exemptions', exemption)}
              checked={filters.exemptions?.includes(exemption)}
              label={exemption}
            />
          ))}
        </Box>
      </CustomAccordion>
      <CustomAccordion label="Investment Type">
        <Box sx={classes.accordionContent}>
          {Object.values(InvestmentStructures).map(structure => (
            <CustomCheckbox
              customStyles={classes.ratingCheckbox}
              key={structure}
              onChange={() =>
                handleStringArrayChange('investment_structure', structure)
              }
              checked={filters.investment_structure?.includes(structure)}
              label={structure}
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

interface FilterDesktopHeaderProps {
  isChangedFilters?: boolean;
  handleClearFilters?: () => void;
  onClose?: () => void;
}

export const DealsFiltersHeader: FC<FilterDesktopHeaderProps> = ({
  isChangedFilters,
  handleClearFilters,
  onClose,
}) => {
  const { isDesktop } = useBreakpoints();
  const classes = useDealsFiltersStyles();

  return (
    <Box sx={classes.mobileHeader}>
      <Typography variant="h5" sx={classes.mobileHeaderTitle}>
        Filters
      </Typography>
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
          customStyles={classes.mobileHeaderIcon}
        >
          <Close />
        </Button>
      )}
    </Box>
  );
};
