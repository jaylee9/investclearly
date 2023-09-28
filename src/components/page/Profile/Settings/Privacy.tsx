import { Box, Typography } from '@mui/material';
import { buttonsWrapper, useBooleanSettingsStyles } from './styles';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { useUser } from '@/contexts/User';
import Loading from '@/components/common/Loading';
import { useState } from 'react';
import {
  UpdateProfileSettingPayload,
  updateProfileSettings,
} from '@/actions/user/profile-settings';
import Button from '@/components/common/Button';
import sanitizeUserUpdatePayload from '@/helpers/sanitizeUserUpdatePayload';
import { PublicUserInterface } from '@/backend/services/users/interfaces/public-user.interface';

const headerLabels = ['Visibility', 'Personal info'];

type SettingsNames = 'totalInvestedAmountVisibility' | 'yourDealsVisibility';

interface Condition {
  label: string;
  name: SettingsNames;
}

const settings: Condition[] = [
  { label: 'Total invested amount', name: 'totalInvestedAmountVisibility' },
  { label: 'Your deals', name: 'yourDealsVisibility' },
];

const validationSchema = z.object({
  totalInvestedAmountVisibility: z.boolean(),
  yourDealsVisibility: z.boolean(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const PrivacySettings = () => {
  const classes = useBooleanSettingsStyles();

  const { user, setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      totalInvestedAmountVisibility: user?.totalInvestedAmountVisibility,
      yourDealsVisibility: user?.yourDealsVisibility,
    },
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const formattedUser = sanitizeUserUpdatePayload(
      user as PublicUserInterface
    );
    const response = await updateProfileSettings({
      ...formattedUser,
      ...data,
    } as UpdateProfileSettingPayload);
    if (!('error' in response)) {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      reset();
    }
    setIsLoading(false);
  });

  if (!user) {
    return <Loading />;
  }

  return (
    <Box sx={classes.root}>
      <Typography variant="body1" sx={classes.title}>
        Choose the visibility of personal info
      </Typography>
      <Box sx={classes.header}>
        {headerLabels.map((label, index) => (
          <Typography
            variant="caption"
            fontWeight={600}
            key={label}
            className={index === 0 ? 'fixedWidth' : ''}
          >
            {label}
          </Typography>
        ))}
      </Box>
      <form onSubmit={onSubmit} className="form">
        <Box>
          {settings.map((item, index) => (
            <Box
              key={item.name}
              sx={classes.condition}
              className={index === 0 ? 'fisrtCondition' : ''}
            >
              <Box sx={classes.checkboxWrapper}>
                <Controller
                  control={control}
                  name={item.name}
                  render={({ field: { onChange, value } }) => (
                    <CustomCheckbox onChange={onChange} checked={value} />
                  )}
                />
              </Box>
              <Typography variant="body1">{item.label}</Typography>
            </Box>
          ))}
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

export default PrivacySettings;
