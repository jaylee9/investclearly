export const transformObjectKeysToArrays = <T>(inputObject: {
  [key: string]: T | T[] | undefined;
}): { [key: string]: T[] } => {
  const transformedObject: { [key: string]: T[] } = {};
  for (const key in inputObject) {
    if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
      const value = inputObject[key];
      transformedObject[key] =
        value === undefined ? [] : Array.isArray(value) ? value : [value];
    }
  }
  return transformedObject;
};
