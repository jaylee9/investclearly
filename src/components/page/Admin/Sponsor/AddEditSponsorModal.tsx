import Modal from '@/components/common/Modal';
import { Box, ModalProps, Typography } from '@mui/material';
import { useAddEditSponsorModalStyles } from './styles';
import Logo from '@/assets/components/Logo';
import { useEffect, useState } from 'react';
import StepsComponent from '@/components/common/StepsComponent';
import SponsorDetailsForm from './SponsorDetailsForm';
import {
  PartialCreateSponsorInterface,
  createSponsor,
  editSponsor,
} from '@/actions/sponsors';
import FinancialMetricsForm from './FinancialMetricsForm';
import { SponsorInterface } from '@/backend/services/sponsors/interfaces/sponsor.interface';
import Button from '@/components/common/Button';

export interface AddEditSponsorModalProps
  extends Omit<ModalProps, 'children' | 'onSubmit'> {
  sponsor?: SponsorInterface;
  isEdit: boolean;
  refetchSponsors: () => void;
}

const steps = {
  'Sponsor Details': 0,
  'Financial Metrics': 1,
  'Sponsor Added': 2,
};

const AddEditSponsorModal = ({
  onClose,
  sponsor,
  isEdit,
  refetchSponsors,
  ...props
}: AddEditSponsorModalProps) => {
  const [step, setStep] = useState(steps['Sponsor Details']);
  const classes = useAddEditSponsorModalStyles({
    isAdded: step === steps['Sponsor Added'],
  });
  const [payload, setPayload] = useState<PartialCreateSponsorInterface>(
    sponsor || {}
  );

  useEffect(() => {
    if (sponsor) {
      if (!!sponsor.locations.length) {
        const location = sponsor.locations[0];
        const formattedSponsor = {
          ...sponsor,
          street1: location.street1,
          street2: location.street2,
          city: location.city,
          stateOrCountry: location.stateOrCountry,
          stateOrCountryDescription: location.stateOrCountryDescription,
          zipCode: location.zipCode,
        };
        setPayload(formattedSponsor);
      } else {
        setPayload(sponsor);
      }
    }
  }, [sponsor]);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (e: MouseEvent | object) => {
    if (isLoading) {
      return;
    }
    setStep(steps['Sponsor Details']);
    setPayload({});
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  const handleEdit = async (data: PartialCreateSponsorInterface) => {
    if (sponsor) {
      setIsLoading(true);
      const response = await editSponsor({
        payload: { ...data, id: sponsor.id },
      });

      if (!('error' in response)) {
        await refetchSponsors();
        setPayload(response);
      }
      setIsLoading(false);
    }
  };

  const handleSaveDetails = (data: PartialCreateSponsorInterface) => {
    if (isEdit) {
      handleEdit(data);
    } else {
      setPayload(data);
      setStep(steps['Financial Metrics']);
    }
  };

  const handleSubmitFinancialMetrics = async (
    data: PartialCreateSponsorInterface
  ) => {
    if (isEdit) {
      handleEdit(data);
    } else {
      setIsLoading(true);
      const response = await createSponsor({ payload: data });

      if (!('error' in response && !isEdit)) {
        await refetchSponsors();
        setStep(steps['Sponsor Added']);
      }
      setIsLoading(false);
    }
  };

  return (
    <Modal showCloseIcon={false} onClose={handleClose} {...props}>
      <Box sx={classes.root}>
        <Box sx={classes.header}>
          <Box sx={classes.leftPart}>
            <Logo />
            <Box>
              <Typography variant="body1">
                {isEdit ? 'Edit' : 'List'} Sponsor
              </Typography>
              {sponsor?.vanityName && (
                <Typography variant="caption">{sponsor.vanityName}</Typography>
              )}
            </Box>
          </Box>
          <i className="icon-Cross" onClick={e => handleClose(e)} />
        </Box>
        <Box sx={classes.contentWrapper}>
          {step !== steps['Sponsor Added'] && (
            <StepsComponent
              steps={Object.keys(steps).filter(
                step => step !== 'Sponsor Added'
              )}
              currentStep={step}
              isEditable={isEdit}
              setStep={setStep}
            />
          )}
          <Box sx={classes.content}>
            {step !== steps['Sponsor Added'] && (
              <Typography variant="h4" sx={classes.title}>
                {Object.keys(steps)[step]}
              </Typography>
            )}
            {step === steps['Sponsor Details'] && (
              <SponsorDetailsForm
                onSave={handleSaveDetails}
                payload={payload}
                isEdit={isEdit}
                onClose={handleClose}
                isLoading={isLoading}
              />
            )}
            {step === steps['Financial Metrics'] && (
              <FinancialMetricsForm
                setStep={setStep}
                onSave={handleSubmitFinancialMetrics}
                payload={payload}
                isLoading={isLoading}
                isEdit={isEdit}
                onClose={handleClose}
              />
            )}
            {step === steps['Sponsor Added'] && (
              <Box sx={classes.sponsorAddedContent}>
                <Typography variant="h3">Sponsor has been created</Typography>
                <Button className="sponsors-button" onClick={handleClose}>
                  To the Sponsors
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditSponsorModal;
