import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useFinancialMetricsFormStyles } from './styles';
import Input from '@/components/common/Input';
import CustomSelect, { SelectVariant } from '@/components/common/Select';
import { Regulations } from '@/backend/constants/enums/regulations';
import { Exemptions } from '@/backend/constants/enums/exemptions';
import { InvestmentStructures } from '@/backend/constants/enums/investment-structures';
import { Interests } from '@/backend/constants/enums/interests';
import Button from '@/components/common/Button';
import { PartialCreateSponsorInterface } from '@/actions/sponsors';
import { useEffect } from 'react';

const validationSchema = z.object({
  aum: z.string().min(1, 'Required field'),
  fees: z.string().min(1, 'Required field'),
  regulations: z.array(z.string()),
  exemptions: z.array(z.string()),
  cashOnCash: z.string().min(1, 'Required field'),
  equityMultiple: z.string().min(1, 'Required field'),
  investmentStructures: z.string().min(1, 'Required field'),
  holdPeriod: z.string().min(1, 'Required field'),
  interests: z.array(z.string()),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface FinancialMetricsFormProps {
  setStep: (value: number) => void;
  onSave: (value: PartialCreateSponsorInterface) => void;
  payload: PartialCreateSponsorInterface;
  isLoading: boolean;
  isEdit: boolean;
  onClose: (e: MouseEvent | object) => void;
}

const FinancialMetricsForm = ({
  setStep,
  onSave,
  payload,
  isLoading,
  isEdit,
  onClose,
}: FinancialMetricsFormProps) => {
  const classes = useFinancialMetricsFormStyles();

  const investmentStructuresOptions = Object.values(InvestmentStructures).map(
    item => {
      return { label: item, value: item };
    }
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, isDirty },
    setValue,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      investmentStructures: investmentStructuresOptions[0]?.value,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = handleSubmit(data => {
    const { aum, cashOnCash, fees, equityMultiple, holdPeriod } = data;
    const formattedValues = {
      aum: +aum,
      cashOnCash: +cashOnCash,
      fees: +fees,
      equityMultiple: +equityMultiple,
      holdPeriod: +holdPeriod,
      regions: payload.regions,
      specialties: payload.specialties,
    };

    const formattedPayload = isEdit
      ? {
          ...data,
          ...formattedValues,
        }
      : {
          ...data,
          ...payload,
          ...formattedValues,
        };

    onSave(formattedPayload);
  });

  const regulationsOptions = Object.values(Regulations).map(item => ({
    label: item,
    value: item,
  }));

  const exemptionsOptions = Object.values(Exemptions).map(item => ({
    label: item,
    value: item,
  }));

  const interestsOptions = Object.values(Interests).map(item => ({
    label: item,
    value: item,
  }));

  const handleBack = () => setStep(0);

  useEffect(() => {
    if (payload) {
      for (const key in payload) {
        if (key in payload) {
          const value = payload[key as keyof typeof payload];
          if (typeof value !== 'undefined' && key !== 'investmentStructures') {
            setValue(
              key as keyof ValidationSchema,
              Array.isArray(value) ? value : String(value)
            );
          }
        }
      }
      if (payload.investmentStructures?.length) {
        setValue('investmentStructures', payload.investmentStructures?.[0]);
      }
    }
  }, [payload, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Box sx={classes.doubleInputsWrapper}>
          <Input
            register={register('aum')}
            topLabel="AUM"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body1" sx={classes.symbol}>
                    $
                  </Typography>
                </InputAdornment>
              ),
            }}
            type="number"
            value={watch('aum')}
          />
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
        </Box>
        <Box sx={classes.doubleInputsWrapper}>
          <Controller
            control={control}
            name="regulations"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                options={regulationsOptions}
                variant={SelectVariant.Dark}
                multiple
                onChange={onChange}
                value={value || []}
                topLabel="Regulation"
                placeholder="Regulation"
              />
            )}
          />
          <Controller
            control={control}
            name="exemptions"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                options={exemptionsOptions}
                variant={SelectVariant.Dark}
                multiple
                onChange={onChange}
                value={value || []}
                topLabel="Exemption"
                placeholder="Exemption"
              />
            )}
          />
        </Box>
        <Box sx={classes.doubleInputsWrapper}>
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
          <Controller
            control={control}
            name="investmentStructures"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                options={investmentStructuresOptions}
                variant={SelectVariant.Dark}
                onChange={onChange}
                value={value}
                topLabel="Investment Type"
              />
            )}
          />
          <Input
            register={register('holdPeriod')}
            topLabel="Hold Period, years"
            placeholder="1"
            showClearOption={false}
            type="number"
            value={watch('holdPeriod')}
          />
        </Box>
        <Box sx={classes.doubleInputsWrapper}>
          <Controller
            control={control}
            name="interests"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                options={interestsOptions}
                variant={SelectVariant.Dark}
                multiple
                onChange={onChange}
                value={value || []}
                topLabel="Interested in"
                placeholder="LP Types"
              />
            )}
          />
        </Box>
      </Box>
      {isEdit ? (
        <Box sx={classes.editButtonsWrapper}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isDirty || isLoading}>
            Save
          </Button>
        </Box>
      ) : (
        <Box sx={classes.buttonsWrapper}>
          <Button
            variant="tertiary"
            customStyles={{ padding: 0 }}
            onClick={handleBack}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button disabled={!isValid || isLoading} type="submit">
            List Sponsor
          </Button>
        </Box>
      )}
    </form>
  );
};

export default FinancialMetricsForm;
