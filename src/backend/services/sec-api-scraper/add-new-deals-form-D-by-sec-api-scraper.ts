import axios from 'axios';
import moment from 'moment';
import { SecIndustries } from '../../constants/enums/sec-industries';
import { prepareDealsDataAndInsertOrUpdateRecords } from './prepare-deals-data-to-insert-or-update';
import { MomentConstants } from '../../../backend/constants/moment-constants';
import { OrderDirectionConstants } from '../../../backend/constants/order-direction-constants';
const industryGroupTypes = Object.values(SecIndustries);

export const addNewDealsFormDBySecApiScraper = async (
  startDate?: string | null,
  endDate?: string | null
) => {
  const apiKey = process.env.SEC_API_KEY;
  const url = `${process.env.SEC_API_URL}/form-d?token=${apiKey}`;
  const pageSize = 50;
  let from = 0;

  if (!startDate && !endDate) {
    startDate = moment()
      .subtract(10, 'years')
      .format(MomentConstants.yearMonthDay);

    endDate = moment()
      .subtract(9, 'years')
      .subtract(11, 'months')
      .format(MomentConstants.yearMonthDay);
  }

  const pauseBetweenRequestsMs = 2000;
  try {
    while (true) {
      const requestPayload = {
        query: {
          query_string: {
            query:
              `filedAt:{${startDate} TO ${endDate}} AND ` +
              `(offeringData.typesOfSecuritiesOffered.isEquityType:true OR offeringData.typesOfSecuritiesOffered.isDebtType:true) AND ` +
              `(offeringData.industryGroup.industryGroupType:(${industryGroupTypes.join(
                ' OR '
              )}))`,
          },
        },
        from: from.toString(),
        size: pageSize.toString(),
        sort: [
          {
            filedAt: {
              order: OrderDirectionConstants.ASC.toLocaleLowerCase(),
            },
          },
        ],
      };

      const response = await axios.post(url, requestPayload);
      const responseData = response.data;

      if (from === 1000) {
        break;
      }

      from += pageSize;
      await prepareDealsDataAndInsertOrUpdateRecords(responseData.offerings);
      await new Promise(resolve => setTimeout(resolve, pauseBetweenRequestsMs));
    }
  } catch (error) {
    throw error;
  }
};
