import { getDatabaseConnection } from '../../config/data-source-config';
import { Attachment } from '../../entities/attachments.entity';

export const deleteAttachment = async (id: number) => {
  const connection = await getDatabaseConnection();
  await connection.manager.delete(Attachment, { id });
};
