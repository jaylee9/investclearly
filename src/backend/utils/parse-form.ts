import { NextApiRequest } from 'next';
import formidable from 'formidable';

export const parseForm = async (
  request: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {

  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      } else {
        const fieldsAsStrings: { [key: string]: string } = {};

        for (const key in fields) {
          const value = fields[key];
          if (Array.isArray(value)) {
            fieldsAsStrings[key] = value[0];
          } else {
            fieldsAsStrings[key] = value as string;
          }
        }
        resolve({ fields: fieldsAsStrings, files });
      }
    });
  });
};
