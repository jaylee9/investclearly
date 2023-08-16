import React from 'react';
import { Box, Typography } from '@mui/material';
import { useYesNoButtonStyles } from './styles';

type TValue = 'yes' | 'no';

interface YesNoButtonsProps {
  yesTitle: string;
  noTitle: string;
  activeValue: string;
  onChange: (value: TValue) => void;
}

const values: TValue[] = ['yes', 'no'];

const YesNoButtons = ({
  yesTitle,
  noTitle,
  activeValue,
  onChange,
}: YesNoButtonsProps) => {
  const classes = useYesNoButtonStyles();
  const blockSx = (value: TValue) =>
    value === activeValue
      ? { ...classes.block, ...classes.activeBlock }
      : classes.block;
  const radioButtonSx = (value: TValue) =>
    value === activeValue
      ? { ...classes.radioButton, ...classes.activeRadioButton }
      : classes.radioButton;
  const iconSx = (value: TValue) =>
    value === activeValue
      ? { ...classes.icon, ...classes.activeIcon }
      : classes.icon;
  const titles = {
    yes: yesTitle,
    no: noTitle,
  };
  const icons = {
    yes: 'icon-Check',
    no: 'icon-Cross',
  };
  return (
    <Box sx={classes.root}>
      {values.map(item => (
        <React.Fragment key={item}>
          <Box sx={blockSx(item)} onClick={() => onChange(item)}>
            <Box sx={classes.header}>
              <Box sx={radioButtonSx(item)}>
                {activeValue === item && <span className="icon-Check" />}
              </Box>
            </Box>
            <Box sx={classes.mainContent}>
              <Box sx={iconSx(item)}>
                <span className={icons[item]} />
              </Box>
              <Typography variant="body1">{titles[item]}</Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default YesNoButtons;
