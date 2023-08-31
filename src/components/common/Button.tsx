import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  SxProps,
  Theme,
} from '@mui/material';
import { useButtonStyles } from './styles';
import { CSSProperties } from 'react';

interface IButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  variant?: 'main' | 'secondary' | 'tertiary' | 'white' | 'auth';
  color?: 'primary' | 'error';
  customStyles?: CSSProperties;
  sxCustomStyles?: SxProps<Theme>;
}

const Button = ({
  variant = 'main',
  color = 'primary',
  customStyles,
  sxCustomStyles,
  ...props
}: IButtonProps) => {
  const styles = useButtonStyles({ color, variant });
  const sxStyles = {
    ...styles[variant],
    ...styles.root,
    ...sxCustomStyles,
  };
  return (
    <MUIButton
      sx={sxStyles as SxProps<Theme>}
      style={customStyles}
      disableRipple
      {...props}
    />
  );
};

export default Button;
