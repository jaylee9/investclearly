import { format } from 'date-fns';

const formatDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return format(date, 'MMM d, yyyy');
};

export default formatDate;
