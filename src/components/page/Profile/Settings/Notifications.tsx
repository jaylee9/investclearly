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
import { USER_OBJECT_LOCALSTORAGE_KEY } from '@/config/constants';

const headerLabels = ['Email', 'Notifications'];

type SettingsNames =
  | 'reviewWasPublishedAfterModerationEmail'
  | 'reviewWasDeclinedAfterModerationEmail'
  | 'newDealMathingYourInvestmentPreferencesEmail'
  | 'newDealFromTheSponsorYouSavedEmail'
  | 'newReviewHasBeenSharedToSponsorEmail';

interface Condition {
  label: string;
  name: SettingsNames;
}

const settings: Condition[] = [
  {
    label: 'Your review was published after moderation',
    name: 'reviewWasPublishedAfterModerationEmail',
  },
  {
    label: 'Your review was declined after moderation',
    name: 'reviewWasDeclinedAfterModerationEmail',
  },
  {
    label: 'New deal matching your investment preferences',
    name: 'newDealMathingYourInvestmentPreferencesEmail',
  },
  {
    label: 'New deal from the sponsor you saved',
    name: 'newDealFromTheSponsorYouSavedEmail',
  },
  {
    label: 'New review has been shared by a sponsor you have saved',
    name: 'newReviewHasBeenSharedToSponsorEmail',
  },
];

const validationSchema = z.object({
  reviewWasPublishedAfterModerationEmail: z.boolean(),
  reviewWasDeclinedAfterModerationEmail: z.boolean(),
  newDealMathingYourInvestmentPreferencesEmail: z.boolean(),
  newDealFromTheSponsorYouSavedEmail: z.boolean(),
  newReviewHasBeenSharedToSponsorEmail: z.boolean(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const Notifications = () => {
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
      reviewWasPublishedAfterModerationEmail:
        user?.reviewWasPublishedAfterModerationEmail,
      reviewWasDeclinedAfterModerationEmail:
        user?.reviewWasDeclinedAfterModerationEmail,
      newDealMathingYourInvestmentPreferencesEmail:
        user?.newDealMathingYourInvestmentPreferencesEmail,
      newDealFromTheSponsorYouSavedEmail:
        user?.newDealFromTheSponsorYouSavedEmail,
      newReviewHasBeenSharedToSponsorEmail:
        user?.newReviewHasBeenSharedToSponsorEmail,
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
      localStorage.setItem(
        USER_OBJECT_LOCALSTORAGE_KEY,
        JSON.stringify(response)
      );
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
        Select the kinds or notifications you get about your interests and
        actions.
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

export default Notifications;
