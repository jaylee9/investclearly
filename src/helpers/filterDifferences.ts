import { IFilters } from '@/components/page/List/Deals/DealsFilters';
import { ISponsorFilters } from '@/components/page/List/Sponsors/SponsorsFilters';
import { differenceWith, isEqual } from 'lodash';

const filterDifferences = (
  filters: IFilters | ISponsorFilters,
  defaultFilters: IFilters | ISponsorFilters
) => {
  const differences = differenceWith(
    Object.entries(filters),
    Object.entries(defaultFilters),
    ([filterKey, filterValue], [defaultFilterKey, defaultFilterValue]) =>
      filterKey === defaultFilterKey && isEqual(filterValue, defaultFilterValue)
  );

  return Object.fromEntries(differences);
};

export default filterDifferences;
