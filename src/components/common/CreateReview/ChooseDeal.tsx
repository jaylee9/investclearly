import { Box, Typography } from '@mui/material';
import { useChooseDealStepStyles } from './styles';
import TagSelector from '../TagSelector';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import PlaceholderImage from '../PlaceholderImage';
import { DEFAULT_DEAL_IMAGE } from '@/config/constants';
import { CreateReviewPayloadInterface } from '@/actions/reviews';
import { getAllDeals } from '@/actions/deals';

interface ChooseDealStepProps {
  setStep: (value: number) => void;
  step: number;
  payload: CreateReviewPayloadInterface;
  setPayload: (value: CreateReviewPayloadInterface) => void;
}

interface Tag {
  name: string;
  id?: number;
}

const ChooseDealStep = ({
  setStep,
  step,
  payload,
  setPayload,
}: ChooseDealStepProps) => {
  const classes = useChooseDealStepStyles();
  const [tagSelectorValue, setTagSelectorValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(tagSelectorValue);
  const [showVariants, setShowVariants] = useState(false);

  const handleOpen = () => setShowVariants(true);
  const handleClose = () => setShowVariants(false);

  useEffect(() => {
    const debouncedSave = debounce(newValue => {
      setDebouncedValue(newValue);
    }, 500);
    debouncedSave(tagSelectorValue);
    return () => {
      debouncedSave.cancel();
    };
  }, [tagSelectorValue]);
  console.log(payload.sponsorId);
  const fetchDeals = async () => {
    const filters = {
      search: debouncedValue,
      page: 1,
      pageSize: 5,
      sponsorId: payload.sponsorId,
    };
    return await getAllDeals(filters);
  };

  const { data, isLoading } = useQuery(
    ['getAllDeals', debouncedValue],
    fetchDeals
  );

  const defaultTag = { name: '', id: undefined };
  const [tag, setTag] = useState<Tag>(defaultTag);
  const dirtyTag = tag.name !== defaultTag.name && tag.id !== defaultTag.id;

  const handleClearTag = () => {
    setTag(defaultTag);
  };

  const handleSkipPage = () => {
    setStep(step + 1);
  };
  const handleNextPage = () => {
    setPayload({ ...payload, dealId: tag.id });
    setStep(step + 1);
  };
  const handleChooseDeal = (event: React.MouseEvent, { name, id }: Tag) => {
    event.stopPropagation();
    handleClose();
    setTag({ name, id });
    setTagSelectorValue('');
  };

  return (
    <Box sx={classes.root}>
      <Box sx={classes.content}>
        <Typography variant="h4" fontWeight={600}>
          What Deal have you worked with the Sponsor on?
        </Typography>
        <Typography sx={classes.subTitle}>
          You can share any previous deal. Providing this information is
          optional, feel free to skip this step if you prefer.
        </Typography>
        <Box sx={classes.tagSelectorWrapper}>
          <TagSelector
            inputValue={tagSelectorValue}
            onChange={setTagSelectorValue}
            activeTag={tag.name}
            onClearTags={handleClearTag}
            open={showVariants}
            handleClose={handleClose}
            handleOpen={handleOpen}
          >
            <Box sx={classes.tagSelectorContent}>
              {isLoading && <Loading />}
              {!data?.deals.length && !isLoading && (
                <Typography variant="caption" sx={classes.noResults}>
                  No results found
                </Typography>
              )}
              {data?.deals.map(deal => (
                <Box
                  key={deal.id}
                  onClick={event =>
                    handleChooseDeal(event, {
                      name: deal.dealLegalName as string,
                      id: deal.id,
                    })
                  }
                  sx={classes.dealVariantWrapper}
                >
                  <PlaceholderImage
                    src={deal.attachments?.[0].path as string}
                    alt="deal image"
                    defaultImage={DEFAULT_DEAL_IMAGE}
                    width={48}
                    height={48}
                    style={{ borderRadius: '1230px', objectFit: 'cover' }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {deal.dealLegalName}
                    </Typography>
                    <Typography variant="caption" sx={classes.address}>
                      {deal.dealAddress}
                    </Typography>
                    <Box sx={classes.assetClassesWrapper}>
                      {Array.isArray(deal.assetClass) ? (
                        deal.assetClass.map((type, index) => (
                          <React.Fragment key={type}>
                            <Typography variant="caption" sx={classes.address}>
                              {type}
                            </Typography>
                            {deal.assetClass &&
                              index !== deal?.assetClass?.length - 1 && (
                                <Box className="round-divider" />
                              )}
                          </React.Fragment>
                        ))
                      ) : (
                        <Typography variant="caption" sx={classes.address}>
                          {deal.assetClass}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </TagSelector>
        </Box>
      </Box>
      <Box sx={classes.buttonsWrapper}>
        <Button variant="secondary" onClick={handleSkipPage}>
          Skip
        </Button>
        <Button onClick={handleNextPage} disabled={!dirtyTag}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ChooseDealStep;
