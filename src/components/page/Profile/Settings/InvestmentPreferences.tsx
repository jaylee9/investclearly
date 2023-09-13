import { Box, Typography } from '@mui/material';
import { buttonsWrapper, useInvestmentPreferencesStyles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/contexts/User';
import YesNoButtons from '@/components/common/YesNoButtons';
import Loading from '@/components/common/Loading';
import { AssetClasses } from '@/backend/constants/enums/asset-classes';
import MultiButtons from '@/components/common/MultiButtons';
import { Regions } from '@/backend/constants/enums/regions';
import CustomSlider from '@/components/common/Slider';
import {
  UpdateProfileSettingPayload,
  updateProfileSettings,
} from '@/actions/user/profile-settings';
import sanitizeUserUpdatePayload from '@/helpers/sanitizeUserUpdatePayload';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { useState } from 'react';
import Button from '@/components/common/Button';

const validationSchema = z.object({
  investorStatus: z.string().optional(),
  incomeAndNetWorth: z.string().optional(),
  assetClasses: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  holdPeriod: z.array(z.number()).optional(),
  minInvestment: z.array(z.number()).optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const InvestmentPreferences = () => {
  const classes = useInvestmentPreferencesStyles();

  const { user, setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      investorStatus:
        user?.investorStatus === 'Accredited Investor' ? 'yes' : 'no',
      incomeAndNetWorth:
        user?.incomeAndNetWorth === 'Yes, I have' ? 'yes' : 'no',
      assetClasses: user?.assetClasses,
      regions: user?.regions,
      holdPeriod: [user?.holdPeriodMin, user?.holdPeriodMax],
      minInvestment: [user?.minimumInvestmentMin, user?.minimumInvestmentMax],
    },
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const {
      minInvestment,
      holdPeriod,
      incomeAndNetWorth,
      investorStatus,
      ...rest
    } = data;
    const formattedUser = sanitizeUserUpdatePayload(
      user as PublicUserInterface
    );
    const response = await updateProfileSettings({
      ...formattedUser,
      minimumInvestmentMin: minInvestment?.[0],
      minimumInvestmentMax: minInvestment?.[1],
      holdPeriodMin: holdPeriod?.[0],
      holdPeriodMax: holdPeriod?.[1],
      investorStatus:
        investorStatus === 'yes'
          ? 'Accredited Investor'
          : 'Not Accredited Investor',
      incomeAndNetWorth:
        incomeAndNetWorth === 'yes' ? 'Yes, I have' : 'No, I do not have',
      ...rest,
    } as UpdateProfileSettingPayload);
    if (!('error' in response)) {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    }
    reset({}, { keepValues: true });
    setIsLoading(false);
  });

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

  const handleMultiButtonSelection = (
    onChange: (value: string[]) => void,
    currentValue: string[]
  ) => {
    return (selectedValue: string) => {
      if (currentValue.includes(selectedValue)) {
        onChange(currentValue.filter((val: string) => val !== selectedValue));
      } else {
        onChange([...currentValue, selectedValue]);
      }
    };
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <Box sx={classes.root}>
      <form onSubmit={onSubmit}>
        <Box sx={classes.section}>
          <Typography variant="h5" sx={classes.sectionTitle}>
            Investor Status
          </Typography>
          <Controller
            control={control}
            name={'investorStatus'}
            render={({ field: { onChange, value } }) => (
              <YesNoButtons
                onChange={onChange}
                activeValue={String(value)}
                yesTitle="Accredited Investor"
                noTitle="Not Accredited Investor"
              />
            )}
          />
        </Box>
        <Box sx={classes.section}>
          <Typography variant="h5" sx={classes.sectionTitle}>
            Income and net worth
          </Typography>
          <Typography variant="body1">Do you have either:</Typography>
          <ul style={classes.list}>
            <li>
              <Typography variant="body1">
                Annual income in excess of{' '}
                <span style={classes.bold}>$200,000</span> as an individual or
                excess of <span style={classes.bold}>$300,000</span> joint
                income for the last 2 years and expect the same for the current
                year
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Household net worth exceeds{' '}
                <span style={classes.bold}>$1M</span> excluding your primary
                residence
              </Typography>
            </li>
          </ul>
          <Controller
            control={control}
            name={'incomeAndNetWorth'}
            render={({ field: { onChange, value } }) => (
              <YesNoButtons
                onChange={onChange}
                activeValue={String(value)}
                yesTitle="Yes, I have"
                noTitle="No, I do not have "
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
        <Box sx={buttonsWrapper}>
          <Button type="submit" disabled={!isDirty || isLoading}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default InvestmentPreferences;
