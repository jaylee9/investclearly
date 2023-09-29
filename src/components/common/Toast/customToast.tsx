import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { getToastStyles } from './styles';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ToastSuccessProps {
  title: string;
  message?: string;
  type: ToastType;
}

const customToast = ({ title, message, type }: ToastSuccessProps) => {
  const classes = getToastStyles({ type });
  return toast(
    <Box sx={classes.wrapper}>
      <Box sx={classes.iconWrapper}>
        <i
          className={`icon-${type === ToastType.SUCCESS ? 'Check' : 'Cross'}`}
        ></i>
      </Box>
      <Box sx={classes.textWrapper}>
        <Typography sx={classes.title} variant="body1">
          {title}
        </Typography>
        {message && (
          <Typography sx={classes.message} variant="caption">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default customToast;
