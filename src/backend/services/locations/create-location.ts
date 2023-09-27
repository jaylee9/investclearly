import { Location } from '../../entities/locations.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { CreateLocationInterface } from './interfaces/create-location.interface';

export const createLocation = async (
  locationData: CreateLocationInterface,
  entityType: string,
  entityId: number
) => {
  const connection = await getDatabaseConnection();

  if (locationData && entityId && entityType) {
    const location = connection.manager.create(Location, {
      ...locationData,
      entityType,
      entityId,
    });
    await connection.manager.save(location);
  }
};
