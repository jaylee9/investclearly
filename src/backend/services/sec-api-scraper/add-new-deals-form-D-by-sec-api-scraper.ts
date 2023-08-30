const { queryApi } = require('sec-api');

export const addNewDealsFormDBySecApiScraper = async () => {
  queryApi.setApiKey(
    'bb4769f777b1485edee082d4d2fa35baeaf63c9581107fbe2d4df07a23c140d6'
  );

  const query = {
    query: { query_string: { query: 'formType:"10-D"' } }, // get most recent 10-Q filings
    from: '0', // start with first filing. used for pagination.
    size: '1', // limit response to 10 filings
    sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
  };

  return queryApi.getFilings(query);
};

// import axios from 'axios';

// export const addNewDealsFormDBySecApiScraper = async () => {
//   const url =
//     'https://api.sec-api.io/form-d?token=bb4769f777b1485edee082d4d2fa35baeaf63c9581107fbe2d4df07a23c140d6';

//   try {
//     const response = await axios.post(url);
//     console.log('Response:', response.data);
//     return response.data; // You can return the response data if needed
//   } catch (error) {
//     console.error('Error:', error);
//     throw error; // Rethrow the error to be caught by the caller if necessary
//   }
// };
