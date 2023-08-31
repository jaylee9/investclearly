import { Box, Grid, Typography } from '@mui/material';
import {
  blueTitleStyles,
  useTopRatedSponsorsBlockStyles,
  viewAllLink,
} from './styles';
import Link from 'next/link';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import SponsorCard from '@/components/common/SponsorCard';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Button from '@/components/common/Button';
import type { FC } from 'react';

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

const TopRatedSponsorsBlock: FC<TopRatedSponsorsBlockProps> = ({
  sponsors,
}) => {
  const classes = useTopRatedSponsorsBlockStyles();
  const { isDesktop, isMobile } = useBreakpoints();

  const gridSize = isDesktop ? 6 : 12;
  const gridCardSize = isMobile ? 12 : 6;

  const sponsorsFiltered = sponsors.slice(0, isMobile ? 1 : sponsors.length);

  return (
    <Box sx={classes.root}>
      <Grid container spacing={5} sx={classes.gridContainer}>
        <Grid item xs={gridSize} sx={classes.sponsorGridContainer}>
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
            {isDesktop && (
              <Link href="/list?type=sponsors">
                <Button variant="secondary">
                  <Typography
                    variant="body1"
                    sx={viewAllLink}
                    padding="0px 24px"
                  >
                    View all sponsors
                  </Typography>
                </Button>
              </Link>
            )}
          </Box>
        </Grid>
        <Grid item xs={gridSize} sx={classes.sponsorGridContainer}>
          <Box>
            <Grid container spacing={2}>
              {sponsorsFiltered.map((item, index) => (
                <Grid item xs={gridCardSize} key={index}>
                  <SponsorCard sponsor={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        {!isDesktop && (
          <Link href="/list?type=sponsors" style={{ margin: '32px auto 0' }}>
            <Button variant="secondary">
              <Typography variant="body1" sx={viewAllLink} padding="0px 24px">
                View all sponsors
              </Typography>
            </Button>
          </Link>
        )}
      </Grid>
    </Box>
  );
};

export default TopRatedSponsorsBlock;
