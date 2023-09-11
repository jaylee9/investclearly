import { Location } from '../../entities/locations.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { createLocation } from './create-location';
import { UpdateLocationInterface } from './interfaces/update-location.interface';

export const createOrUpdateLocation = async (
  locationData: UpdateLocationInterface,
  entityType: string,
  entityId: number
) => {
  const connection = await getDatabaseConnection();
  const locationRecord = await connection.manager.findOne(Location, {
    where: { entityType, entityId },
  });

  if (locationRecord && entityId && entityType) {
    await connection.manager.update(
      Location,
      { id: locationRecord.id },
      { ...locationData }
    );
  } else {
    await createLocation(locationData, entityType, entityId);
  }
};
