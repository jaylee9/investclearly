import {
  SuggestEditDealPayload,
  addDealToBookmark,
  deleteDealFromBookmarks,
  getDeal,
  suggestEditDeal,
} from '@/actions/deals';
import { DealInterface } from '@/backend/services/deals/interfaces/deal.interface';
import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import SkeletonImage from '@/components/common/SkeletonImage';
import AddDealModal from '@/components/page/Deal/Modals/AddDeal';
import SuggestEditModal from '@/components/page/Deal/Modals/SuggestEdit';
import { DealSponsor } from '@/components/page/Deal/Sponsor';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useHeaderProps from '@/hooks/useHeaderProps';
import useDealPageStyles from '@/pages_styles/dealPageStyles';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import parseCookies from 'next-cookies';
import { useUser } from '@/contexts/User';
import { useRouter } from 'next/router';
import {
  UpdateInvestment,
  createInvestment,
  updateInvestment,
} from '@/actions/investments';
import { capitalize } from '@/helpers/formatLocations';

interface DealPageProps {
  deal: DealInterface;
}

export interface OpenModalsProps {
  claimDeal: boolean;
  suggestEdit: boolean;
}

export type ModalKeyType = 'claimDeal' | 'suggestEdit';

const DealPage = ({ deal }: DealPageProps) => {
  const classes = useDealPageStyles();
  const { isMobile, isDesktop } = useBreakpoints();
  const { user } = useUser();
  const router = useRouter();
  const [isInBookmarks, setIsInBookmarks] = useState(deal.isInBookmarks);
  const [isAddDealLoading, setIsAddDealLoading] = useState(false);
  const [openModals, setOpenModals] = useState<OpenModalsProps>({
    claimDeal: false,
    suggestEdit: false,
  });
  const [openAddDealModal, setOpenAddDealModal] = useState<number | null>(null);

  const handleOpenAddDealModal = async () => {
    if (!!user) {
      setIsAddDealLoading(true);
      const response = await createInvestment({
        dealId: Number(router.query.id),
      });
      if (!('error' in response)) {
        setOpenAddDealModal(response.id);
      }
      setIsAddDealLoading(false);
    } else {
      router.push('/login');
    }
  };

  const handleCloseAddDealModal = () => setOpenAddDealModal(null);

  const handleOpenModal = (key: ModalKeyType) => {
    if (!!user) {
      setOpenModals(prevModals => {
        return { ...prevModals, [key]: true };
      });
    } else {
      router.push('/login');
    }
  };

  const handleCloseModal = (key: ModalKeyType) => {
    setOpenModals(prevModals => {
      return { ...prevModals, [key]: false };
    });
  };

  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: isDesktop,
    isShadowInFront: isMobile,
  });

  const handleAddBookmark = async (entityId: number) => {
    if (!!user) {
      setIsInBookmarks(true);
      const response = await addDealToBookmark({ entityId });
      if ('error' in response) {
        setIsInBookmarks(false);
      }
    } else {
      router.push('/login');
    }
  };

  const handleDeleteBookmark = async (entityId: number) => {
    setIsInBookmarks(false);
    const response = await deleteDealFromBookmarks({ entityId });
    if ('error' in response) {
      setIsInBookmarks(true);
    }
  };

  const onSubmitSugestEdit = async (data: SuggestEditDealPayload) => {
    await suggestEditDeal(data);
  };

  const onSubmitAddDeal = async (data: UpdateInvestment) => {
    await updateInvestment(data);
  };

  return (
    <Layout {...headerProps}>
      <Box>
        <Box sx={classes.imageWrapper}>
          {deal.attachments[0] && (
            <SkeletonImage
              alt="deal image"
              style={{ width: '100%' }}
              width={1200}
              height={400}
              src={deal.attachments[0].path}
            />
          )}
        </Box>

        <Box sx={classes.root}>
          <Box sx={classes.leftColumn}>
            <Box sx={classes.info}>
              <Box sx={classes.infoHeader}>
                <Box>
                  <Typography variant="h3">{deal.vanityName}</Typography>
                  <Typography variant="body1">
                    {!!deal?.locations?.length
                      ? capitalize(
                          deal?.locations?.[0]?.stateOrCountryDescription
                        )
                      : 'N/A'}
                  </Typography>
                </Box>
                <div>
                  {isInBookmarks ? (
                    <BookmarkIcon
                      sx={classes.filledBookmarkIcon}
                      onClick={() => handleDeleteBookmark(deal.id)}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      sx={classes.bookmarkIcon}
                      onClick={() => handleAddBookmark(deal.id)}
                    />
                  )}
                </div>
              </Box>
              <Box sx={classes.infoContent}>
                <Box sx={classes.infoContentColumn}>
                  <Box sx={classes.infoContentDetail}>
                    <i className="icon-Location"></i>
                    <Box>
                      <Typography variant="caption">Address</Typography>
                      <Typography variant="body1">
                        {!!deal?.locations?.length
                          ? deal?.locations?.[0]?.street1
                          : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.infoContentDetail}>
                    <i className="icon-Status"></i>
                    <Box>
                      <Typography variant="caption">Status</Typography>
                      <Typography variant="body1">{deal.status}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={classes.infoContentColumn}>
                  <Box sx={classes.infoContentDetail}>
                    <i className="icon-Investment"></i>
                    <Box>
                      <Typography variant="caption">
                        Minimum Investment
                      </Typography>
                      <Typography variant="body1">
                        {deal.minimumInvestment}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.infoContentDetail}>
                    <i className="icon-Asset-class"></i>
                    <Box>
                      <Typography variant="caption">Asset Class</Typography>
                      <Typography variant="body1">{deal.assetClass}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {!isDesktop && (
              <DealSponsor
                deal={deal}
                openModals={openModals}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
              />
            )}

            <Box sx={classes.overview}>
              <Box sx={classes.overviewHeader}>
                <Typography variant="h3">Overview</Typography>
                <Typography variant="body1">{deal.description}</Typography>
              </Box>
              <Box sx={classes.overviewContent}>
                <Typography variant="h5">Details</Typography>
                <Box sx={classes.overviewDetails}>
                  <Box sx={classes.overviewDetailsColumn}>
                    <Box>
                      <Typography variant="caption">Legal Name</Typography>
                      <Typography variant="body1">
                        {deal?.dealLegalName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Regulation</Typography>
                      <Typography variant="body1">{deal.regulation}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">State</Typography>
                      <Typography variant="body1">
                        {!!deal?.locations?.length
                          ? capitalize(
                              deal?.locations?.[0]?.stateOrCountryDescription
                            )
                          : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.overviewDetailsColumn}>
                    <Box>
                      <Typography variant="caption">SEC Industry</Typography>
                      <Typography variant="body1">
                        {deal.secIndustry}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Exemption</Typography>
                      <Typography variant="body1">{deal.exemption}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={classes.rightColumn}>
            {isDesktop && (
              <DealSponsor
                deal={deal}
                openModals={openModals}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
              />
            )}

            <Box sx={classes.sponsorInfo}>
              <Box sx={classes.sponsorInfoRow}>
                <Box>
                  <Typography variant="caption">Target Raise</Typography>
                  <Typography variant="body1">${deal.targetRaise}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Fees</Typography>
                  <Typography variant="body1">{deal.fees}%</Typography>
                </Box>
              </Box>
              {deal.sponsor && (
                <>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Cash-on-Cash</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.cashOnCash}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Equity Multiple</Typography>
                      <Typography variant="body1">
                        x{deal.sponsor.equityMultiple}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Investment Type</Typography>
                      <Typography variant="body1">
                        {Array.isArray(deal.sponsor.investmentStructures)
                          ? deal.sponsor.investmentStructures.join(', ')
                          : deal.sponsor.investmentStructures}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Hold Period</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.holdPeriod}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={classes.sponsorInfoRow}>
                    <Box>
                      <Typography variant="caption">Target IRR</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.targetIRR}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Actual IRR</Typography>
                      <Typography variant="body1">
                        {deal.sponsor.actualIRR}%
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">Already invested?</Typography>
              <Button
                onClick={handleOpenAddDealModal}
                disabled={isAddDealLoading}
              >
                Add to your profile
              </Button>
            </Box>
            <AddDealModal
              onSubmit={onSubmitAddDeal}
              open={!!openAddDealModal}
              investmentId={Number(openAddDealModal)}
              handleClose={handleCloseAddDealModal}
            />

            <Box sx={classes.textWithButton}>
              <Typography variant="body1">
                Does this deal contain any errors? Please help us maintain
                accurate information.
              </Typography>
              <Button onClick={() => handleOpenModal('suggestEdit')}>
                Suggest Edit
              </Button>
            </Box>
            <SuggestEditModal
              onSubmit={onSubmitSugestEdit}
              open={openModals.suggestEdit}
              handleClose={() => handleCloseModal('suggestEdit')}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id as string;
  const cookies = parseCookies(context);
  const token = cookies.accessToken;
  const dealResponse = await getDeal({ id, token });
  if ('error' in dealResponse) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      deal: dealResponse,
    },
  };
};

export default DealPage;
