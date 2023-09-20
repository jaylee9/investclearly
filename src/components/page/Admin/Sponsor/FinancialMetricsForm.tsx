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

const validationSchema = z.object({
  aum: z.string().min(1, 'Required field'),
  fees: z.string().min(1, 'Required field'),
  regulations: z.array(z.string()),
  exemption: z.array(z.string()),
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
}

const FinancialMetricsForm = ({
  setStep,
  onSave,
  payload,
  isLoading,
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
    formState: { isValid },
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
    onSave({
      ...data,
      ...payload,
      aum: +aum,
      cashOnCash: +cashOnCash,
      fees: +fees,
      equityMultiple: +equityMultiple,
      holdPeriod: +holdPeriod,
    });
  });

  const regulationsOptions = Object.values(Regulations).map(item => {
    return { label: item, value: item };
  });

  const exemptionsOptions = Object.values(Exemptions).map(item => {
    return { label: item, value: item };
  });

  const interestsOptions = Object.values(Interests).map(item => {
    return { label: item, value: item };
  });

  const handleBack = () => setStep(0);

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
            name="exemption"
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
    </form>
  );
};

export default FinancialMetricsForm;
