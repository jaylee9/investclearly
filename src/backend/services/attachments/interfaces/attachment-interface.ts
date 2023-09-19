export interface AttachmentInterface {
  id: number;
  entityId: number;
  entityType: string;
  originalFileName: string;
  fileSize: number;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}
