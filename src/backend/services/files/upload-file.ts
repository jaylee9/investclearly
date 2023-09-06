import * as crypto from 'crypto';
import createHttpError from 'http-errors';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

export const uploadFile = async (
  file: Express.Multer.File,
  targetType: string
): Promise<string> => {
  const { originalname, buffer } = file;
  const randValue = crypto.randomBytes(10).toString('hex');
  const originalFilename = originalname.replace(/\s+/g, '-') || '';

  try {
    if (path.extname(originalFilename)) {
      const fileName = `${targetType}/${randValue}-${originalFilename}`;

      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET_NAME || '')
        .upload(fileName, buffer, { cacheControl: '3600' });

      if (error) {
        throw new createHttpError.BadRequest();
      }

      return fileName;
    } else {
      throw new createHttpError.BadRequest();
    }
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
