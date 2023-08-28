import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersAndTheirMatchedInvestmentPreferencesDeals } from '../../../backend/services/cron-services/get-users-and-their-matched-investment-preferences-deals';
import { getUsersBookmarkedSponsorsAndTheirNewDeals } from '../../../backend/services/cron-services/get-users-bookmarked-sponsors-and-their-new-deals';
import { cronConstants } from '../../../backend/constants/cron';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await getUsersAndTheirMatchedInvestmentPreferencesDeals();
  await getUsersBookmarkedSponsorsAndTheirNewDeals();
  response.status(200).json({ message: cronConstants.cronJobIsFinished });
}
