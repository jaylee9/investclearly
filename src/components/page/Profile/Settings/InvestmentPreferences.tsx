import { Box } from '@mui/material';
import { buttonsWrapper, useInvestmentPreferencesStyles } from './styles';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/contexts/User';
import Loading from '@/components/common/Loading';
import {
  UpdateProfileSettingPayload,
  updateProfileSettings,
} from '@/actions/user/profile-settings';
import sanitizeUserUpdatePayload from '@/helpers/sanitizeUserUpdatePayload';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';
import { useState } from 'react';
import Button from '@/components/common/Button';
import InvestmentPreferencesForm from './InvestmentPreferencesForm';
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';

const validationSchema = z.object({
  investorStatus: z.string().optional(),
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
      assetClasses: user?.assetClasses,
      regions: user?.regions,
      holdPeriod: [user?.holdPeriodMin, user?.holdPeriodMax],
      minInvestment: [user?.minimumInvestmentMin, user?.minimumInvestmentMax],
    },
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const { minInvestment, holdPeriod, investorStatus, ...rest } = data;
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
      ...rest,
    } as UpdateProfileSettingPayload);
    if (!('error' in response)) {
      setUser(response);
      localStorage.setItem(
        USER_OBJECT_LOCALSTORAGE_KEY,
        JSON.stringify(response)
      );
    }
    reset({}, { keepValues: true });
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

  if (!user) {
    return <Loading />;
  }

  return (
    <Box sx={classes.root}>
      <form onSubmit={onSubmit}>
        <InvestmentPreferencesForm
          handleMultiButtonSelection={handleMultiButtonSelection}
          control={control}
          accreditedLabel="Investor Status"
          accreditedYesAnswer="Accredited Investor"
          accreditedNoAnswer="Not Accredited Investor"
        />
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
