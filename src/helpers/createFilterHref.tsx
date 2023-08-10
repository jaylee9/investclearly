const createFilterHref = (value: string) => {
  return value.replace(/[\s']/g, '_').toLowerCase();
};

export default createFilterHref;
