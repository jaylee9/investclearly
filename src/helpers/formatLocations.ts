export const capitalize = (str: string): string =>
  str
    .split(' ')
    .map(segment => {
      if (segment.includes(',')) {
        const [firstPart, secondPart] = segment.split(',');
        return (
          firstPart.charAt(0).toUpperCase() +
          firstPart.slice(1).toLowerCase() +
          ',' +
          secondPart.charAt(0).toUpperCase() +
          secondPart.slice(1).toLowerCase()
        );
      }
      return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
    })
    .join(' ');

const formatLocations = (locations: string[]): string[] =>
  locations.map(location =>
    location.length <= 3
      ? location
      : location.split(' ').map(capitalize).join(' ')
  );

export default formatLocations;
