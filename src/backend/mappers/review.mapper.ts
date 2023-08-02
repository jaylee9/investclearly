import { Review } from '../entities/reviews.entity';
import { ReviewInterface } from '../services/reviews/interfaces/review.interface';
import { attachmentMapper } from './attachment.mapper';
import { dealMapper } from './deal.mapper';
import { sponsorMapper } from './sponsor.mapper';
import { userMapper } from './user.mapper';

export const reviewMapper = (review: Review): ReviewInterface => {
  return {
    id: review.id,
    title: review.title,
    sponsorId: review.sponsorId,
    reviewerId: review.reviewerId,
    preInvestmentCommunicationRating:
      review.preInvestmentCommunicationRating || 0,
    preInvestmentCommunicationComment:
      review.preInvestmentCommunicationComment || null,
    postInvestmentCommunicationRating:
      review.postInvestmentCommunicationRating || 0,
    postInvestmentCommunicationComment:
      review.postInvestmentCommunicationComment || null,
    strengthOfLeadershipTeamRating: review.strengthOfLeadershipTeamRating || 0,
    strengthOfLeadershipTeamComment:
      review.strengthOfLeadershipTeamComment || null,
    alignmentOfExpectationsRating: review.alignmentOfExpectationsRating || 0,
    alignmentOfExpectationsComment:
      review.alignmentOfExpectationsComment || null,
    overallRating: review.overallRating,
    overallComment: review.overallComment,
    sponsor: sponsorMapper(review.sponsor),
    deal: review.deal ? dealMapper(review.deal) : null,
    reviewer: userMapper(review.reviewer),
    attachments: review.attachments
      ? review.attachments.map(attachmentMapper)
      : [],
    status: review.status,
    isVerified: review.isVerified,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};
