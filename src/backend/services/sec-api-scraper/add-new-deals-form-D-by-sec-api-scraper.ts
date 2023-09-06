// const { queryApi } = require('sec-api');

// export const addNewDealsFormDBySecApiScraper = async () => {
//   queryApi.setApiKey(
//     'bb4769f777b1485edee082d4d2fa35baeaf63c9581107fbe2d4df07a23c140d6'
//   );

//   const query = {
//     query: { query_string: { query: 'formType:"10-D"' } }, // get most recent 10-Q filings
//     from: '0', // start with first filing. used for pagination.
//     size: '10000000000', // limit response to 10 filings
//     sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
//   };

//   return queryApi.getFilings(query);
// };

import axios from 'axios';
import { getDatabaseConnection } from '../../../backend/config/data-source-config';
import { Deal } from '@/backend/entities/deals.entity';

export const addNewDealsFormDBySecApiScraper = async () => {
  const apiKey =
    'a9ee64309924fce22ecf0aa19177ab40eef35f7527c5935257d2ffa68962dfe0';
  const url = `https://api.sec-api.io/form-d?token=${apiKey}`;

  // Define your search query and other parameters
  const requestPayload = {
    query_string: {
      query:
        'offeringData.offeringSalesAmounts.totalOfferingAmount:[1000000 TO *]',
      from: 0, // Start position for pagination
      size: 1, // Number of offerings to be returned in one response
      sort: [{ filedAt: { order: 'asc' } }], // Sorting definition
    },
  };

  try {
    const response = await axios.post(url, requestPayload);
    return response.data; // You can return the response data if needed

    for (const offering of response.data.offerings) {
      const connection = await getDatabaseConnection();
      // const deal = await connection.manager.findOne(Deal, {
      //   where: { cik: offering.primaryIssuer.cik },
      // });

      const dealData = {
        minimumInvestment: offering?.offeringData?.minimumInvestmentAccepted,
        // investmentStructures: offering?.offeringData?.typesOfSecuritiesOffered,
        targetRaise:
          offering?.offeringData?.offeringSalesAmounts?.totalOfferingAmount,
        dealLegalName: offering?.primaryIssuer?.entityName,
        // exemption:
        //   offering?.offeringData?.federalExemptionsExclusions?.item?.[0],
        secIndustry: offering?.offeringData?.industryGroup?.industryGroupType,
        regulation: 'D',
        exemption: '506B',
        status: 'Closed-Active',
        assetClass: 'Medical Office',
        // //
        // street1: offering?.primaryIssuer?.issuerAddress?.street1,
        // street2: offering?.primaryIssuer?.issuerAddress?.street2,
        // city: offering?.primaryIssuer?.issuerAddress?.city,
        // stateOrCountry: offering?.primaryIssuer?.issuerAddress?.stateOrCountry,
        // stateOrCountryDescription:
        //   offering?.primaryIssuer?.issuerAddress?.stateOrCountryDescription,
        // zipCode: offering?.primaryIssuer?.issuerAddress?.zipCode,
        // accessionNumber: offering?.accessionNo,
        // fileDate: offering?.filedAt,
        // cik: offering?.primaryIssuer?.cik,
        // previousName:
        //   offering?.primaryIssuer?.issuerPreviousNameList?.[0]
        //     ?.previousName?.[0], // Array of objects
        // entityType: offering?.primaryIssuer?.entityType,
        // yearsOfIncorporation: offering?.primaryIssuer?.yearOfInc?.value,
        // issuerPhoneNumber: offering?.primaryIssuer?.issuerPhoneNumber,
        // jurisdictionOfInc: offering?.primaryIssuer?.jurisdictionOfInc,
        // dateOfFirstSale:
        //   offering?.offeringData?.typeOfFiling?.dateOfFirstSale?.value, // Object with changed keys
        // durationOfOffer:
        //   offering?.offeringData?.offeringData?.durationOfOffering
        //     ?.moreThanOneYear, //Need to check (boolean)
        // relatedPersonsList: offering?.relatedPersonsList, //separate table
        // brokerOrDealer:
        //   offering?.offeringData?.salesCompensationList?.recipient, // Array of objects
        // salesExpenses:
        //   offering?.offeringData?.salesCommissionsFindersFees?.salesCommissions, // Object (dollarAmount, isEstimate)
        // nameOfSigner: offering?.offeringData?.signatureBlock?.signature, //Array of objects
      };
      console.log(
        '🚀 ~ file: add-new-deals-form-D-by-sec-api-scraper.ts:90 ~ addNewDealsFormDBySecApiScraper ~ dealData:',
        dealData
      );

      // if (deal) {
      //   await connection.manager.save(Deal, { ...deal, dealData });
      // } else {
      // const newDeal = await connection.manager.create(Deal, dealData);
      // await connection.manager.save(newDeal);
      // }
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller if necessary
  }
};
