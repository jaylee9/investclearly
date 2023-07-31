import createHttpError from 'http-errors';
import { loadEnvConfig } from '../../config/load-env-config';
import { s3, bucketName } from '../../config/aws-s3-config';

loadEnvConfig();

export const deleteFile = async (fileName: string) => {
  try {
    if (!bucketName) {
      throw new createHttpError.BadRequest();
    }

    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
