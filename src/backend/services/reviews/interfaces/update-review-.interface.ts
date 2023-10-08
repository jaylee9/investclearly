export interface UpdateReviewInterface {
  title: string;
  preInvestmentCommunicationRating: number;
  preInvestmentCommunicationComment: string;
  postInvestmentCommunicationRating: number;
  postInvestmentCommunicationComment: string;
  strengthOfLeadershipTeamRating: number;
  strengthOfLeadershipTeamComment: string;
  alignmentOfExpectationsRating: number;
  alignmentOfExpectationsComment: string;
  overallRating: number;
  overallComment: string;
  attachmentsIdsToDelete: number[] | number;
}
