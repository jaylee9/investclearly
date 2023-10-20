import { Box, Typography } from '@mui/material';
import { useChooseSponsorStepStyles } from './styles';
import TagSelector from '../TagSelector';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import { GetAllSponsorsResponse, getAllSponsors } from '@/actions/sponsors';
import PlaceholderImage from '../PlaceholderImage';
import { DEFAULT_SPONSOR_IMAGE } from '@/config/constants';
import { CreateReviewPayloadInterface } from '@/actions/reviews';
import Link from 'next/link';

interface ChooseSponsorStepProps {
  setStep: (value: number) => void;
  step: number;
  payload: CreateReviewPayloadInterface & { sponsorName?: string };
  setPayload: (
    value: CreateReviewPayloadInterface & { sponsorName?: string }
  ) => void;
}

interface Tag {
  name: string;
  id?: number;
}

const ChooseSponsorStep = ({
  setStep,
  step,
  payload,
  setPayload,
}: ChooseSponsorStepProps) => {
  const classes = useChooseSponsorStepStyles();
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

  const fetchSponsors = async () => {
    const filters = { search: debouncedValue, page: 1, pageSize: 5 };
    return (await getAllSponsors(filters)) as GetAllSponsorsResponse;
  };

  const { data, isLoading } = useQuery<GetAllSponsorsResponse>(
    ['getAllSponsors', debouncedValue],
    fetchSponsors
  );

  const clearTag = { name: '', id: undefined };
  const [tag, setTag] = useState<Tag>({
    name: payload.sponsorName || '',
    id: payload.sponsorId,
  });
  const dirtyTag = tag.name !== clearTag.name && tag.id !== clearTag.id;

  const handleClearTag = () => {
    setTag(clearTag);
  };

  const handleNextPage = () => {
    setPayload({ ...payload, sponsorId: tag.id, sponsorName: tag.name });
    setStep(step + 1);
  };
  const handleChooseSponsor = (event: React.MouseEvent, { name, id }: Tag) => {
    event.stopPropagation();
    handleClose();
    setTag({ name, id });
    setTagSelectorValue('');
  };

  return (
    <Box sx={classes.root}>
      <Box sx={classes.container}>
        <Box sx={classes.content}>
          <Typography variant="h4" fontWeight={600} marginBottom="24px">
            What sponsor are you reviewing?
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
                {!data?.sponsors.length && !isLoading && (
                  <Typography variant="caption" sx={classes.noResults}>
                    No results found
                  </Typography>
                )}
                {data?.sponsors.map(sponsor => (
                  <Box
                    key={sponsor.id}
                    onClick={event =>
                      handleChooseSponsor(event, {
                        name: sponsor.vanityName as string,
                        id: sponsor.id,
                      })
                    }
                    sx={classes.sponsorVariantWrapper}
                  >
                    <PlaceholderImage
                      src={sponsor.businessAvatar as string}
                      alt="sponsor image"
                      defaultImage={DEFAULT_SPONSOR_IMAGE}
                      width={48}
                      height={48}
                      style={{
                        borderRadius: '1230px',
                        maxHeight: '48px',
                        objectFit: 'cover',
                      }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {sponsor.vanityName}
                      </Typography>
                      <Typography variant="caption" sx={classes.sponsorRating}>
                        <i className="icon-Star"></i>
                        <span>{sponsor.avgTotalRating}</span>
                        <span>({sponsor.reviewsCount})</span>
                      </Typography>
                      <Typography variant="caption" sx={classes.address}>
                        {sponsor.address}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </TagSelector>
          </Box>
          <Box sx={classes.contactUsWrapper}>
            <Box sx={classes.contactUsContent}>
              <Typography variant="body1" fontWeight={600}>
                Can’t find a sponsor? Contact us and we’ll resolve it!
              </Typography>
              <Link
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Can’t find a sponsor`}
              >
                <Button sxCustomStyles={classes.buttonContact}>
                  Contact Us
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box sx={classes.buttonsWrapper}>
          <Button onClick={handleNextPage} disabled={!dirtyTag}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseSponsorStep;
