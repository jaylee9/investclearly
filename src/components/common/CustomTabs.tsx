import React, { CSSProperties, ReactNode } from 'react';
import { Tabs, Tab, TabsProps, Box, Typography } from '@mui/material';
import { useTabsStyles } from './styles';

interface TabProps {
  label: string;
  value: string | number;
  content: ReactNode;
  count?: number;
}

interface CustomTabsProps extends TabsProps {
  value: number | string;
  tabs: TabProps[];
  customStyles?: CSSProperties;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  value,
  tabs,
  customStyles,
  ...other
}) => {
  const classes = useTabsStyles();
  return (
    <>
      <Tabs
        value={value}
        aria-label="custom tabs"
        sx={classes.root}
        style={customStyles}
        {...other}
      >
        {tabs.map(tab => (
          <Tab
            sx={classes.tab}
            key={tab.value}
            label={
              <Box sx={classes.label}>
                <Typography variant="body1">{tab.label}</Typography>
                {tab.count && (
                  <Typography variant="caption">{tab.count}</Typography>
                )}
              </Box>
            }
            value={tab.value}
          />
        ))}
      </Tabs>
      {tabs.map(
        tab => value === tab.value && <Box key={tab.value}>{tab.content}</Box>
      )}
    </>
  );
};

export default CustomTabs;
