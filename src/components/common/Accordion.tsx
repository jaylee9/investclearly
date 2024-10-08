import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react';
import { useAccordionStyles } from './styles';

export type AccordionVariant = 'primary' | 'secondary';

interface CustomAccordionProps {
  children: ReactNode;
  label: string | ReactNode;
  expandIcon?: ReactNode;
  variant?: AccordionVariant;
  customStyles?: CSSProperties;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
}

const CustomAccordion: FC<CustomAccordionProps> = ({
  children,
  label,
  expandIcon = <KeyboardArrowDownIcon />,
  variant = 'primary',
  customStyles = {},
  onChange,
}) => {
  const classes = useAccordionStyles({ variant });

  return (
    <Accordion sx={classes.root} style={customStyles} onChange={onChange}>
      <AccordionSummary expandIcon={expandIcon}>
        <Typography variant="body1">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
