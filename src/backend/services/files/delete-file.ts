import createHttpError from 'http-errors';
import { createClient } from '@supabase/supabase-js';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

export const deleteFile = async (fileName: string) => {
  try {
    const { error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME || '')
      .remove([fileName]);

    if (error) {
      throw new createHttpError.BadRequest();
    }
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
