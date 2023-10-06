import React from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { Regions } from '@/backend/constants/enums/regions';
import MultiButtons from '@/components/common/MultiButtons';
import CustomSlider from '@/components/common/Slider';
import YesNoButtons from '@/components/common/YesNoButtons';
import { useInvestmentPreferencesStyles } from './styles';

interface Props {
  control: Control;
  handleMultiButtonSelection: (
    onChange: (value: string[]) => void,
    currentValue: string[]
  ) => (selectedValue: string) => void;
  accreditedLabel: string;
  accreditedYesAnswer: string;
  accreditedNoAnswer: string;
}

const InvestmentPreferencesForm: React.FC<Props> = ({
  control,
  handleMultiButtonSelection,
  accreditedLabel,
  accreditedYesAnswer,
  accreditedNoAnswer,
}) => {
  const classes = useInvestmentPreferencesStyles();

  const assetClassesArray = [
    ...Object.keys(AssetClasses).map(key => {
      const value = AssetClasses[key as keyof typeof AssetClasses];
      return { value, label: value };
    }),
  ];

  const regionsArray = [
    ...Object.keys(Regions).map(key => {
      const value = Regions[key as keyof typeof Regions];
      return { value, label: value };
    }),
  ];

  return (
    <FormControl component="fieldset">
      <Box sx={classes.section}>
        <Typography variant="h5" sx={classes.sectionTitle}>
          {accreditedLabel}
        </Typography>
        <Typography variant="body1">Do you have either:</Typography>
        <ul style={classes.list}>
          <li>
            <Typography variant="body1">
              Annual income in excess of{' '}
              <span style={classes.bold}>$200,000</span> as an individual or
              excess of <span style={classes.bold}>$300,000</span> joint income
              for the last 2 years and expect the same for the current year
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Household net worth exceeds <span style={classes.bold}>$1M</span>{' '}
              excluding your primary residence
            </Typography>
          </li>
        </ul>
        <Controller
          control={control}
          name={'investorStatus'}
          render={({ field: { onChange, value } }) => (
            <YesNoButtons
              onChange={onChange}
              activeValue={String(value)}
              yesTitle={accreditedYesAnswer}
              noTitle={accreditedNoAnswer}
            />
          )}
        />
      </Box>
      <Box sx={classes.investmentPreferencesSection}>
        <Typography variant="h5" sx={classes.sectionTitle}>
          Investment preferences
        </Typography>
        <Box sx={classes.multiButtonWrapper}>
          <Controller
            control={control}
            name={'assetClasses'}
            render={({ field: { onChange, value } }) => (
              <MultiButtons
                buttons={assetClassesArray}
                label="Asset class"
                onButtonClick={handleMultiButtonSelection(
                  onChange,
                  value || []
                )}
                activeValues={value || []}
              />
            )}
          />
        </Box>
        <Box sx={classes.multiButtonWrapper}>
          <Controller
            control={control}
            name={'regions'}
            render={({ field: { onChange, value } }) => (
              <MultiButtons
                buttons={regionsArray}
                label="Region"
                onButtonClick={handleMultiButtonSelection(
                  onChange,
                  value || []
                )}
                activeValues={value || []}
              />
            )}
          />
        </Box>
        <Box sx={classes.sliderWrapper}>
          <Typography variant="caption" sx={classes.sliderTitle}>
            Hold Period
          </Typography>
          <Controller
            control={control}
            name={'holdPeriod'}
            render={({ field: { onChange, value } }) => (
              <CustomSlider
                onChange={onChange}
                min={0}
                max={10}
                value={value || [0, 10]}
              />
            )}
          />
        </Box>
        <Box sx={classes.sliderWrapper}>
          <Typography variant="caption" sx={classes.sliderTitle}>
            Minimum Investment, USD
          </Typography>
          <Controller
            control={control}
            name={'minInvestment'}
            render={({ field: { onChange, value } }) => (
              <CustomSlider
                onChange={onChange}
                min={1000}
                max={25000}
                value={value || [1000, 25000]}
              />
            )}
          />
        </Box>
      </Box>
    </FormControl>
  );
};

export default InvestmentPreferencesForm;
