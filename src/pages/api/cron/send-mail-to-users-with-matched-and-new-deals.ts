import { NextApiRequest, NextApiResponse } from 'next';
import { cronConstants } from '../../../backend/constants/cron';
import { sendMailToUsersWithMatchedDealsByInvestmentPreferences } from '../../../backend/services/cron-services/send-mail-to-users-with-matched-deals-by-investment-preferences';
import { sendMailToUsersWithNewDealsFromBookmarkedSponsors } from '../../../backend/services/cron-services/send-mail-to-users-with-new-deals-from-bookmarked-sponsors';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await sendMailToUsersWithMatchedDealsByInvestmentPreferences();
  await sendMailToUsersWithNewDealsFromBookmarkedSponsors();
  response.status(200).json({ message: cronConstants.cronJobIsFinished });
}
