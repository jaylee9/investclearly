import aws from 'aws-sdk';

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME || '';

const s3 = new aws.S3({
  signatureVersion: 'v4',
});

export { bucketName, s3 };
