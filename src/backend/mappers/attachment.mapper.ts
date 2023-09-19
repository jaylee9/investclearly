import { Attachment } from '../entities/attachments.entity';
import { AttachmentInterface } from '../services/attachments/interfaces/attachment-interface';
import { buildFullImagePath } from '../utils/build-full-image-path';

export const attachmentMapper = (
  attachment: Attachment
): AttachmentInterface => {
  return {
    id: attachment.id,
    entityId: attachment.entityId,
    entityType: attachment.entityType,
    originalFileName: attachment.originalFileName,
    fileSize: attachment.fileSize,
    path: buildFullImagePath(attachment.path),
    createdAt: attachment.createdAt,
    updatedAt: attachment.updatedAt,
  };
};
