export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const formatLocations = (locations: string[]): string[] =>
  locations.map(location =>
    location.length <= 3
      ? location
      : location.split(' ').map(capitalize).join(' ')
  );

export default formatLocations;
