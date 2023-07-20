import { ReactNode } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAccordionStyles } from './styles';

interface CustomAccordionProps {
  children: ReactNode;
  label: string | ReactNode;
}

const CustomAccordion = ({ children, label }: CustomAccordionProps) => {
  const classes = useAccordionStyles();
  return (
    <Accordion sx={classes.root}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography variant="body1">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
