import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import Image from 'next/image';
import { useSponsorCardStyles } from './styles';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';

const MOCK_IMAGE_URL =
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

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
      <Typography variant="body1">{sponsor.address}</Typography>
      <Typography variant="body1" sx={classes.baseRating}>
        <i className="icon-Star"></i> 5<span> (110)</span>
      </Typography>
    </Box>
  ) : (
    <Box>123</Box>
    // <Box sx={classes.largeRoot}>
    //   <Image src={MOCK_IMAGE_URL} alt="deal image" width={200} height={170} />
    //   <Box sx={classes.largeContent}>
    //     <Box sx={classes.largeHeader}>
    //       <Box sx={classes.largeHeaderLeftColumn}>
    //         {/* {deal.promoted && (
    //           <Typography variant="caption" sx={classes.promoted}>
    //             Promoted
    //           </Typography>
    //         )} */}
    //         <Typography variant="h5" fontWeight={600}>
    //           {deal.dealTitle}
    //         </Typography>
    //         <Box sx={classes.sponsorInfo}>
    //           <Typography variant="caption">{deal.dealSponsor}</Typography>
    //           {/* <Typography variant="caption" sx={classes.sponsorRating}>
    //             <i className="icon-Star"></i>
    //             <span>{deal.rating}</span>
    //             <span>({deal.rating_amount})</span>
    //           </Typography> */}
    //         </Box>
    //       </Box>
    //       <div>
    //         <i className="icon-Saved"></i>
    //       </div>
    //     </Box>
    //     <Box sx={classes.sponsorProperties}>
    //       <Box sx={classes.sponsorPropertiesColumn}>
    //         <Typography variant="body1" sx={classes.sponsorProperty}>
    //           <i className="icon-Location"></i>
    //           {deal.region}
    //         </Typography>
    //         <Typography variant="body1" sx={classes.sponsorProperty}>
    //           <i className="icon-Status"></i>
    //           {deal.status}
    //         </Typography>
    //       </Box>
    //       <Box sx={classes.sponsorPropertiesColumn}>
    //         <Typography variant="body1" sx={classes.sponsorProperty}>
    //           <i className="icon-Investment"></i>
    //           Min investment ${deal.minimumInvestment}
    //         </Typography>
    //         <Typography variant="body1" sx={classes.sponsorProperty}>
    //           <i className="icon-Asset-class"></i>
    //           {deal.assetClass}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default SponsorCard;
