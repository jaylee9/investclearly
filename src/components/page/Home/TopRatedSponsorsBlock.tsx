import { Box, Grid, Typography } from '@mui/material';
import {
  blueTitleStyles,
  useTopRatedSponsorsBlockStyles,
  viewAllLink,
} from './styles';
import Link from 'next/link';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import SponsorCard from '@/components/common/SponsorCard';

const blockInformation = [
  {
    title: 'Deal Database',
    description:
      "Up to date database of active and closed real-estate syndications and funds so that you always know what's available and never miss an opportunity.",
  },
  {
    title: 'Socially Validated Sponsors',
    description:
      'Review sponsors that you have worked with and check out the reviews of your fellow investors before making an investment decisions.',
  },
];

interface TopRatedSponsorsBlockProps {
  sponsors: SponsorInterface[];
}

const TopRatedSponsorsBlock = ({ sponsors }: TopRatedSponsorsBlockProps) => {
  const classes = useTopRatedSponsorsBlockStyles();
  return (
    <Box sx={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" sx={blueTitleStyles}>
              TOP RATED SPONSORS
            </Typography>
            <Typography variant="h2" sx={classes.title}>
              Building Trust Through Peer Validation
            </Typography>
            <Box>
              {blockInformation.map((item, index) => (
                <Box
                  sx={classes.informationItem}
                  key={index}
                  marginBottom={index === 0 ? '16px' : '32px'}
                >
                  <i className="icon-Check"></i>
                  <Box>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography variant="body1">{item.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Link href="/list?type=sponsors">
              <Typography variant="body1" sx={viewAllLink} padding="0px 24px">
                View all sponsors
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Grid container spacing={2}>
              {sponsors.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <SponsorCard sponsor={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopRatedSponsorsBlock;
