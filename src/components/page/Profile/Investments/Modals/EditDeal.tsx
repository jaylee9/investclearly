import Modal from '@/components/common/Modal';
import { Box, InputAdornment, ModalProps, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomDateRangePicker from '@/components/common/DateRangePicker';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useEditDealModalStyles } from './styles';

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
    formState: { dirtyFields },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      dateOfInvestment: dealToEdit.dateOfInvestment,
      totalInvested: String(dealToEdit.totalInvested),
    },
  });
  const onFormSubmit = handleSubmit(data => {
    onSubmitClose();
  });
  const allFieldsDirty =
    'dateOfInvestment' in dirtyFields && 'totalInvested' in dirtyFields;
  console.log(dealToEdit.totalInvested);
  return (
    <Modal {...props}>
      <Box>
        <Typography variant="h3">Edit deal</Typography>
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
            disabled={!allFieldsDirty}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditDealModal;
