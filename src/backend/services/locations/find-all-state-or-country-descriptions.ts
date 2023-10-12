import { getDatabaseConnection } from '../../config/data-source-config';
import { Location } from '../../entities/locations.entity';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';
import { OrderDirectionConstants } from '../../../backend/constants/order-direction-constants';

export const getAllStateOrCountryDescriptions = async (entityType: string) => {
  const connection = await getDatabaseConnection();

  let searchQuery = connection
    .createQueryBuilder()
    .select(
      'DISTINCT locations.stateOrCountryDescription',
      'stateOrCountryDescription'
    )
    .from(Location, 'locations');

  if (
    entityType === LocationTargetTypesConstants.deal ||
    entityType === LocationTargetTypesConstants.sponsor
  ) {
    searchQuery = searchQuery.where('locations.entityType = :entityType', {
      entityType,
    });
  }

  searchQuery = searchQuery
    .andWhere('locations.stateOrCountryDescription IS NOT NULL')
    .orderBy(
      'locations.stateOrCountryDescription',
      OrderDirectionConstants.ASC
    );

  const uniqueStateOrCountryDescriptions = await searchQuery.getRawMany();

  return uniqueStateOrCountryDescriptions;
};
