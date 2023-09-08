import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import Button from '@/components/common/Button';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import type { ModalKeyType, OpenModalsProps } from '@/pages/deals/[id]';
import ClaimDealModal from './Modals/ClaimDeal';

interface DealSponsorProps {
  deal: DealInterface;
  openModals: OpenModalsProps;
  handleOpenModal: (v: ModalKeyType) => void;
  handleCloseModal: (v: ModalKeyType) => void;
}

export const DealSponsor: FC<DealSponsorProps> = ({
  deal,
  openModals,
  handleOpenModal,
  handleCloseModal,
}) => {
  const classes = useDealPageStyles();
  const defaultSponsorImage = '/assets/Sponsor-placeholder.png';

  return (
    <Box>
      {!deal.sponsor ? (
        <Box sx={classes.textWithButton}>
          <Typography variant="body1">
            Sponsor is not currently aligned.
          </Typography>
          <Button onClick={() => handleOpenModal('claimDeal')}>
            Claim deal
          </Button>
          <ClaimDealModal
            open={openModals.claimDeal}
            handleClose={() => handleCloseModal('claimDeal')}
            onSubmit={data => console.log(data)}
          />
        </Box>
      ) : (
        <Box sx={classes.sponsor}>
          <PlaceholderImage
            alt="sponsor avatar"
            width={58}
            height={58}
            src={deal.sponsor.businessAvatar as string}
            defaultImage={defaultSponsorImage}
          />
          <Box>
            <Typography variant="h5">{deal.sponsor.legalName}</Typography>
            <Typography variant="body1" sx={classes.sponsorRating}>
              <i className="icon-Star"></i>
              {deal.sponsor.avgTotalRating}{' '}
              <span>({deal.sponsor.reviewsCount})</span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
