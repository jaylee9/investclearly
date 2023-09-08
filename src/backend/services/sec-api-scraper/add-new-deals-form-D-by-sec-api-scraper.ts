import axios from 'axios';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { Deal } from '../../entities/deals.entity';

export const addNewDealsFormDBySecApiScraper = async () => {
  const apiKey = process.env.SEC_API_KEY;
  const url = `${process.env.SEC_API_URL}/form-d?token=${apiKey}`;
  const pageSize = 500;
  let from = 0;
  const pauseBetweenRequestsMs = 2000;

  try {
    const allResults = [];

    while (true) {
      const requestPayload = {
        query: {
          query_string: {
            query: 'filedAt:{2014-09-31 TO 2023-09-07}',
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

      if (responseData.length < pageSize) {
        break;
      }

      from += pageSize;

      await new Promise(resolve => setTimeout(resolve, pauseBetweenRequestsMs));
    }

    for (const offering of allResults) {
      const connection = await getDatabaseConnection();
      const deal = await connection.manager.findOne(Deal, {
        where: { cik: offering.primaryIssuer.cik },
      });

      const dealData = {
        minimumInvestment: offering?.offeringData?.minimumInvestmentAccepted,
        investmentStructures: offering?.offeringData?.typesOfSecuritiesOffered,
        targetRaise:
          offering?.offeringData?.offeringSalesAmounts?.totalOfferingAmount,
        dealLegalName: offering?.primaryIssuer?.entityName,
        exemption:
          offering?.offeringData?.federalExemptionsExclusions?.item?.[0],
        secIndustry: offering?.offeringData?.industryGroup?.industryGroupType,
        regulation: 'D',
        status: 'Closed-Active',
        assetClass: 'Medical Office',
        // //
        street1: offering?.primaryIssuer?.issuerAddress?.street1,
        street2: offering?.primaryIssuer?.issuerAddress?.street2,
        city: offering?.primaryIssuer?.issuerAddress?.city,
        stateOrCountry: offering?.primaryIssuer?.issuerAddress?.stateOrCountry,
        stateOrCountryDescription:
          offering?.primaryIssuer?.issuerAddress?.stateOrCountryDescription,
        zipCode: offering?.primaryIssuer?.issuerAddress?.zipCode,

        accessionNumber: offering?.accessionNo,
        fileDate: offering?.filedAt,
        cik: offering?.primaryIssuer?.cik,
        previousNames:
          offering?.primaryIssuer?.issuerPreviousNameList?.[0]
            ?.previousName?.[0], // Array of objects
        entityType: offering?.primaryIssuer?.entityType,
        yearsOfIncorporation: offering?.primaryIssuer?.yearOfInc?.value,
        issuerPhoneNumber: offering?.primaryIssuer?.issuerPhoneNumber,
        jurisdictionOfInc: offering?.primaryIssuer?.jurisdictionOfInc,
        dateOfFirstSale:
          offering?.offeringData?.typeOfFiling?.dateOfFirstSale?.value, // Object with changed keys
        durationOfOffer:
          offering?.offeringData?.offeringData?.durationOfOffering
            ?.moreThanOneYear, //Need to check (boolean)
        relatedPersonsList: offering?.relatedPersonsList, //separate table
        submissionType: offering.submissionType,
      };

      if (deal) {
        await connection.manager.save(Deal, { ...deal, dealData });
      } else {
        const newDeal = await connection.manager.create(Deal, dealData);
        await connection.manager.save(newDeal);
      }
    }
    return allResults;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller if necessary
  }
};
