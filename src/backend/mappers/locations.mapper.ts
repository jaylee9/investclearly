import { Location } from '../entities/locations.entity';
import { LocationInterface } from '../services/locations/interfaces/location.interface';

export const locationMapper = (location: Location): LocationInterface => {
  return {
    id: location.id,
    entityId: location.entityId,
    entityType: location.entityType,
    street1: location.street1,
    street2: location.street2,
    city: location.city,
    stateOrCountry: location.stateOrCountry,
    stateOrCountryDescription: location.stateOrCountryDescription,
    zipCode: location.zipCode,
    createdAt: location.createdAt,
    updatedAt: location.updatedAt,
  };
};
