import React, { CSSProperties, ReactNode } from 'react';
import {
  Tabs,
  Tab,
  TabsProps,
  Box,
  Typography,
  SxProps,
  Theme,
  Divider,
} from '@mui/material';
import { useTabsStyles } from './styles';

interface TabProps {
  label: string;
  value: string | number;
  content?: ReactNode;
  count?: number;
}

interface CustomTabsProps extends TabsProps {
  value: number | string;
  tabs: TabProps[];
  customStyles?: CSSProperties;
  sxCustomRootStyles?: SxProps<Theme>;
  isDivider?: boolean;
  isSpacing?: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  value,
  tabs,
  customStyles,
  sxCustomRootStyles,
  isDivider,
  isSpacing,
  ...props
}) => {
  const classes = useTabsStyles(!!isSpacing);
  const activeTab = tabs.find(tab => value === tab.value);
  return (
    <>
      <Tabs
        value={value}
        aria-label="custom tabs"
        sx={sxCustomRootStyles ?? classes.root}
        style={customStyles}
        {...props}
      >
        {tabs.map(tab => (
          <Tab
            disableRipple
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
      {isDivider && <Divider />}
      {activeTab && (
        <React.Fragment key={activeTab.value}>
          {activeTab.content}
        </React.Fragment>
      )}
    </>
  );
};

export default CustomTabs;
