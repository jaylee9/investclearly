import axios from 'axios';
import moment from 'moment';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
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
const industryGroupTypes = Object.values(SecIndustries);

interface IssuerData {
  previousName?: string[];
  value?: string;
}

export const addNewDealsFormDBySecApiScraper = async () => {
  const apiKey = process.env.SEC_API_KEY;
  const url = `${process.env.SEC_API_URL}/form-d?token=${apiKey}`;
  const pageSize = '50';
  let from = '0';
  const pauseBetweenRequestsMs = 500;
  console.log('start process', new Date());
  try {
    const allResults = [];

    while (true) {
      const requestPayload = {
        query: {
          query_string: {
            query:
              `filedAt:{2014-09-31 TO 2023-09-07} AND ` +
              `(offeringData.typesOfSecuritiesOffered.isEquityType:true OR offeringData.typesOfSecuritiesOffered.isDebtType:true) AND ` +
              `(offeringData.industryGroup.industryGroupType:(${industryGroupTypes.join(
                ' OR '
              )}))`,
          },
        },
        from: from,
        size: pageSize,
        sort: [
          {
            filedAt: {
              order: 'asc',
            },
          },
        ],
      };

      const response = await axios.post(url, requestPayload);
      const responseData = response.data;

      allResults.push(...responseData.offerings);
      return allResults;
      if (allResults.length < +pageSize) {
        break;
      }

      from += pageSize;

      for (const offering of responseData.offerings) {
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
            where: { cik: offering.primaryIssuer.cik },
          });

          let investmentStructures = null;
          let exemption = null;
          let status = DealStatuses.open;

          if (offering?.offeringData?.typesOfSecuritiesOffered?.isEquityType) {
            investmentStructures = InvestmentStructures.equity;
          }

          if (offering?.offeringData?.typesOfSecuritiesOffered?.isDebtType) {
            investmentStructures = InvestmentStructures.debt;
          }

          if (
            offering?.offeringData?.federalExemptionsExclusions?.item?.includes(
              '06c'
            )
          ) {
            exemption = Exemptions.Rule506C;
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

          let allPreviousNames = [];
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
            assetClass: AssetClasses.industryFromSec,
            dealTitle: offering?.primaryIssuer?.entityName,
            minimumInvestment:
              offering?.offeringData?.minimumInvestmentAccepted,
            investmentStructures,
            targetRaise:
              offering?.offeringData?.offeringSalesAmounts?.totalOfferingAmount,
            dealLegalName: offering?.primaryIssuer?.entityName,
            exemption,
            secIndustry:
              offering?.offeringData?.industryGroup?.industryGroupType,
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
              offering?.offeringData?.offeringData?.durationOfOffering
                ?.moreThanOneYear,
            submissionType: offering.submissionType,
          };

          if (deal) {
            const relatedPersonRecords = [];
            const updatedDeal = await update(deal.id, dealData, []);

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
              const relatedPersoRecord = await createOrUpdateRelatedPerson(
                relatedPersonData
              );
              relatedPersonRecords.push(relatedPersoRecord);
            }

            await connection.manager.save(Deal, {
              ...updatedDeal,
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
              relatedPersonRecords.push(relatedPersoRecord);
            }

            if (relatedPersonRecords.length) {
              await connection.manager.save(Deal, {
                ...dealRecord,
                relatedPersons: relatedPersonRecords,
              });
            }
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, pauseBetweenRequestsMs));
    }
    console.log('end of process', new Date());
  } catch (error) {
    throw error;
  }
};
