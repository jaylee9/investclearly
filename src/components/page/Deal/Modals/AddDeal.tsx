import Modal, { ModalProps } from '@/components/common/Modal';
import { Box, Typography } from '@mui/material';
import { useAddDealModalStyles } from './styles';
import CustomDateRangePicker from '@/components/common/DateRangePicker';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';

interface AddDealModalProps extends ModalProps {
  onSubmit: () => void;
}

const AddDealModal = ({ onSubmit, ...props }: AddDealModalProps) => {
  const classes = useAddDealModalStyles();
  const { register, control } = useForm();
  const onFormSubmit = () => {
    onSubmit();
    props.handleClose();
  };
  return (
    <Modal {...props}>
      <Box sx={classes.root}>
        <Typography variant="h3">Deal was added</Typography>
        <Typography sx={classes.subTitle} variant="body1">
          Want to tell us more about your investment?
        </Typography>
        <form>
          <Box>
            <CustomDateRangePicker
              topLabel="Date of Investment"
              control={control}
              name="dealDate"
            />
          </Box>
          <Input
            topLabel="Total Invested"
            showClearOption={false}
            register={register('totalInvested')}
          />
        </form>
      </Box>
    </Modal>
  );
};

export default AddDealModal;
