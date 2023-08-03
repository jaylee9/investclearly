export interface CreateReviewInterface {
  reviewerId: number;
  sponsorId: number;
  dealId?: number | null;
  title: string;
  preInvestmentCommunicationRating?: number | 0;
  preInvestmentCommunicationComment?: string | null;
  postInvestmentCommunicationRating?: number | 0;
  postInvestmentCommunicationComment?: string | null;
  strengthOfLeadershipTeamRating?: number | 0;
  strengthOfLeadershipTeamComment?: string | null;
  alignmentOfExpectationsRating?: number | 0;
  alignmentOfExpectationsComment?: string | null;
  overallRating: number;
  overallComment: string;
}
