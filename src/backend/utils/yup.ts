import { Schema } from "yup";

export function validateRequest<T extends object>(
  data: unknown,
  schema: Schema<T>
) {
  const _data = schema.validateSync(data, {
    abortEarly: false,
    strict: true,
  });
  return _data as T;
}
