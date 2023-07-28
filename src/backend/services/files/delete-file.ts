import aws from 'aws-sdk';
import createHttpError from 'http-errors';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export const deleteFile = async (fileName: string) => {
  try {
    const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;

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
