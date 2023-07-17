export const splitGoogleName = (googleName: string) => {
  const nameParts = googleName.split(' ');
  const firstName = nameParts[0];
  let lastName = '';

  if (nameParts.length > 1) {
    lastName = nameParts.slice(1).join(' ');
  }

  return {
    firstName: firstName,
    lastName: lastName,
  };
};
