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
    <Box sx={classes.largeRoot}>
      <Image src={deal.image} alt="deal image" width={200} height={170} />
      <Box sx={classes.largeContent}>
        <Box sx={classes.largeHeader}>
          <Box sx={classes.largeHeaderLeftColumn}>
            {deal.promoted && (
              <Typography variant="caption" sx={classes.promoted}>
                Promoted
              </Typography>
            )}
            <Typography variant="h5" fontWeight={600}>
              {deal.name}
            </Typography>
            <Box sx={classes.sponsorInfo}>
              <Typography variant="caption">{deal.sponsor_name}</Typography>
              <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{deal.rating}</span>
                <span>({deal.rating_amount})</span>
              </Typography>
            </Box>
          </Box>
          <div>
            <i className="icon-Saved"></i>
          </div>
        </Box>
        <Box sx={classes.sponsorProperties}>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Location"></i>
              {deal.location}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Status"></i>
              {deal.status}
            </Typography>
          </Box>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Investment"></i>
              Min investment ${deal.min_investment}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Asset-class"></i>
              {deal.asset_class}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DealCard;
