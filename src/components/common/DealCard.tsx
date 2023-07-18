import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import theme from '@/config/theme';
import Image from 'next/image';
import { IDeal } from '@/types/deal';
import { useDealCardStyles } from './styles';

export enum DealCardVariant {
  Base = 'base',
  Large = 'large',
}

interface DealCardProps extends BoxProps {
  variant?: DealCardVariant;
  deal: IDeal;
}

const DealCard = ({
  variant = DealCardVariant.Base,
  deal,
  ...props
}: DealCardProps) => {
  const classes = useDealCardStyles();
  return variant === DealCardVariant.Base ? (
    <Box
      sx={{ ...props.sx, background: theme.palette.common.white }}
      display="flex"
      flexDirection="column"
      borderRadius="0px 0px 12px 12px"
      boxShadow={theme.customShadows.header}
    >
      <Image
        src={deal.image}
        alt="deal image"
        width={292}
        height={172}
        style={{ borderRadius: '12px 12px 0px 0px', width: '100%' }}
      />
      <Box sx={classes.baseDealCardContent}>
        <Typography variant="h5" sx={classes.baseDealName}>
          {deal.name}
        </Typography>
        <Typography variant="body1" sx={classes.baseDealLocation}>
          {deal.location}
        </Typography>
        <Typography
          variant="body1"
          sx={classes.baseDealDetail}
          marginBottom="10px"
        >
          <i className="icon-Status"></i> {deal.status}
        </Typography>
        <Typography variant="body1" sx={classes.baseDealDetail}>
          <i className="icon-Investment"></i> {deal.cost}% IRR
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box></Box>
  );
};

export default DealCard;
