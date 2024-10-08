import Modal from '@/components/common/Modal';
import { Box, InputAdornment, ModalProps, Typography } from '@mui/material';
import { useAddDealModalStyles } from './styles';
import CustomDateRangePicker from '@/components/common/DateRangePicker';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateInvestment } from '@/actions/investments';
import { format } from 'date-fns';

const validationSchema = z.object({
  dateOfInvestment: z.date(),
  totalInvested: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface AddDealModalProps extends Omit<ModalProps, 'children' | 'onSubmit'> {
  onSubmit: (data: UpdateInvestment) => void;
  handleClose: () => void;
  investmentId: number;
}

const AddDealModal = ({
  onSubmit,
  handleClose,
  investmentId,
  ...props
}: AddDealModalProps) => {
  const classes = useAddDealModalStyles();
  const {
    register,
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });

  const allFieldsDirty =
    'dateOfInvestment' in dirtyFields && 'totalInvested' in dirtyFields;

  const onFormSubmit = handleSubmit(async data => {
    await onSubmit({
      ...data,
      id: investmentId,
      dateOfInvestment: format(data.dateOfInvestment, 'MM/dd/yyyy'),
    });
    handleClose();
  });
  return (
    <Modal onClose={handleClose} {...props}>
      <Box sx={classes.root}>
        <Typography variant="h3">Deal was added</Typography>
        <Typography sx={classes.subTitle} variant="body1">
          Want to tell us more about your investment?
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

export default AddDealModal;
