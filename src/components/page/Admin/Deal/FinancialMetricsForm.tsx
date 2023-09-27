import Input from '@/components/common/Input';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useFinancialMetricsFormStyles } from './styles';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/common/Button';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { editDeal } from '@/actions/deals';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const financialMetricsValidationSchema = z.object({
  fees: z.string().min(1, 'Required field'),
  equityMultiple: z.string().min(1, 'Required field'),
  targetIRR: z.string().min(1, 'Required field'),
  actualIRR: z.string().min(1, 'Required field'),
});

type FinancialMetricsValidationSchema = z.infer<
  typeof financialMetricsValidationSchema
>;

interface FinancialMetricsFormProps {
  onClose: (e: MouseEvent | object) => void;
  refetch: () => void;
  deal: DealInterface;
}

const FinancialMetricsForm = ({
  onClose,
  refetch,
  deal,
}: FinancialMetricsFormProps) => {
  const router = useRouter();

  const classes = useFinancialMetricsFormStyles();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<FinancialMetricsValidationSchema>({
    resolver: zodResolver(financialMetricsValidationSchema),
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const numericData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, parseFloat(value)])
    );
    const response = await editDeal({
      payload: { ...numericData, id: deal.id },
      router,
    });
    if (!('error' in response)) {
      await refetch();
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (deal) {
      Object.keys(financialMetricsValidationSchema.shape).forEach(key => {
        const keyOfDeal = key as keyof DealInterface;
        if (keyOfDeal && deal[keyOfDeal] !== undefined) {
          const value = deal[keyOfDeal];
          if (typeof value === 'number') {
            setValue(
              key as keyof FinancialMetricsValidationSchema,
              String(value)
            );
          }
        }
      });
    }
  }, [deal, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Box sx={classes.contentWrapper}>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              register={register('fees')}
              topLabel="Fees"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body1" sx={classes.symbol}>
                      %
                    </Typography>
                  </InputAdornment>
                ),
              }}
              type="number"
              value={watch('fees')}
            />
            <Input
              register={register('equityMultiple')}
              topLabel="Equity Multiple"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body1" sx={classes.symbol}>
                      X
                    </Typography>
                  </InputAdornment>
                ),
              }}
              type="number"
              value={watch('equityMultiple')}
            />
          </Box>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              register={register('targetIRR')}
              topLabel="Target IRR"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body1" sx={classes.symbol}>
                      %
                    </Typography>
                  </InputAdornment>
                ),
              }}
              type="number"
              value={watch('targetIRR')}
            />
            <Input
              register={register('actualIRR')}
              topLabel="Actual IRR"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body1" sx={classes.symbol}>
                      %
                    </Typography>
                  </InputAdornment>
                ),
              }}
              type="number"
              value={watch('actualIRR')}
            />
          </Box>
        </Box>
        <Box sx={classes.buttonsWrapper}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !isValid}>
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FinancialMetricsForm;
