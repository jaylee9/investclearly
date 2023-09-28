import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { SecIndustries } from '../../constants/enums/sec-industries';
import { update } from '../deals/update-deal';
import { createDeal } from '../deals/create-deal';
import { FormD } from './interfaces/form-D.interface';
import { prepareDealData } from './prepare-deal-data';
import { prepareRelatedPersonData } from './prepare-related-person-data';
import { DealsRelatedPersons } from '../../entities/dealsRelatedPersons.entity';

const industryGroupTypes = Object.values(SecIndustries);

export const prepareDealsDataAndInsertOrUpdateRecords = async (
  offerings: FormD[]
) => {
  for (const offering of offerings) {
    if (
      industryGroupTypes.includes(
        offering?.offeringData?.industryGroup?.industryGroupType
      )
    ) {
      const connection = await getDatabaseConnection();
      const deal = await connection.manager.findOne(Deal, {
        where: { secApiId: offering.id },
      });

      const dealData = await prepareDealData(offering);

      if (dealData) {
        const command = deal?.id
          ? update(deal!.id, dealData, [])
          : createDeal(dealData, []);
        const dealRecord = (await command) as unknown as Deal;

        if (dealRecord) {
          const relatedPersonRecords = await prepareRelatedPersonData(offering);
          if (deal) {
            await connection.manager.delete(DealsRelatedPersons, {
              dealId: deal.id,
            });
          }
          for (const relatedPerson of relatedPersonRecords)
            await connection.manager.save(DealsRelatedPersons, {
              dealId: dealRecord.id,
              relatedPersonId: relatedPerson.id,
              relatedPersonRoles: relatedPerson.relatedPersonRoles,
            });
        }
      }
    }
  }
};
