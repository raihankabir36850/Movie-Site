export const getDateRange = (months: number) => {
  // Get the current date
  const endDate = new Date();

  // Calculate the start date based on the number of months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  // Format dates in 'YYYY/MM/DD' format
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  return [startDateStr, endDateStr];
};

export const formatDate = (date: Date) => {
  // Get year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Format date as 'YYYY/MM/DD'
  return `${year}-${month}-${day}`;
};

// Example usage:
// const [startDate, endDate] = getDateRange(2);
// console.log('Start Date:', startDate);
// console.log('End Date:', endDate);
