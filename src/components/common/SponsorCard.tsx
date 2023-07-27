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
  sponsor, //   ...props
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
      <Typography variant="body1">{sponsor.region}</Typography>
      <Typography variant="body1" sx={classes.baseRating}>
        <i className="icon-Star"></i> 5<span> (110)</span>
      </Typography>
    </Box>
  ) : (
    <Box sx={classes.largeRoot}>
      <Image src={MOCK_IMAGE_URL} alt="sponsor image" width={96} height={96} />
      <Box sx={classes.largeContent}>
        <Box sx={classes.largeHeader}>
          <Box sx={classes.largeHeaderLeftColumn}>
            {/* {sponsor.activelyRaising && (
              <Typography variant="caption" sx={classes.activelyRaising}>
                activelyRaising
              </Typography>
            )} */}
            <Typography variant="h5" fontWeight={600}>
              {sponsor.legalName}
            </Typography>
            <Box sx={classes.sponsorInfo}>
              {/* <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{sponsor.rating}</span>
                <span>({sponsor.rating_amount})</span>
              </Typography> */}
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
              {sponsor.region}
            </Typography>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Status"></i>
              {sponsor.specialty}
            </Typography>
          </Box>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Investment"></i>
              {sponsor.deals?.length} deals
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorCard;
