import Modal from '@/components/common/Modal';
import { Box, InputAdornment, ModalProps, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomDateRangePicker from '@/components/common/DateRangePicker';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useEditDealModalStyles } from './styles';
import { useEffect } from 'react';
import { updateInvestment } from '@/actions/investments';
import { format } from 'date-fns';

const validationSchema = z.object({
  dateOfInvestment: z.date(),
  totalInvested: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export interface DealToEdit {
  id: number;
  totalInvested: number;
  dateOfInvestment: Date;
}

interface EditDealModalProps extends Omit<ModalProps, 'children'> {
  onSubmitClose: () => void;
  dealToEdit: DealToEdit;
}

const EditDealModal = ({
  onSubmitClose,
  dealToEdit,
  ...props
}: EditDealModalProps) => {
  const classes = useEditDealModalStyles();
  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
    setValue,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onFormSubmit = handleSubmit(async data => {
    const payload = {
      dateOfInvestment: format(data.dateOfInvestment, 'dd/MM/yyyy'),
      id: dealToEdit.id,
      totalInvested: data.totalInvested,
    };
    const response = await updateInvestment(payload);
    if (!response.isError) {
      onSubmitClose();
    }
  });
  useEffect(() => {
    if (dealToEdit) {
      setValue('totalInvested', String(dealToEdit.totalInvested));
      setValue('dateOfInvestment', new Date(dealToEdit.dateOfInvestment));
    }
  }, [dealToEdit.totalInvested, setValue, dealToEdit]);
  return (
    <Modal {...props}>
      <Box>
        <Typography variant="h3" fontWeight={600} marginBottom="24px">
          Edit deal
        </Typography>
        <form onSubmit={onFormSubmit}>
          <Box>
            <CustomDateRangePicker
              topLabel="Date of Investment"
              control={control}
              name="dateOfInvestment"
            />
          </Box>
          <Input
            topLabel="Total Invested"
            showClearOption={false}
            register={register('totalInvested')}
            value={watch('totalInvested')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body1" sx={classes.symbol}>
                    $
                  </Typography>
                </InputAdornment>
              ),
            }}
            customStyles={{ marginBottom: '24px' }}
          />
          <Button
            type="submit"
            customStyles={classes.submitButton}
            disabled={!isDirty}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditDealModal;
