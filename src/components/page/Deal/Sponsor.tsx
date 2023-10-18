import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import Button from '@/components/common/Button';
import PlaceholderImage from '@/components/common/PlaceholderImage';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import type { ModalKeyType, OpenModalsProps } from '@/pages/deals/[id]';
import ClaimDealModal from './Modals/ClaimDeal';
import Link from 'next/link';
import { ClaimPayload } from '@/types/common';
import { claimDeal } from '@/actions/deals';

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

  const onSubmit = async (data: ClaimPayload) => {
    await claimDeal(data);
  };

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
            onSubmit={onSubmit}
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
            style={{
              maxHeight: '58px',
              borderRadius: '1230px',
              objectFit: 'cover',
            }}
          />
          <Box>
            <Link href={`/sponsors/${deal.sponsor.id}`}>
              <Typography variant="h5">{deal?.sponsor?.vanityName}</Typography>
            </Link>
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
