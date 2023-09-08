import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import { useSponsorCardStyles } from './styles';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import PlaceholderImage from './PlaceholderImage';
import Link from 'next/link';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import EllipsisText from './EllipsisText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export enum SponsorCardVariant {
  Base = 'base',
  Large = 'large',
}

interface SponsorCardProps extends BoxProps {
  variant?: SponsorCardVariant;
  sponsor: SponsorInterface;
  addBookmark?: (value: number) => void;
  deleteBookmark?: (value: number) => void;
}

const SponsorCard = ({
  variant = SponsorCardVariant.Base,
  sponsor,
  addBookmark,
  deleteBookmark,
  ...props
}: SponsorCardProps) => {
  const classes = useSponsorCardStyles();

  const handleAddBookmark = (value: number) => {
    if (addBookmark) {
      addBookmark(value);
    }
  };
  const handleDeleteBookmark = (value: number) => {
    if (deleteBookmark) {
      deleteBookmark(value);
    }
  };
  return variant === SponsorCardVariant.Base ? (
    <Box sx={classes.baseWrapper}>
      <PlaceholderImage
        src={sponsor.businessAvatar as string}
        width={72}
        height={72}
        alt="sponsor image"
        style={classes.baseImage}
        defaultImage={DEFAULT_SPONSOR_IMAGE}
      />
      <Link href={`/sponsors/${sponsor.id}`}>
        <EllipsisText
          variant="h5"
          fontWeight={600}
          text={`${sponsor.legalName}` as string}
          sx={classes.baseTitle}
        />
      </Link>
      <Typography variant="body1" noWrap>
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
    <Box sx={{ ...props.sx, ...classes.largeRoot }}>
      <PlaceholderImage
        src={sponsor.businessAvatar as string}
        alt="sponsor image"
        width={96}
        height={96}
        style={{ borderRadius: '1230px', maxHeight: '96px' }}
        defaultImage={DEFAULT_SPONSOR_IMAGE}
      />
      <Box sx={classes.largeContent}>
        <Box sx={classes.largeHeader}>
          <Box sx={classes.largeHeaderLeftColumn}>
            {sponsor.activelyRising && (
              <Typography variant="caption" sx={classes.activelyRising}>
                Actively Rising
              </Typography>
            )}
            <Link href={`/sponsors/${sponsor.id}`}>
              <Typography variant="h5" fontWeight={600}>
                {sponsor.legalName}
              </Typography>
            </Link>
            <Box sx={classes.sponsorInfo}>
              <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{sponsor.avgTotalRating}</span>
                <span>({sponsor.reviewsCount})</span>
              </Typography>
            </Box>
          </Box>
          <div>
            {sponsor.isInBookmarks ? (
              <BookmarkIcon
                sx={classes.filledBookmarkIcon}
                onClick={() => handleDeleteBookmark(sponsor.id)}
              />
            ) : (
              <BookmarkBorderIcon
                sx={classes.bookmarkIcon}
                onClick={() => handleAddBookmark(sponsor.id)}
              />
            )}
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
