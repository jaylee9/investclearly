import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const buildFullImagePath = (fileName: string): string => {
  if (fileName.startsWith('https://')) {
    return fileName;
  }
  return `https://${process.env.AWS_PUBLIC_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
