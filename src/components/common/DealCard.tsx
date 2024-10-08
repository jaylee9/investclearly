import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import theme from '@/config/theme';
import { useDealCardStyles } from './styles';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import { DEFAULT_DEAL_IMAGE } from '@/config/constants';
import EllipsisText from './EllipsisText';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Bookmark from './Bookmark';
import { useUser } from '@/contexts/User';
import { useRouter } from 'next/router';
import { capitalize } from '@/helpers/formatLocations';

export enum DealCardVariant {
  Base = 'base',
  Large = 'large',
}

interface DealCardProps extends BoxProps {
  variant?: DealCardVariant;
  deal: DealInterface;
  addBookmark?: (value: number) => void;
  deleteBookmark?: (value: number) => void;
}

const DealCard = ({
  variant = DealCardVariant.Base,
  deal,
  addBookmark,
  deleteBookmark,
  ...props
}: DealCardProps) => {
  const classes = useDealCardStyles();
  const { user } = useUser();
  const router = useRouter();
  const { isMobile } = useBreakpoints();

  const handleAddBookmark = (value: number) => {
    if (addBookmark && !!user) {
      addBookmark(value);
    } else {
      router.push('/login');
    }
  };
  const handleDeleteBookmark = (value: number) => {
    if (deleteBookmark && !!user) {
      deleteBookmark(value);
    } else {
      router.push('/login');
    }
  };

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
          minHeight: '172px',
        }}
        defaultImage={DEFAULT_DEAL_IMAGE}
      />
      <Box sx={classes.baseDealCardContent}>
        <Link href={`/deals/${deal.id}`}>
          <EllipsisText
            variant="h5"
            sx={classes.baseDealName}
            text={deal.vanityName as string}
          />
        </Link>
        <Typography variant="body1" sx={classes.baseDealLocation}>
          {!!deal?.locations?.length &&
          deal?.locations?.[0]?.stateOrCountryDescription
            ? capitalize(deal?.locations?.[0]?.stateOrCountryDescription)
            : 'N/A'}
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
    <Box sx={{ ...props.sx, ...classes.largeRoot }}>
      <PlaceholderImage
        src={deal.attachments?.[0]?.path}
        alt="deal image"
        width={200}
        height={170}
        style={{
          height: '170px',
          borderRadius: isMobile ? '12px 12px 0 0' : '12px 0px 0px 12px',
          objectFit: 'cover',
          width: isMobile ? '100%' : '200px',
        }}
        defaultImage={DEFAULT_DEAL_IMAGE}
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
              <EllipsisText
                variant="h5"
                text={deal.vanityName as string}
                sx={classes.largeDealTitle}
              />
            </Link>
            <Box sx={classes.sponsorInfo}>
              <Typography variant="caption">
                {deal?.sponsor?.legalName}
              </Typography>
              <Typography variant="caption" sx={classes.sponsorRating}>
                <i className="icon-Star"></i>
                <span>{deal.avgTotalRating}</span>
                <span>({deal.reviewsCount})</span>
              </Typography>
            </Box>
          </Box>
          <Box sx={classes.bookmarkWrapper}>
            <Bookmark
              addBookmark={() => handleAddBookmark(deal.id)}
              deleteBookmark={() => handleDeleteBookmark(deal.id)}
              isInBookmarks={deal.isInBookmarks}
              isFilledWhite={isMobile}
            />
          </Box>
        </Box>
        <Box sx={classes.sponsorProperties}>
          <Box sx={classes.sponsorPropertiesColumn}>
            <Typography variant="body1" sx={classes.sponsorProperty}>
              <i className="icon-Location"></i>
              {!!deal?.locations?.length &&
              deal?.locations?.[0]?.stateOrCountryDescription
                ? capitalize(deal?.locations?.[0]?.stateOrCountryDescription)
                : 'N/A'}
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
