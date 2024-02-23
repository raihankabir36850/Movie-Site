export const getDateRange = (months: number) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  return [startDate, endDate];
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatWithtDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return formattedDate;
};
