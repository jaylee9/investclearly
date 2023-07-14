import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import { useButtonStyles } from './styles';
import { CSSProperties } from 'react';

interface IButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  variant?: 'main' | 'secondary' | 'tertiary' | 'white' | 'auth';
  color?: 'primary' | 'error';
  customStyles?: CSSProperties;
}

const Button = ({
  variant = 'main',
  color = 'primary',
  customStyles,
  ...props
}: IButtonProps) => {
  const styles = useButtonStyles({ color, variant });
  return (
    <MUIButton
      sx={{
        ...styles[variant],
        ...styles.root,
      }}
      style={customStyles}
      disableRipple
      {...props}
    />
  );
};

export default Button;
