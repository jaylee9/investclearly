import axios from 'axios';
import moment from 'moment';
import { Deal } from '../../entities/deals.entity';
import { SecIndustries } from '../../constants/enums/sec-industries';
import { prepareDealsDataAndInsertOrUpdateRecords } from './prepare-deals-data-to-insert-or-update';
import { MomentConstants } from '../../../backend/constants/moment-constants';
import { OrderDirectionConstants } from '../../../backend/constants/order-direction-constants';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
const industryGroupTypes = Object.values(SecIndustries);

export const addNewDealsFormDBySecApiScraper = async () => {
  const connection = await getDatabaseConnection();
  const apiKey = process.env.SEC_API_KEY;
  const url = `${process.env.SEC_API_URL}/form-d?token=${apiKey}`;
  const pageSize = 50;
  let from = 0;

  const deal = await connection.manager
    .createQueryBuilder()
    .select('deals')
    .from(Deal, 'deals')
    .orderBy('deals.fileDate', OrderDirectionConstants.DESC)
    .getOne();
  console.log(
    '🚀 ~ file: add-new-deals-form-D-by-sec-api-scraper.ts:24 ~ addNewDealsFormDBySecApiScraper ~ deal:',
    deal
  );

  let startDate = moment()
    .subtract(10, 'years')
    .format(MomentConstants.yearMonthDay);
  let endDate = moment()
    .subtract(9, 'years')
    .subtract(11, 'months')
    .format(MomentConstants.yearMonthDay);

  if (deal && deal.fileDate) {
    startDate = moment(deal.fileDate)
      .subtract(1, 'days')
      .format(MomentConstants.yearMonthDay);
    endDate = moment(startDate)
      .add(1, 'months')
      .format(MomentConstants.yearMonthDay);
  }

  const pauseBetweenRequestsMs = 1000;
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

      if (from === 2000) {
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
