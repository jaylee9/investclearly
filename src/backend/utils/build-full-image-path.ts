import { loadEnvConfig } from '../config/load-env-config';

loadEnvConfig();

export const buildFullImagePath = (fileName: string): string => {
  if (fileName.startsWith('https://')) {
    return fileName;
  }
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${fileName}`;
};
