import withPublicRoute from '@/HOC/withPublicRoute';
import {
  UpdateProfileSettingPayload,
  updateProfileSettings,
} from '@/actions/user/profile-settings';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import Layout, { LayoutVariant } from '@/components/common/Layout';
import { useUser } from '@/contexts/User';
import sanitizeUserUpdatePayload from '@/helpers/sanitizeUserUpdatePayload';
import useOnboardingPageStyles from '@/pages_styles/onboardingPageStyles';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InvestmentPreferencesForm from '@/components/page/Profile/Settings/InvestmentPreferencesForm';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';

const validationSchema = z.object({
  investorStatus: z.string().optional(),
  incomeAndNetWorth: z.string().optional(),
  assetClasses: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  holdPeriod: z.array(z.number()).optional(),
  minInvestment: z.array(z.number()).optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const Onboarding = () => {
  const classes = useOnboardingPageStyles();

  const router = useRouter();

  const { user, setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      investorStatus: 'yes',
      incomeAndNetWorth: 'yes',
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
      router.push('/');
      localStorage.setItem(
        USER_OBJECT_LOCALSTORAGE_KEY,
        JSON.stringify(response)
      );
    }
    setIsLoading(false);
  });

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

  const handleSkip = () => router.push('/');

  return (
    <Layout variant={LayoutVariant.Entry} isEntrySpacing>
      <form style={classes.form} onSubmit={onSubmit}>
        <Box sx={classes.wrapper}>
          <Typography sx={classes.title}>
            Tell us more about yourself
          </Typography>
          <Typography variant="body1" sx={classes.subTitle}>
            You can change this information later at any time
          </Typography>
          <InvestmentPreferencesForm
            control={control}
            handleMultiButtonSelection={handleMultiButtonSelection}
            accreditedLabel="Are you an accredited investor?"
            accreditedYesAnswer="Yes, I am accredited"
            accreditedNoAnswer="Not Accredited Investor"
          />
        </Box>
        <Box sx={classes.buttonsWrapper}>
          <Button variant="secondary" disabled={isLoading} onClick={handleSkip}>
            Skip for now
          </Button>
          <Button type="submit" disabled={isLoading || !isDirty}>
            Get started
          </Button>
        </Box>
      </form>
    </Layout>
  );
};

export default withPublicRoute(Onboarding);
