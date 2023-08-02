import { ReviewStatuses } from '../../../../backend/constants/enums/review-statuses';

export interface ModerateReviewInterface {
  status: ReviewStatuses;
  reason: string;
  unpublishReviewMessage?: string | null;
  rejectReviewMessage?: string | null;
}
