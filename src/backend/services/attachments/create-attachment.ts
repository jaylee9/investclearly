import { Attachment } from '../../entities/attachments.entity';
import { getDatabaseConnection } from '../../config/data-source-config';

export const createAttachment = async (
  path: string,
  entityId: number,
  entityType: string
) => {
  const connection = await getDatabaseConnection();
  const attachment = connection.manager.create(Attachment, {
    path,
    entityId,
    entityType,
  });
  await connection.manager.save(attachment);
};
