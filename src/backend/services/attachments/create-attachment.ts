import { Attachment } from '../../entities/attachments.entity';
import { getDatabaseConnection } from '../../config/data-source-config';

interface fileData {
  fileName: string;
  originalname: string;
  size: number;
}

export const createAttachment = async (
  fileData: fileData,
  entityId: number,
  entityType: string
) => {
  const connection = await getDatabaseConnection();
  const attachment = connection.manager.create(Attachment, {
    originalFileName: fileData.originalname,
    fileSize: fileData.size,
    path: fileData.fileName,
    entityId,
    entityType,
  });
  await connection.manager.save(attachment);
};
