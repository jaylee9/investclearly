import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import theme from '@/config/theme';
import { useDealCardStyles } from './styles';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';

export enum DealCardVariant {
  Base = 'base',
  Large = 'large',
}

interface DealCardProps extends BoxProps {
  variant?: DealCardVariant;
  deal: DealInterface;
}

const DealCard = ({
  variant = DealCardVariant.Base,
  deal,
  ...props
}: DealCardProps) => {
  const classes = useDealCardStyles();
  const defaultImage = '/assets/Deal-placeholder.png';
  return variant === DealCardVariant.Base ? (
    <Box
      sx={{
        ...props.sx,
        background: theme.palette.common.white,
        borderRadius: '12px',
        height: '332px',
      }}
      display="flex"
      flexDirection="column"
      borderRadius="0px 0px 12px 12px"
      boxShadow={theme.customShadows.header}
    >
      <PlaceholderImage
        src={deal.attachments?.[0]?.path}
        alt="deal image"
        width={292}
        height={172}
        style={{
          borderRadius: '12px 12px 0px 0px',
          width: '100%',
          objectFit: 'cover',
        }}
        defaultImage={defaultImage}
      />
      <Box sx={classes.baseDealCardContent}>
        <Link href={`/deals/${deal.id}`}>
          <Typography variant="h5" sx={classes.baseDealName}>
            {deal.dealTitle}
          </Typography>
        </Link>
        <Typography variant="body1" sx={classes.baseDealLocation}>
          {Array.isArray(deal.regions) ? deal.regions.join(', ') : deal.regions}
        </Typography>
        <Typography
          variant="body1"
          sx={classes.baseDealDetail}
          marginBottom="10px"
        >
          <i className="icon-Status"></i> {deal.status}
        </Typography>
        <Typography variant="body1" sx={classes.baseDealDetail}>
          <i className="icon-Investment"></i> {deal.targetIRR}% IRR
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={classes.largeRoot}>
      <PlaceholderImage
        src={deal.attachments?.[0]?.path}
        alt="deal image"
        width={200}
        height={170}
        style={{
          height: '170px',
          borderRadius: '12px 0px 0px 12px',
          objectFit: 'cover',
        }}
        defaultImage={defaultImage}
      />
      <Box sx={classes.largeContent}>
        <Box sx={classes.largeHeader}>
          <Box sx={classes.largeHeaderLeftColumn}>
            {/* {deal.promoted && (
              <Typography variant="caption" sx={classes.promoted}>
                Promoted
              </Typography>
            )} */}
            <Link href={`/deals/${deal.id}`}>
              <Typography variant="h5">{deal.dealTitle}</Typography>
            </Link>
            <Box sx={classes.sponsorInfo}>
              <Typography variant="caption">{deal.dealSponsor}</Typography>
              <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{deal.avgTotalRating}</span>
                <span>({deal.reviewsCount})</span>
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
              {Array.isArray(deal.regions)
                ? deal.regions.join(', ')
                : deal.regions}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Status"></i>
              {deal.status}
            </Typography>
          </Box>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Investment"></i>
              Min investment ${deal.minimumInvestment}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Asset-class"></i>
              {deal.assetClass}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DealCard;
