export interface CreateReviewInterface {
  reviewerId: number;
  sponsorId: number;
  dealId?: number;
  title: string;
  preInvestmentCommunicationRating?: number | null;
  preInvestmentCommunicationComment?: string | null;
  postInvestmentCommunicationRating?: number | null;
  postInvestmentCommunicationComment?: string | null;
  strengthOfLeadershipTeamRating?: number | null;
  strengthOfLeadershipTeamComment?: string | null;
  alignmentOfExpectationsRating?: number | null;
  alignmentOfExpectationsComment?: string | null;
  overallRating: number;
  overallComment: string;
}
