import Input from '@/components/common/Input';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useFinancialMetricsFormStyles } from './styles';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/common/Button';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import { editDeal } from '@/actions/deals';
import { useEffect, useState } from 'react';

const financialMetricsValidationSchema = z.object({
  fees: z.string().optional(),
  equityMultiple: z.string().optional(),
  targetIRR: z.string().optional(),
  actualIRR: z.string().optional(),
  holdPeriod: z.string().optional(),
  cashOnCash: z.string().optional(),
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
  const classes = useFinancialMetricsFormStyles();

  const [isLoading, setIsLoading] = useState(false);

  const { register, watch, handleSubmit, setValue } =
    useForm<FinancialMetricsValidationSchema>({
      resolver: zodResolver(financialMetricsValidationSchema),
    });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    const numericData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        parseFloat(value) || 'none',
      ])
    );

    const response = await editDeal({
      payload: { ...numericData, id: deal.id },
    });
    if (!('error' in response)) {
      await refetch();
    }
    setIsLoading(false);
  });

  useEffect(() => {
    if (deal) {
      Object.keys(financialMetricsValidationSchema.shape).forEach(key => {
        const keyOfDeal = key as keyof DealInterface;
        if (keyOfDeal && deal[keyOfDeal] !== undefined) {
          const value = deal[keyOfDeal];
          if (typeof value === 'number' || typeof value === 'string') {
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
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              register={register('holdPeriod')}
              topLabel="Hold Period, years"
              placeholder="1"
              type="number"
              value={watch('holdPeriod')}
              showClearOption={false}
            />
            <Input
              register={register('cashOnCash')}
              topLabel="Cash-on-Cash"
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
              value={watch('cashOnCash')}
              showClearOption={false}
            />
          </Box>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              topLabel="Investment Type"
              InputProps={{
                readOnly: true,
              }}
              value={
                Array.isArray(deal.investmentStructures)
                  ? deal.investmentStructures.join(', ')
                  : deal.investmentStructures
              }
              showClearOption={false}
            />
            <Input
              topLabel="Target Raise"
              InputProps={{
                readOnly: true,
              }}
              value={deal.targetRaise}
              showClearOption={false}
            />
          </Box>
          <Box sx={classes.doubleInputsWrapper}>
            <Input
              topLabel="Exemptions"
              InputProps={{
                readOnly: true,
              }}
              value={deal.exemption}
              showClearOption={false}
            />
            <Input
              topLabel="Regulation"
              InputProps={{
                readOnly: true,
              }}
              value={deal.regulation}
              showClearOption={false}
            />
          </Box>
        </Box>
        <Box sx={classes.buttonsWrapper}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FinancialMetricsForm;
