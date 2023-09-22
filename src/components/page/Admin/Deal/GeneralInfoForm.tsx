import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useGeneralInfoFormStyles } from './styles';
import Input from '@/components/common/Input';

const validationSchema = z.object({
  dealTitle: z.string().min(1),
  dealSponsor: z.string().min(1),
  assetClass: z.string().min(1),
  description: z.string().min(1),
  closeDate: z.string().min(1),
  holdPeriod: z.string().min(1),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const GeneralInfoForm = () => {
  const classes = useGeneralInfoFormStyles();

  const { handleSubmit, register, watch } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Box sx={classes.formWrapper}>
        <Input
          register={register('dealTitle')}
          value={watch('dealTitle')}
          topLabel="Deal Vanity Name"
          placeholder="Vanity Name"
        />
      </Box>
    </form>
  );
};

export default GeneralInfoForm;
