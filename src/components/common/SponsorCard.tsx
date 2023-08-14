import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import Image from 'next/image';
import { useSponsorCardStyles } from './styles';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';

const MOCK_IMAGE_URL =
  'https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Circle-Logos/19_400.png';

export enum SponsorCardVariant {
  Base = 'base',
  Large = 'large',
}

interface SponsorCardProps extends BoxProps {
  variant?: SponsorCardVariant;
  sponsor: SponsorInterface;
}

const SponsorCard = ({
  variant = SponsorCardVariant.Base,
  sponsor,
}: SponsorCardProps) => {
  const classes = useSponsorCardStyles();
  return variant === SponsorCardVariant.Base ? (
    <Box sx={classes.baseWrapper}>
      <Image
        src={MOCK_IMAGE_URL}
        width={72}
        height={72}
        alt="sponsor image"
        style={classes.baseImage}
      />
      <Typography variant="h5" fontWeight={600}>
        {sponsor.legalName}
      </Typography>
      <Typography variant="body1">
        {Array.isArray(sponsor.regions)
          ? sponsor.regions.join(', ')
          : sponsor.regions}
      </Typography>
      <Typography variant="body1" sx={classes.baseRating}>
        <i className="icon-Star"></i> {sponsor.avgTotalRating}
        <span> ({sponsor.reviewsCount})</span>
      </Typography>
    </Box>
  ) : (
    <Box sx={classes.largeRoot}>
      <Image src={MOCK_IMAGE_URL} alt="sponsor image" width={96} height={96} />
      <Box sx={classes.largeContent}>
        <Box sx={classes.largeHeader}>
          <Box sx={classes.largeHeaderLeftColumn}>
            {sponsor.activelyRising && (
              <Typography variant="caption" sx={classes.activelyRising}>
                Actively Rising
              </Typography>
            )}
            <Typography variant="h5" fontWeight={600}>
              {sponsor.legalName}
            </Typography>
            <Box sx={classes.sponsorInfo}>
              <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{sponsor.avgTotalRating}</span>
                <span>({sponsor.reviewsCount})</span>
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
              {Array.isArray(sponsor.regions)
                ? sponsor.regions.join(', ')
                : sponsor.regions}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Status"></i>
              {Array.isArray(sponsor.specialties)
                ? sponsor.specialties.join(', ')
                : sponsor.specialties}
            </Typography>
          </Box>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Investment"></i>
              {sponsor.dealsCount} deals
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorCard;
