import moment from 'moment';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { SecIndustries } from '../../constants/enums/sec-industries';
import { InvestmentStructures } from '../../constants/enums/investment-structures';
import { Exemptions } from '../../constants/enums/exemptions';
import { DealStatuses } from '../../constants/enums/deal-statuses';
import { AssetClasses } from '../../constants/enums/asset-classes';
import { Regulations } from '../../constants/enums/regulations';
import { update } from '../deals/update-deal';
import { createDeal } from '../deals/create-deal';
import { createRelatedPerson } from '../relatedPersons/create-related-person';
import { createOrUpdateRelatedPerson } from '../relatedPersons/create-or-update-related-person';
import { FormD } from './interfaces/form-D.interface';
import { Regions } from '@/backend/constants/enums/regions';
import { RelatedPerson } from '@/backend/entities/relatedPersons.entity';
const industryGroupTypes = Object.values(SecIndustries);

interface IssuerData {
  previousName?: string[];
  value?: string;
}

export const prepareDealsDataAndInsertOrUpdateRecords = async (
  offerings: FormD[]
) => {
  for (const offering of offerings) {
    const connection = await getDatabaseConnection();
    const currentDate = moment();
    const diffInMonths = currentDate.diff(offering?.filedAt, 'months');
    const diffInDays = currentDate.diff(offering?.filedAt, 'days');

    if (
      industryGroupTypes.includes(
        offering?.offeringData?.industryGroup?.industryGroupType
      )
    ) {
      const deal = await connection.manager.findOne(Deal, {
        where: { secApiId: offering.id },
      });

      let investmentStructures = InvestmentStructures.equity;
      let exemption = Exemptions.Rule506C;
      let status = DealStatuses.open;

      if (offering?.offeringData?.typesOfSecuritiesOffered?.isDebtType) {
        investmentStructures = InvestmentStructures.debt;
      }

      if (
        offering?.offeringData?.federalExemptionsExclusions?.item?.includes(
          '06c'
        )
      ) {
        if (diffInMonths >= 6 && diffInDays >= 1) {
          status = DealStatuses.closedActive;
        }
      } else if (
        offering?.offeringData?.federalExemptionsExclusions?.item?.includes(
          '06b'
        )
      ) {
        exemption = Exemptions.Rule506B;

        if (diffInMonths >= 12 && diffInDays >= 1) {
          status = DealStatuses.closedActive;
        }
      }

      if (
        exemption === Exemptions.Rule506B ||
        status === DealStatuses.closedActive
      ) {
        let allPreviousNames: string[] = [];
        if (offering?.primaryIssuer?.issuerPreviousNameList?.length) {
          allPreviousNames =
            offering?.primaryIssuer?.issuerPreviousNameList?.reduce(
              (acc: string[], item: IssuerData) => {
                if (item.previousName && Array.isArray(item.previousName)) {
                  acc = acc.concat(item.previousName);
                }
                return acc;
              },
              []
            );
        }

        const dealData = {
          secApiId: offering?.id,
          assetClass: AssetClasses.industryFromSec,
          dealTitle: offering?.primaryIssuer?.entityName,
          minimumInvestment: offering?.offeringData?.minimumInvestmentAccepted,
          investmentStructures,
          targetRaise:
            offering?.offeringData?.offeringSalesAmounts?.totalOfferingAmount,
          dealLegalName: offering?.primaryIssuer?.entityName,
          exemption,
          secIndustry: offering?.offeringData?.industryGroup?.industryGroupType,
          regulation: Regulations.d,
          status,
          street1: offering?.primaryIssuer?.issuerAddress?.street1,
          street2: offering?.primaryIssuer?.issuerAddress?.street2,
          city: offering?.primaryIssuer?.issuerAddress?.city,
          stateOrCountry:
            offering?.primaryIssuer?.issuerAddress?.stateOrCountry,
          stateOrCountryDescription:
            offering?.primaryIssuer?.issuerAddress?.stateOrCountryDescription,
          zipCode: offering?.primaryIssuer?.issuerAddress?.zipCode,
          accessionNumber: offering?.accessionNo,
          fileDate: offering?.filedAt,
          cik: offering?.primaryIssuer?.cik,
          previousNames: allPreviousNames,
          entityType: offering?.primaryIssuer?.entityType,
          yearsOfIncorporation: offering?.primaryIssuer?.yearOfInc?.value,
          issuerPhoneNumber: offering?.primaryIssuer?.issuerPhoneNumber,
          jurisdictionOfInc: offering?.primaryIssuer?.jurisdictionOfInc,
          dateOfFirstSale:
            offering?.offeringData?.typeOfFiling?.dateOfFirstSale?.value,
          isMoreThanOneYear:
            offering?.offeringData?.durationOfOffering?.moreThanOneYear,
          submissionType: offering.submissionType,
          regions: Regions.myState,
          description: '',
          cashOnCash: 0,
          fees: 0,
          equityMultiple: 0,
          holdPeriod: 0,
          targetIRR: 0,
          actualIRR: 0,
          preferredReturn: 0,
          dealSponsor: '',
          closeDate: new Date(),
          attachmentsIdsToDelete: [],
          isDealPublished: true,
        };

        if (deal) {
          const relatedPersonRecords = [];
          const updatedDeal = await update(deal.id, dealData, []);

          for (const relatedPerson of offering?.relatedPersonsList
            ?.relatedPersonInfo) {
            const relatedPersonData = {
              firstName: relatedPerson?.relatedPersonName?.firstName || '',
              middleName: relatedPerson?.relatedPersonName?.middleName || '',
              lastName: relatedPerson?.relatedPersonName?.lastName || '',
              relationships:
                relatedPerson?.relatedPersonRelationshipList?.relationship ||
                [],
              relationshipClarification:
                relatedPerson?.relationshipClarification || '',
              location: relatedPerson?.relatedPersonAddress || '',
            };
            const relatedPersoRecord = (await createOrUpdateRelatedPerson(
              relatedPersonData
            )) as unknown as RelatedPerson;

            if (relatedPersoRecord) {
              relatedPersonRecords.push(relatedPersoRecord);
            }
          }

          await connection.manager.save(Deal, {
            id: updatedDeal.id,
            relatedPersons: relatedPersonRecords,
          });
        } else {
          const dealRecord = await createDeal(dealData, []);
          const relatedPersonRecords = [];

          for (const relatedPerson of offering?.relatedPersonsList
            ?.relatedPersonInfo) {
            const relatedPersonData = {
              firstName: relatedPerson?.relatedPersonName?.firstName,
              middleName: relatedPerson?.relatedPersonName?.middleName,
              lastName: relatedPerson?.relatedPersonName?.lastName,
              relationships:
                relatedPerson?.relatedPersonRelationshipList?.relationship,
              relationshipClarification:
                relatedPerson?.relationshipClarification,
              location: relatedPerson?.relatedPersonAddress,
            };
            const relatedPersoRecord = await createRelatedPerson(
              relatedPersonData
            );

            if (relatedPersoRecord) {
              relatedPersonRecords.push(relatedPersoRecord);
            }
          }

          await connection.manager.save(Deal, {
            id: dealRecord.id,
            relatedPersons: relatedPersonRecords,
          });
        }
      }
    }
  }
};
