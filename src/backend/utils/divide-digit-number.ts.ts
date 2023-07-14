export const divideDigitNumber = (confirmationCode: string) => {
  const result: { [key: string]: string } = {};

  for (let i = 0; i < confirmationCode.length; i++) {
    result[`digit${i + 1}`] = confirmationCode[i];
  }

  return result;
};
