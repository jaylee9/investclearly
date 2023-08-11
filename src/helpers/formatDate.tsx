const formatDate = (dateInput: string | Date): string => {
  let date: Date;
  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formatted = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return formatted;
};

export default formatDate;
