import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';
import multer from 'multer';

interface FilesRequest extends NextApiRequest {
  files?: Express.Multer.File[];
}

export const parseForm = async (
  request: FilesRequest,
  response: NextApiResponse
): Promise<{ fields: unknown; files: Express.Multer.File[] }> => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  return new Promise((resolve, reject) => {
    upload.any()(
      request as unknown as Request,
      response as unknown as Response,
      err => {
        if (err) {
          reject(err);
          return;
        }

        const fields = request.body;
        const files = request.files || [];

        resolve({ fields, files });
      }
    );
  });
};
