import { Box, Grid, Typography } from '@mui/material';
import {
  blueTitleStyles,
  useTopRatedSponsorsBlockStyles,
  viewAllLink,
} from './styles';
import Link from 'next/link';
import Image from 'next/image';

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

const sponsors = [
  {
    image:
      'https://img.freepik.com/free-vector/corporate-business-fintech-logo-abstract-design-template-real-estate-charts-diagram-logotype-concept_126523-637.jpg?w=1380&t=st=1689086397~exp=1689086997~hmac=4a9510a550e70a9eab5ca26a9c712fd7655f90479852c8d0d55d6d78bee227e9',
    name: 'Cloud Investment Ltd',
    location: 'Phoenix, AZ',
    rating: 4.9,
    amountRatings: 115,
  },
  {
    image:
      'https://img.freepik.com/free-vector/corporate-business-fintech-logo-abstract-design-template-real-estate-charts-diagram-logotype-concept_126523-637.jpg?w=1380&t=st=1689086397~exp=1689086997~hmac=4a9510a550e70a9eab5ca26a9c712fd7655f90479852c8d0d55d6d78bee227e9',
    name: 'Sky Capital LLC',
    location: 'Los Angeles, CA',
    rating: 4.7,
    amountRatings: 95,
  },
  {
    image:
      'https://img.freepik.com/free-vector/corporate-business-fintech-logo-abstract-design-template-real-estate-charts-diagram-logotype-concept_126523-637.jpg?w=1380&t=st=1689086397~exp=1689086997~hmac=4a9510a550e70a9eab5ca26a9c712fd7655f90479852c8d0d55d6d78bee227e9',
    name: 'Rainbow Finances',
    location: 'Denver, CO',
    rating: 4.5,
    amountRatings: 80,
  },
  {
    image:
      'https://img.freepik.com/free-vector/corporate-business-fintech-logo-abstract-design-template-real-estate-charts-diagram-logotype-concept_126523-637.jpg?w=1380&t=st=1689086397~exp=1689086997~hmac=4a9510a550e70a9eab5ca26a9c712fd7655f90479852c8d0d55d6d78bee227e9',
    name: 'Green Leaf Investments',
    location: 'Chicago, IL',
    rating: 4.8,
    amountRatings: 110,
  },
];

const TopRatedSponsorsBlock = () => {
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
            <Link href="/sponsors">
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
                  <Box sx={classes.sponsorWrapper}>
                    <Image
                      src={item.image}
                      width={72}
                      height={72}
                      alt="sponsor image"
                      style={classes.sponsorImage}
                    />
                    <Typography variant="h5" fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1">{item.location}</Typography>
                    <Typography variant="body1" sx={classes.sponsorRating}>
                      <i className="icon-Star"></i> {item.rating}
                      <span> ({item.amountRatings})</span>
                    </Typography>
                  </Box>
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
