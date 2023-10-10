import { Box, Typography } from '@mui/material';
import { useReviewDetailsStepStyles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import CustomRating from '../CustomRating';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import CustomTextArea from '../TextArea';
import Button from '../Button';
import { CreateReviewPayloadInterface } from '@/actions/reviews';

const validationSchema = z.object({
  title: z.string().min(1, 'Title is required field'),
  preInvestmentCommunicationRating: z.number(),
  postInvestmentCommunicationRating: z.number(),
  strengthOfLeadershipTeamRating: z.number(),
  alignmentOfExpectationsRating: z.number(),
  preInvestmentCommunicationComment: z.string().optional(),
  postInvestmentCommunicationComment: z.string().optional(),
  strengthOfLeadershipTeamComment: z.string().optional(),
  alignmentOfExpectationsComment: z.string().optional(),
  overallRating: z.number(),
  overallComment: z.string().min(1, 'Required field'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface ActiveComments {
  preInvestmentCommunicationComment: boolean;
  postInvestmentCommunicationComment: boolean;
  strengthOfLeadershipTeamComment: boolean;
  alignmentOfExpectationsComment: boolean;
}

interface ReviewDetailsStepProps {
  setStep: (value: number) => void;
  step: number;
  payload: CreateReviewPayloadInterface;
  setPayload: (value: CreateReviewPayloadInterface) => void;
  isEdit?: boolean;
}

const ReviewDetailsStep = ({
  setStep,
  step,
  payload,
  setPayload,
  isEdit,
}: ReviewDetailsStepProps) => {
  const classes = useReviewDetailsStepStyles();

  const [activeComments, setActiveComments] = useState<ActiveComments>({
    preInvestmentCommunicationComment:
      !!payload?.preInvestmentCommunicationComment,
    postInvestmentCommunicationComment:
      !!payload?.postInvestmentCommunicationComment,
    strengthOfLeadershipTeamComment: !!payload?.strengthOfLeadershipTeamComment,
    alignmentOfExpectationsComment: !!payload?.alignmentOfExpectationsComment,
  });

  const handleOpenComment = (
    commentName: keyof ActiveComments,
    active: boolean
  ) => {
    if (active) {
      setActiveComments(prevState => {
        return { ...prevState, [commentName]: true };
      });
    }
    return;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
    watch,
    setValue,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: payload?.title,
      preInvestmentCommunicationComment:
        payload?.preInvestmentCommunicationComment || '',
      postInvestmentCommunicationComment:
        payload?.postInvestmentCommunicationComment || '',
      strengthOfLeadershipTeamComment:
        payload?.strengthOfLeadershipTeamComment || '',
      alignmentOfExpectationsComment:
        payload?.alignmentOfExpectationsComment || '',
      preInvestmentCommunicationRating:
        payload?.preInvestmentCommunicationRating,
      postInvestmentCommunicationRating:
        payload?.postInvestmentCommunicationRating,
      strengthOfLeadershipTeamRating: payload?.strengthOfLeadershipTeamRating,
      alignmentOfExpectationsRating: payload?.alignmentOfExpectationsRating,
      overallComment: payload?.overallComment,
      overallRating: payload?.overallRating,
    },
  });

  console.log(errors);

  const onSubmit = handleSubmit(data => {
    setPayload({ ...payload, ...data });
    setStep(step + 1);
  });

  const ratings: {
    name: keyof ValidationSchema;
    commentName: keyof ActiveComments;
    label: string;
  }[] = [
    {
      name: 'preInvestmentCommunicationRating',
      commentName: 'preInvestmentCommunicationComment',
      label: 'Pre-Investment Communication',
    },
    {
      name: 'postInvestmentCommunicationRating',
      commentName: 'postInvestmentCommunicationComment',
      label: 'Post-Investment Communication',
    },
    {
      name: 'strengthOfLeadershipTeamRating',
      commentName: 'strengthOfLeadershipTeamComment',
      label: 'Strength of Leadership Team',
    },
    {
      name: 'alignmentOfExpectationsRating',
      commentName: 'alignmentOfExpectationsComment',
      label: 'Alignment of Expectations',
    },
  ];

  const addCommentClassname = (isValue: boolean) =>
    clsx('add-comment', {
      'add-comment-disabled': !isValue,
      'add-comment-active': isValue,
    });

  const handleBackButton = () => {
    setStep(step - 1);
  };

  const isDisabledNextButton = isEdit ? false : !isValid;

  return (
    <Box sx={classes.root}>
      <Box sx={classes.container}>
        <Typography variant="h4" fontWeight={600} marginBottom="32px">
          Review Details
        </Typography>
        <form onSubmit={onSubmit} style={classes.form}>
          <Box sx={classes.formContainer}>
            <Box sx={classes.formContent}>
              <Input
                topLabel="Short Title for the Review"
                placeholder="Enter short title to sum up your experience"
                required
                customStyles={classes.titleInput}
                showClearOption={false}
                register={register('title')}
                value={watch('title')}
                onChange={e => setValue('title', e.target.value)}
              />
              {ratings.map(item => (
                <Controller
                  key={item.name}
                  name={item.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box>
                      <CustomRating
                        fontSize="40px"
                        label={item.label}
                        required
                        onChange={(e, value) => onChange(Number(value))}
                        sx={classes.ratingField}
                        value={Number(value)}
                      />
                      {!activeComments[item.commentName] && (
                        <Typography
                          variant="body1"
                          className={addCommentClassname(!!value)}
                          onClick={() =>
                            handleOpenComment(item.commentName, !!value)
                          }
                        >
                          <i className="icon-Plus"></i> Add comment
                        </Typography>
                      )}
                      {activeComments[item.commentName] && (
                        <Box marginTop="4px">
                          <Typography variant="body1" fontWeight={600}>
                            Comment
                          </Typography>
                          <CustomTextArea
                            register={register(item.commentName)}
                            placeholder="Tell in details about your experience"
                            height="148px"
                            value={watch(item.commentName)}
                            onChange={e =>
                              setValue(item.commentName, e.target.value)
                            }
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                />
              ))}
              <Box marginBottom="40px">
                <Controller
                  name="overallRating"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomRating
                      fontSize="40px"
                      label="Overall Rating"
                      required
                      onChange={(e, value) => onChange(Number(value))}
                      sx={classes.overallRatingField}
                      value={value}
                    />
                  )}
                />
                <Typography variant="body1" fontWeight={600}>
                  Overall Comment <span className="required-star">*</span>
                </Typography>
                <CustomTextArea
                  register={register('overallComment')}
                  placeholder="Tell in details about your experience"
                  height="148px"
                  value={watch('overallComment')}
                  onChange={e => setValue('overallComment', e.target.value)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                ...classes.buttonWrapper,
                justifyContent: !!isEdit ? 'end' : 'space-between',
              }}
            >
              {!isEdit && (
                <Button
                  variant="tertiary"
                  onClick={handleBackButton}
                  sxCustomStyles={classes.buttonBack}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isDisabledNextButton}
                sxCustomStyles={classes.buttonNext}
              >
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ReviewDetailsStep;
