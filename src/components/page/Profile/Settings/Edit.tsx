import { Box } from '@mui/material';
import { useEditProfileStyles } from './styles';

const EditProfile = () => {
  const classes = useEditProfileStyles();
  return <Box sx={classes.root}></Box>;
};

export default EditProfile;
