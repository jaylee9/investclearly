import { Box, Typography } from '@mui/material';
import { useInvestmentPreferencesStepStyles } from './styles';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import MultiButtons from '@/components/common/MultiButtons';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import { Regions } from '@/backend/constants/enums/regions';
import CustomSlider from '@/components/common/Slider';
import { updateProfileSettings } from '@/actions/user/profile-settings';
import { InvestorStatuses } from '@/backend/constants/enums/investor-statuses';
import { IncomeAndNetWorth } from '@/backend/constants/enums/income-and-worth';

interface Range {
  from: number;
  to: number;
}

interface InvestmentPreferences {
  assetClasses: string[];
  regions: string[];
  holdPeriod: Range;
  minInvestment: Range;
}

const InvestmentPreferencesStep = () => {
  const defaultInvestmentPreferences = {
    assetClasses: [],
    regions: [],
    holdPeriod: {
      from: 1,
      to: 10,
    },
    minInvestment: {
      from: 5000,
      to: 25000,
    },
  };
  const classes = useInvestmentPreferencesStepStyles();
  const router = useRouter();
  const [investmentPreferences, setInvestmentPreferences] =
    useState<InvestmentPreferences>(
      {
        ...JSON.parse(localStorage.getItem('investmentPreferences') as string),
        ...defaultInvestmentPreferences,
      } || defaultInvestmentPreferences
    );
  const handleBackClick = () => {
    router.push('/onboarding?step=2');
  };
  const handleStepClick = async (type: 'skip' | 'next') => {
    if (type === 'next') {
      const investorStatus = localStorage.getItem(
        'investorStatus'
      ) as InvestorStatuses;
      const incomeAndNetWorth = localStorage.getItem(
        'incomeAndNetWorth'
      ) as IncomeAndNetWorth;

      const payload = {
        assetClasses: investmentPreferences.assetClasses as AssetClasses[],
        regions: investmentPreferences.regions as Regions[],
        minimumInvestmentMin: investmentPreferences.minInvestment.from,
        minimumInvestmentMax: investmentPreferences.minInvestment.to,
        holdPeriodMin: investmentPreferences.minInvestment.from,
        holdPeriodMax: investmentPreferences.minInvestment.to,
        investorStatus,
        incomeAndNetWorth,
      };
      const response = await updateProfileSettings(payload);
      if (response) {
        localStorage.clear();
        router.push('/');
      }
    }
  };
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

  const handleMultiplyButtonClick = ({
    value,
    key,
  }: {
    value: string;
    key: 'assetClasses' | 'regions';
  }) => {
    if (investmentPreferences[key].includes(value)) {
      const formattedArray = investmentPreferences[key].filter(
        (item: string) => item !== value
      );
      setInvestmentPreferences({
        ...investmentPreferences,
        [key]: formattedArray,
      });
    } else {
      setInvestmentPreferences({
        ...investmentPreferences,
        [key]: [...investmentPreferences[key], value],
      });
    }
  };
  const handleSliderChange = (
    values: number[],
    key: 'holdPeriod' | 'minInvestment'
  ) => {
    setInvestmentPreferences(prevPreferences => ({
      ...prevPreferences,
      [key]: {
        from: values[0],
        to: values[1],
      },
    }));
  };
  return (
    <Box sx={classes.root}>
      <Box>
        <Box>
          <Typography variant="h4">Investment preferences</Typography>
          <Typography variant="body1" sx={classes.subTitle}>
            Tell us more about your preferences to personalize your investment
            journey. You can change this later at any time
          </Typography>
        </Box>
        <Box sx={classes.content}>
          <MultiButtons
            buttons={assetClassesArray}
            onButtonClick={value =>
              handleMultiplyButtonClick({ value, key: 'assetClasses' })
            }
            activeValues={investmentPreferences.assetClasses}
            label="Asset class"
          />
          <MultiButtons
            buttons={regionsArray}
            onButtonClick={value =>
              handleMultiplyButtonClick({ value, key: 'regions' })
            }
            activeValues={investmentPreferences.regions}
            label="Region"
          />
          <Box>
            <Typography variant="caption" marginBottom="8px" fontWeight={600}>
              Hold Period
            </Typography>
            <CustomSlider
              min={1}
              max={10}
              value={[
                investmentPreferences.holdPeriod.from,
                investmentPreferences.holdPeriod.to,
              ]}
              onChange={value =>
                handleSliderChange(value as number[], 'holdPeriod')
              }
            />
          </Box>
          <Box>
            <Typography variant="caption" marginBottom="8px" fontWeight={600}>
              Hold Period
            </Typography>
            <CustomSlider
              min={5000}
              max={25000}
              value={[
                investmentPreferences.minInvestment.from,
                investmentPreferences.minInvestment.to,
              ]}
              onChange={value =>
                handleSliderChange(value as number[], 'minInvestment')
              }
            />
          </Box>
        </Box>
      </Box>
      <Box sx={classes.footer}>
        <Box>
          <Button variant="tertiary" onClick={handleBackClick}>
            Back
          </Button>
        </Box>
        <Box sx={classes.actionButtons}>
          <Button variant="secondary" onClick={() => handleStepClick('skip')}>
            Skip
          </Button>
          <Button onClick={() => handleStepClick('next')}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InvestmentPreferencesStep;
