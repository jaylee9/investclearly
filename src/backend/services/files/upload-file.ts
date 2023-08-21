import * as crypto from 'crypto';
import createHttpError from 'http-errors';
import path from 'path';
import { loadEnvConfig } from '../../config/load-env-config';
import { s3, bucketName } from '../../config/aws-s3-config';

loadEnvConfig();

export const uploadFile = async (
  file: Express.Multer.File,
  targetType: string
) => {
  const { originalname, buffer } = file;
  const randValue = crypto.randomBytes(10).toString('hex');
  const originalFilename = originalname.replace(/\s+/g, '-') || '';

  try {
    if (path.extname(originalFilename)) {
      const fileName = `${randValue}-${originalFilename}`;

      const uploadParams = {
        Bucket: bucketName,
        Body: buffer,
        Key: `${targetType}/${fileName}`,
      };
      const uploadResult = await s3.upload(uploadParams).promise();

      return uploadResult.Key;
    }
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
