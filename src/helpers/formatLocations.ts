const formatLocations = (locations: string[]): string[] =>
  locations.map(str =>
    str.length <= 3
      ? str
      : str
          .split(' ')
          .map(
            word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(' ')
  );

export default formatLocations;
