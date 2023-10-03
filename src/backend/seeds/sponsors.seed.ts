import { promises as fs } from 'fs';
import { parse } from 'csv-parse';

export const SponsorsSeed = async () => {
  const data = await fs.readFile(`src/backend/seeds-data/sponsors.csv`, 'utf8');
  return parse(data, {
    from_line: 2,
    delimiter: ',',
    columns: [
      'sponsor',
      'website',
      'city',
      'state',
      'zipCode',
      'apartmentOrSuite',
      'streetNumber',
      'streetOrRoad',
      'country',
      'linkedInPage',
      'aum',
      'fundOrSyndication',
      'assetClass',
      'irr',
      'coc',
      'equityMultiple',
      'fees',
      'holdPeriod',
      'exemption',
    ],
  });
};
