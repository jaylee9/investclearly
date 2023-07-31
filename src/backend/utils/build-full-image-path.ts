import { loadEnvConfig } from '../config/load-env-config';

loadEnvConfig();

export const buildFullImagePath = (fileName: string): string => {
  if (fileName.startsWith('https://')) {
    return fileName;
  }
  return `https://${process.env.AWS_PUBLIC_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
