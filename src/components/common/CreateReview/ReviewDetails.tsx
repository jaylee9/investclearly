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
}

const ReviewDetailsStep = ({
  setStep,
  step,
  payload,
  setPayload,
}: ReviewDetailsStepProps) => {
  const classes = useReviewDetailsStepStyles();
  const [activeComments, setActiveComments] = useState<ActiveComments>({
    preInvestmentCommunicationComment: false,
    postInvestmentCommunicationComment: false,
    strengthOfLeadershipTeamComment: false,
    alignmentOfExpectationsComment: false,
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
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
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
  return (
    <Box sx={classes.root}>
      <Box>
        <Typography variant="h4" fontWeight={600} marginBottom="32px">
          Review Details
        </Typography>
        <form onSubmit={onSubmit}>
          <Box sx={classes.form}>
            <Input
              topLabel="Short Title for the Review"
              placeholder="Enter short title to sum up your experience"
              required
              customStyles={classes.titleInput}
              showClearOption={false}
              register={register('title')}
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
                render={({ field: { onChange } }) => (
                  <CustomRating
                    fontSize="40px"
                    label="Overall Rating"
                    required
                    onChange={(e, value) => onChange(Number(value))}
                    sx={classes.overallRatingField}
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
              />
            </Box>
          </Box>
          <Box sx={classes.buttonWrapper}>
            <Button type="submit" disabled={!isValid}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ReviewDetailsStep;
