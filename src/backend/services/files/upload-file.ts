import aws from 'aws-sdk';
import * as crypto from 'crypto';
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

export const uploadFile = async (
  file: Express.Multer.File,
  targetType: string
) => {
  const { originalname, buffer } = file;
  const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;
  const randValue = crypto.randomBytes(10).toString('hex');
  const originalFilename = originalname || '';

  try {
    if (!bucketName) {
      throw new createHttpError.BadRequest();
    }

    const fileName =
      originalFilename.replace(/\s+/g, '-') ||
      `${randValue}-${path.extname(originalFilename)}`;

    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: `${targetType}/${fileName}`,
    };
    const uploadResult = await s3.upload(uploadParams).promise();

    return uploadResult.Key;
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
