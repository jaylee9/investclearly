import * as crypto from 'crypto';
import createHttpError from 'http-errors';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { loadEnvConfig } from '../../config/load-env-config';
import { FileConstants } from '../../../backend/constants/file-constants';

loadEnvConfig();

interface result {
  fileName: string;
  originalname: string;
  size: number;
}

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

export const uploadFile = async (
  file: Express.Multer.File,
  targetType: string
): Promise<result> => {
  const { originalname, buffer, size } = file;
  const randValue = crypto.randomBytes(10).toString('hex');
  const originalFilename = originalname.replace(/\s+/g, '-') || '';

  try {
    if (path.extname(originalFilename)) {
      const fileName = `${targetType}/${randValue}-${originalFilename}`;
      let contentType = '';
      const fileExtension = path.extname(originalFilename).toLowerCase();

      if (fileExtension === FileConstants.pdfExtension) {
        contentType = FileConstants.contentTypes.applicationPdf;
      } else if (FileConstants.imageExtensions.includes(fileExtension)) {
        contentType = `image/${fileExtension.slice(1)}`;
      } else if (FileConstants.textFilesExtensions.includes(fileExtension)) {
        contentType = FileConstants.contentTypes.applicationMsword;
      }

      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET_NAME || '')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          contentType,
        });

      if (error) {
        throw new createHttpError.BadRequest();
      }

      return { fileName, originalname, size };
    } else {
      throw new createHttpError.BadRequest();
    }
  } catch (error) {
    throw new createHttpError.BadRequest();
  }
};
