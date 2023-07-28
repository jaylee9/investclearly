import { In } from 'typeorm';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Attachment } from '../../../backend/entities/attachments.entity';

export const getAttachments = async (
  entityId: number,
  entityType: string,
  attachmentIds: number[]
) => {
  const connection = await getDatabaseConnection();
  return connection.manager.find(Attachment, {
    where: { id: In(attachmentIds), entityId, entityType },
  });
};
