type Nullable<T> = T | null;

type MyObject = {
  [key: string]: Nullable<number | string>;
};

export const setNullIfNone = (obj: MyObject): MyObject => {
  Object.keys(obj).forEach(key => {
    const updatedValue: Nullable<number | string> = obj[key];

    if (
      updatedValue === null ||
      updatedValue === undefined ||
      (typeof updatedValue === 'string' && updatedValue.toString() === 'none')
    ) {
      obj[key] = null;
    }
  });

  return obj;
};
